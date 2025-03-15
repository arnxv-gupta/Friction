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
const createServer_1 = __importDefault(require("../controllers/server/createServer"));
const joinServer_1 = __importDefault(require("../controllers/server/joinServer"));
const deleteServer_1 = __importDefault(require("../controllers/server/deleteServer"));
const leaveServer_1 = __importDefault(require("../controllers/server/leaveServer"));
const getServer_1 = __importDefault(require("../controllers/server/getServer"));
const createChannel_1 = __importDefault(require("../controllers/server/createChannel"));
const deleteChannel_1 = __importDefault(require("../controllers/server/deleteChannel"));
const createCategory_1 = __importDefault(require("../controllers/server/createCategory"));
const createMessage_1 = __importDefault(require("../controllers/server/createMessage"));
const router = express_1.default.Router();
router.post("/createServer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, createServer_1.default)(req.body.name, req.body.icon, req.body.adminID));
}));
router.get("/createServer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, joinServer_1.default)(req.query.serverID, req.query.userID));
}));
router.delete("/deleteServer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, deleteServer_1.default)(req.query.serverID));
}));
router.get("/deleteServer", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, leaveServer_1.default)(req.query.serverID, req.query.userID));
}));
router.get("/serverInfo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, getServer_1.default)(req.query.serverID));
}));
router.post("/createChannel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, createChannel_1.default)(req.body.serverID, req.body.name, req.body.type, req.body.categoryID));
}));
router.delete("/deleteChannel", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, deleteChannel_1.default)(req.query.serverID, req.query.channelID));
}));
router.post("/createCategory", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, createCategory_1.default)(req.body.serverID, req.body.name));
}));
router.post("/sendMessage", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield (0, createMessage_1.default)(req.body.authorID, req.body.text, req.body.image, req.body.serverID, req.body.channelID));
}));
exports.default = router;
