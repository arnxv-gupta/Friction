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
exports.default = leaveServer;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
function leaveServer(serverID, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let serverObj = yield serverModel_1.default.findOne({ serverID: serverID });
            let userObj = yield userModel_1.default.findOne({ userID: userID });
            if (!userObj || !serverObj) {
                return { type: "ERROR", msg: "Invalid serverID or userID" };
            }
            else {
                let serverChanged = yield serverModel_1.default.updateOne({ serverID: serverID }, { $pull: { membersList: userID } });
                let userChanged = yield userModel_1.default.updateOne({ userID: userID }, { $pull: { joinedServers: serverID } });
                yield serverModel_1.default.updateOne({ serverID: serverID, "channels.name": "general" }, { $push: { "channels.$.data": {
                            authorID: Number(userID),
                            type: "system",
                            data: "leave"
                        } } });
                if (serverChanged.modifiedCount == 1 && userChanged.modifiedCount == 1) {
                    return { type: "SUCCESS", msg: "User removed from server" };
                }
                else {
                    return { type: "ERROR", msg: "Unable to leave server!" };
                }
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
