import { ServerApp } from "./models/server";

require('dotenv').config();
const server = new ServerApp();

server.listen();