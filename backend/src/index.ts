import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {Server as socket} from "socket.io"
import http from "http"

import authRoutes from "./routes/authRoutes"
import serverRoutes from "./routes/serverRoutes"
import userRoutes from "./routes/userRoutes"
import miscRoutes from "./routes/miscRoutes"

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new socket(server, {
    cors: {
        origin: "*"
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

app.use("/", authRoutes);
app.use("/", serverRoutes);
app.use("/", userRoutes);
app.use("/", miscRoutes);


io.on("connection", (socket)=>{
    console.log("Socket: New client connected!");
    socket.on("message", ()=>{
        io.emit("message", Date.now())
    })
    socket.on("disconnected", ()=>{
        console.log("Socket: User disconnected!");
        
    })
})



mongoose.connect(process.env.DB_URL || "").then(()=>{
    console.log("Mongoose: Connected to DB!"); 
}).catch((error) => {
    console.error("Mongoose: Connection failed!", error);
});

server.listen(process.env.PORT, ()=>{
    console.log("Express: Server listening on", process.env.PORT);
})