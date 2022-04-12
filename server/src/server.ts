import express, { Application, Request, Response } from "express";
import { HttpException } from "./core/exceptions/http.exception";
import { IServer } from "./interfaces/IServer";

export class Server {
    public port: string;
    public host: string;
    public controllers: any[];
    public services: any[];
    private _app: Application;
    private _controllers: any[];
    private _services: any[];

    private constructor(){

    }

    static createServer(config: IServer): Server {
        const s = new Server();
        s._app = express();
        s.port = config.port;
        s._controllers = config.controllers;
        s._services = config.services;
        s._initRoutes();
        return s;
    }

    private _initRoutes(): void {
        this._controllers.forEach(Controller => {
            const dependencies = Reflect.getMetadata("design:paramtypes", Controller);
            let controller = new Controller(
                ...this._services.filter(
                    service => dependencies.includes(service)
                ).map(D => new D())
            );

            const routePrefix = Reflect.getMetadata("routePrefix", Controller);
            this._registerRoutes(routePrefix, controller);
        })
    }

    private _registerRoutes(routePrefix: string, controller: any): void {
        const methods = this._getControllerMethods(controller);
        methods.forEach((e: any) => {
            const path = Reflect.getMetadata("path", controller[e]);
            const method = Reflect.getMetadata("method", controller[e]);
            console.log(`[${method.toUpperCase()}] ${routePrefix}/${path} ${controller[e].name}`);
            this._registerSingleRoute(controller, routePrefix, path, method, controller[e]);
        })
    }

    
    private _getControllerMethods(instance: any): String[] {
        let methods: any[] = [];
        while (instance = Reflect.getPrototypeOf(instance)) {
            let keys = Reflect.ownKeys(instance);
            keys.forEach(k => {
                if (typeof instance[k] === "function" && k !== "constructor") {
                    methods.push(k)
                }
            })
        }
        return methods.reverse().splice(10);
    }

    private _getParamMetadataForHandler(context: any): string[] {
        let paramIndexObj: any = {};
        paramIndexObj["body"] = parseInt(Reflect.getMetadata("body", context));
        paramIndexObj["query"] = parseInt(Reflect.getMetadata("query", context));
        paramIndexObj["params"] = parseInt(Reflect.getMetadata("params", context));
        return Object.keys(paramIndexObj).filter(f => !isNaN(paramIndexObj[f])).sort((a, b) => {
            return paramIndexObj[a] - paramIndexObj[b]
        });
    }
    private  _createHandlerFunctionWithRequest(controllerInstance: any, handler: Function, request: Request): Function {
        const handlerArgs = this._getParamMetadataForHandler(handler)
        return async function () {
            const responseFromHandler = await handler.apply(controllerInstance, handlerArgs.map(k => {
                if (k === "body") {
                    return request.body;
                }
                if (k === "params") {
                    return request.params
                }
                if (k === "query") {
                    return request.query;
                }
            }));
            return responseFromHandler;
        }
    }

    private _registerSingleRoute(controllerInstance: any, routePrefix: string, path: string, method: "get" | "post" | "put" | "patch" | "delete", handler: any, middlewares: any[] = []) {
        let _this = this;
        return this._app[method](`${routePrefix}/${path}`, ...middlewares, async function (req: Request, res: Response) {
            const handlerFunction = _this._createHandlerFunctionWithRequest(controllerInstance, handler, req);
            try {
                const response = await handlerFunction();
                return res.json(response);
            } catch (error) {
                if (error instanceof HttpException) {
                    return res.status(error._statusCode).json({ error: error._message});
                }
                return res.status(500).json({ error: error });
            }
        });
    }

    async listen(){
        return new Promise((resolve, reject) => {
            this._app.listen(this.port, () => {
                resolve(true);
            })
        })
    }

}
