import { Controller, Get, Query } from '../core/decorators/http.decorators';

@Controller('/')
export class HelloController {

    @Get('/hello')
    async sayHello(@Query() query: any){
        return "Hello" + (query.name || "");
    }
}