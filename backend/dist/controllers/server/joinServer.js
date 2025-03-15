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
exports.default = joinServer;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
function joinServer(serverID, userID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let serverObj = yield serverModel_1.default.findOne({ serverID: serverID });
            if (serverObj == null) {
                return { type: "ERROR", msg: "Invalid serverID." };
            }
            else {
                if (serverObj.membersList.indexOf(Number(userID)) == -1) {
                    yield serverModel_1.default.updateOne({ serverID: serverID }, { $push: { membersList: Number(userID) } });
                    yield serverModel_1.default.updateOne({ serverID: serverID, "roles.name": "everyone" }, { $push: { assignedTo: Number(userID) } });
                    yield userModel_1.default.updateOne({ userID: Number(userID) }, { $push: { joinedServers: Number(serverID) } });
                    return { type: "SUCCESS", msg: `Server joined!` };
                }
                else {
                    return { type: "ERROR", msg: "Already in server." };
                }
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
