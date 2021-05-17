import * as express from 'express'
import * as mongoose from 'mongoose'
import {createServer} from "http";
import {config} from "dotenv";
import api from './api';
import {Server} from "socket.io";
import {json as parseJson} from 'body-parser'
import io from './io';

config()
const {
    MONGO_URI,
    PORT
} = process.env

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("DB Connected!"))

const app = express()
const server = createServer(app)
const socketio = new Server(server)

app.use(parseJson())

app.use(express.static("public"))
app.use("/api", api)

socketio.on("connection", io)

server.listen(PORT, () => {
    console.log("Running")
})