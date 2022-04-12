export class HttpException extends Error {

    _statusCode: number;
    _message: string;
    
    constructor(code: number, message: string) {
        super();
        this._statusCode = code;
        this._message = message;
        console.log("stack:", this.stack);
    }
}