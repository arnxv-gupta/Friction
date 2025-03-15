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
exports.default = deleteChannel;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
function deleteChannel(serverID, channelID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let channelDel = yield serverModel_1.default.updateOne({ serverID: serverID }, { $pull: { "channels.channelID": channelID } });
            if (channelDel.modifiedCount == 1) {
                return { type: "SUCCESS", msg: "Deleted the channel!" };
            }
            else {
                return { type: "ERROR", msg: "ChannelID is invalid!" };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
