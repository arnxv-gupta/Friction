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
exports.default = getServer;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
function getServer(serverID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = yield serverModel_1.default.findOne({ serverID: Number(serverID) });
            if (data == null) {
                return { type: "ERROR", msg: "Invalid serverID" };
            }
            else {
                return { type: "SUCCESS", msg: `Server found`, res: data };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
