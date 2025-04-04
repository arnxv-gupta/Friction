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
exports.default = addFriend;
const userModel_1 = __importDefault(require("../../models/userModel"));
function addFriend(userID, friendID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield userModel_1.default.exists({ userID: userID })) {
                console.log(yield userModel_1.default.updateOne({ userID: userID }, { $push: { friends: Number(friendID) } }));
                return { type: "SUCCESS" };
            }
            else {
                return { type: "ERROR", msg: "Unable to find user! Invalid userID." };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
