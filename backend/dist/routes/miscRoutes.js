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
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const serverModel_1 = __importDefault(require("../models/serverModel"));
const __1 = require("..");
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, String(Date.now()) + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
router.post("/uploadImage", upload.single("image"), (req, res) => {
    if (req.file == undefined) {
        res.json({ type: "ERROR", msg: "Error uploading image!" });
    }
    else {
        res.json({ type: "SUCCESS", msg: "Image uploaded!", res: "http://localhost:3030/uploads/" + req.file.filename });
    }
});
router.get("/api/servers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(yield serverModel_1.default.countDocuments({}));
}));
router.get("/api/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(__1.currentUsers);
}));
exports.default = router;
