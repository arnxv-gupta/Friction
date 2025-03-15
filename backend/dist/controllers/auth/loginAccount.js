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
exports.default = loginAccount;
const userModel_1 = __importDefault(require("../../models/userModel"));
function loginAccount(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!(yield userModel_1.default.exists({ email: email, password: password }))) {
                return { type: "ERROR", msg: `Unable to login! Email or password was invalid.` };
            }
            else {
                let user = yield userModel_1.default.findOne({ email: email, password: password });
                return { type: "SUCCESS", msg: `Logged in!`, res: user === null || user === void 0 ? void 0 : user.userID };
            }
        }
        catch (err) {
            return { type: "UNDEFINED ERROR", msg: err };
        }
    });
}
