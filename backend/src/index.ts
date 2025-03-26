import express, { request } from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import {Server as socket} from "socket.io"
import http from "http"

import authRoutes from "./routes/authRoutes"
import serverRoutes from "./routes/serverRoutes"
import userRoutes from "./routes/userRoutes"
import miscRoutes from "./routes/miscRoutes"

import userUpdate from "./controllers/user/updateUser"

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


let count=0;
app.get("/api/count", (req:any, res:any)=>{
    res.json(count);
})


io.on("connection", (socket)=>{
    console.log("Socket: New client connected!");
    socket.on("message", (msg)=>{
        console.log(msg);
        io.emit("message", Date.now())

    })
    socket.on("userUpdate",async (userObj)=>{
        console.log(userObj);
        socket.data.userID=userObj.userID;
        await userUpdate(userObj.userID, userObj.status)
        io.emit("message", Date.now())
        count++;
    })

    socket.on("disconnecting", async()=>{
        await userUpdate(socket.data.userID, "Offline");
        io.emit("message", Date.now())
        console.log("Socket: User disconnected!");
        count--;
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