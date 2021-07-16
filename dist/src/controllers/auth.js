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
const Users_1 = __importDefault(require("../models/Users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers['authorization']) {
            const headers = req.headers['authorization'];
            const token = headers.split(' ')[1];
            const verifyUser = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, success) => {
                if (err) {
                    res.status(401);
                    res.json({ error: 401, reason: "invalid token" });
                }
                else {
                    return success;
                }
            });
            const { nickname, password, iat } = verifyUser;
            const expiredAfter = (iat + (Number(process.env.JWT_TOKEN_EXIRES) * 86400)) - Math.round(Date.now() / 1000);
            if (expiredAfter > 0) {
                req.currentUser = yield Users_1.default.query().where({ nickname: nickname, password: password });
                next();
            }
            else {
                res.status(401);
                res.json({ error: 401, reason: "Please, authorize. Token expired" });
            }
        }
        if (req.body.nickname && req.body.password && !req.headers['authorization']) {
            const userData = req.body;
            const getUser = yield Users_1.default.query().where(userData);
            if (getUser.length) {
                const token = jsonwebtoken_1.default.sign(userData, process.env.SECRET_KEY);
                res.status(200);
                res.json({ status: 'success', token });
            }
            else {
                res.status(401);
                res.json({ error: 401, reason: "Incorrect login or password" });
            }
        }
        if (!req.headers['authorization'] && !req.body.nickname && !req.body.password) {
            res.status(401);
            res.json({ error: 401, reason: "Please, authorize" });
        }
    });
}
exports.default = auth;
;
//# sourceMappingURL=auth.js.map