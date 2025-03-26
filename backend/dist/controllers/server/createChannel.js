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
exports.default = createChannel;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
function createChannel(serverID, name, type, categoryID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let channelObj = {
                name: name,
                type: type,
                categoryID: categoryID,
                data: [],
                access: []
            };
            let channelInsert = yield serverModel_1.default.updateOne({ serverID: Number(serverID) }, { $push: { channels: channelObj } });
            if (channelInsert.modifiedCount != 1) {
                return { type: "ERROR", msg: "Unable to find server! Invalid serverID." };
            }
            else {
                return { type: "SUCCESS", data: channelObj.channelID };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
