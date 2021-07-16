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
exports.updateMyProfile = exports.usersProfile = exports.myProfile = void 0;
const Users_1 = __importDefault(require("../models/Users"));
function myProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const user = yield Users_1.default.query().select('id', 'first_name', 'last_name', 'email', 'nickname').findById(id);
        res.status(200);
        res.send(user);
        next();
    });
}
exports.myProfile = myProfile;
;
function usersProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.id) {
            const user = yield Users_1.default.query().select('id', 'first_name', 'last_name', 'email', 'nickname').findById(req.params.id);
            if (user) {
                res.status(200);
                res.send(user);
            }
            else {
                res.status(400);
                res.send({ error: 400, reason: "Check you user id. User with your Id isn`t exist" });
            }
        }
        else {
            const users = yield Users_1.default.query().orderBy('id', 'DESC').limit(10);
            res.status(200);
            res.send(users);
        }
        next();
    });
}
exports.usersProfile = usersProfile;
;
function updateMyProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const { first_name, last_name, nickname, password, email } = req.body;
        if ((first_name || last_name || nickname || password || email) && id) {
            yield Users_1.default.query().findById(id).patch({ first_name, last_name, nickname, password, email });
            res.status(200);
            res.send({ status: 'success' });
        }
        else {
            res.status(400);
            res.send({ error: 400, reason: "Request must have at least of one row to update" });
        }
        next();
    });
}
exports.updateMyProfile = updateMyProfile;
;
//# sourceMappingURL=users.js.map