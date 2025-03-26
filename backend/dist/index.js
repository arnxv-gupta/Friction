"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const updateUser_1 = __importDefault(require("./controllers/user/updateUser"));
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
    socket.on("message", (msg) => {
        console.log(msg);
        io.emit("message", Date.now());
    });
    socket.on("userUpdate", (userObj) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(userObj);
        socket.data.userID = userObj.userID;
        yield (0, updateUser_1.default)(userObj.userID, userObj.status);
        io.emit("message", Date.now());
    }));
    socket.on("disconnecting", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, updateUser_1.default)(socket.data.userID, "Offline");
        io.emit("message", Date.now());
        console.log("Socket: User disconnected!");
    }));
});
mongoose_1.default.connect(process.env.DB_URL || "").then(() => {
    console.log("Mongoose: Connected to DB!");
}).catch((error) => {
    console.error("Mongoose: Connection failed!", error);
});
server.listen(process.env.PORT, () => {
    console.log("Express: Server listening on", process.env.PORT);
});
