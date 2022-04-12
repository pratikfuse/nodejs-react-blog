import {Server} from './server';
import 'reflect-metadata';
import { HelloController } from './controllers/hello.controller';

async function main() {
    const s = Server.createServer({
        controllers: [
            HelloController
        ],        
        host: 'localhost',
        port: '9000',
        services: []
    });

    await s.listen();
}

main();