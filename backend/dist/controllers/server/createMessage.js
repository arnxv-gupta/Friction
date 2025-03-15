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
exports.default = sendMessage;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
function sendMessage(authorID, text, image, serverID, channelID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let chatObj;
            if (image) {
                chatObj = {
                    authorID: authorID,
                    data: text,
                    image: image,
                    type: "default",
                    reactions: []
                };
            }
            else {
                chatObj = {
                    authorID: authorID,
                    data: text,
                    type: "default",
                    reactions: []
                };
            }
            let data = yield serverModel_1.default.findOne({ serverID: Number(serverID), "channels.channelID": Number(channelID) });
            if (data != null) {
                let channel = yield serverModel_1.default.findOne({ serverID: data.serverID, "channels.channelID": Number(channelID) });
                if (channel != null) {
                    yield serverModel_1.default.updateOne({ serverID: data.serverID, "channels.channelID": Number(channelID) }, { $push: { "channels.$.data": chatObj } });
                    return { type: "SUCCESS", msg: `Chat sent!` };
                }
                else {
                    return { type: "ERROR", msg: "Invalid channelID" };
                }
            }
            else {
                return { type: "ERROR", msg: "Invalid serverID" };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
