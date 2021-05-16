import * as express from 'express'
import * as mongoose from 'mongoose'
import {createServer} from "http";
import {config} from "dotenv";
import api from './api';
import {Server, Socket} from "socket.io";
import {User} from "./models/User";
import {Game} from "./models/Game";
import io from './io';

config()
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected!"))

const app = express()
const server = createServer(app)
const socketio = new Server(server)


app.use(express.static("public"))
app.use("/api", api)

socketio.on("connection", io)

server.listen(8000, () => {
    console.log("Running")
})