const express = require("express");
const app = express();
const cors = require("cors");
const multer = require("multer")
const path = require("path");
const emitter = require("./emitter.js")
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads");
    },
    filename: (req, file, cb)=>{
        console.log(file);
        
        cb(null, String(Date.now()) + path.extname(file.originalname));
    }
})
const upload = multer({storage});
const http = require("http");
const server =http.createServer(app);
const webSocket = require("ws")
require("dotenv").config()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static("uploads"));

const serverRouter = require("./routes/serverRouter.js")
const authRouter = require("./routes/authRouter.js")
const userRouter = require("./routes/userRouter.js");

app.use("/", serverRouter);
app.use("/", authRouter);
app.use("/", userRouter);


app.get("/", (req, res)=>{
    res.send("Generated!")
})

let updateUser = require("./controllers/user/updateUser.js")

const wsServer = new webSocket.Server({server});

wsServer.on("connection", (ws)=>{
        console.log('New client connected');
        
        //ws.send("UPDATE")
        ws.on("message", (data)=>{
            console.log(typeof data);

                console.log(data.toString());
                if(data.toString()=="[object MediaStream]") {
                    console.log("stream");
                    
                    wsServer.clients.forEach(client => client.send(data));
                } else {
                    wsServer.clients.forEach(client => client.send(Date.now()));
                }
        })

        ws.on("close", ()=>{
            //temp
            updateUser({userID: ws.userID, onlinePresence: "offline"});
        })
})


// misc


app.post("/uploadImage", upload.single("image"), (req, res)=>{
    console.log(req.file);
    
    if(req.file==undefined) {
        res.json({type:"ERROR",msg: "Error uploading image!"});
    } else {
        res.json({type:"SUCCESS",msg: "Image uploaded!", res: "http://localhost:3030/uploads/"+req.file.filename});

    }
})


server.listen(process.env.PORT, ()=>{
    console.log("Server started!");
});

module.exports = {wsServer}