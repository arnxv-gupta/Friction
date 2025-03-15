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
exports.default = createAccount;
const userModel_1 = __importDefault(require("../../models/userModel"));
function createAccount(email, password, username, pfpURL) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (yield userModel_1.default.exists({ email: email })) {
                return { type: "ERROR", msg: "User already exists!" };
            }
            else {
                yield userModel_1.default.create({ email: email, password: password, username: username, pfpURL: pfpURL });
                return { type: "SUCCESS", msg: "Created new user!" };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
