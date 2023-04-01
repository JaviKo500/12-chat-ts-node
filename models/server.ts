import express, { Application } from "express";
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
import { socketController } from "../controllers/socket";
export class ServerApp {
    private app: Application;
    private port: string;
    private server;
    private io;

    constructor() {
        this.app = express();
        this.port = process.env.PORT ?? '8080';
        this.server = http.createServer( this.app );
        this.io = new Server( this.server );

        this.middleware();

        this.sockets();
    }
    
    private middleware() {
        this.app.use( cors() );
        this.app.use( express.static('public') );
    }

    private sockets() {
        this.io.on( 'connection', socketController );
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }
}



