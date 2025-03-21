"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const serverRoutes_1 = __importDefault(require("./routes/serverRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const miscRoutes_1 = __importDefault(require("./routes/miscRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*"
    }
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/uploads", express_1.default.static("uploads"));
app.use("/", authRoutes_1.default);
app.use("/", serverRoutes_1.default);
app.use("/", userRoutes_1.default);
app.use("/", miscRoutes_1.default);
io.on("connection", (socket) => {
    console.log("Socket: New client connected!");
    socket.on("message", () => {
        io.emit("message", Date.now());
    });
    socket.on("disconnected", () => {
        console.log("Socket: User disconnected!");
    });
});
mongoose_1.default.connect(process.env.DB_URL || "").then(() => {
    console.log("Mongoose: Connected to DB!");
}).catch((error) => {
    console.error("Mongoose: Connection failed!", error);
});
server.listen(process.env.PORT, () => {
    console.log("Express: Server listening on", process.env.PORT);
});
