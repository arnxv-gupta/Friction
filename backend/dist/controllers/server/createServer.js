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
exports.default = createServer;
const serverModel_1 = __importDefault(require("../../models/serverModel"));
const userModel_1 = __importDefault(require("../../models/userModel"));
function createServer(name, icon, adminID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let categoryID = Math.floor(Math.random() * (999999999 - 111111111) + 111111111);
            let serverObj = {
                name: name,
                serverIcon: icon,
                roles: [
                    {
                        name: "everyone",
                        color: "#FFFFFF",
                        assignedTo: [adminID]
                    }
                ],
                membersList: [adminID],
                categories: [{
                        name: "main",
                        categoryID: categoryID
                    }],
                events: [],
                channels: [{
                        name: "general",
                        type: "text",
                        categoryID: categoryID,
                    }
                ],
                adminID: adminID
            };
            let userExists = yield userModel_1.default.exists({ userID: Number(adminID) });
            if (userExists == null) {
                return { type: "ERROR", msg: "Unable to create server! Invalid adminID." };
            }
            else {
                let server = yield serverModel_1.default.create(serverObj);
                yield userModel_1.default.updateOne({ userID: Number(adminID) }, { $push: { joinedServers: server.serverID } });
                return { type: "SUCCESS", data: server.serverID };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
