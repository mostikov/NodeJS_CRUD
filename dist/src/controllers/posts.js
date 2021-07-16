"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.userPosts = exports.del = exports.update = exports.create = exports.show = void 0;
const Posts_1 = __importDefault(require("../models/Posts"));
const queues = __importStar(require("./queue/queues"));
function show(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.params.id) {
            const posts = yield Posts_1.default.query().findById(req.params.id);
            if (posts) {
                res.status(200);
                res.send(posts);
            }
            else {
                res.status(400);
                res.send({ error: 400, reason: "Check you post id. Posts with your Id isn`t exist" });
            }
        }
        else {
            const posts = yield Posts_1.default.query().orderBy('id', 'DESC').limit(10);
            res.status(200);
            res.send(posts);
        }
        next();
    });
}
exports.show = show;
;
function create(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const { content, title, delay } = req.body;
        if (content && title) {
            if (delay > 0) {
                queues.addPostWithDelay({ content, title, delay, id });
                res.status(200);
                res.send({ status: 'success', description: `new post will be added after ${delay / 1000}sec` });
            }
            else {
                const newPost = yield Posts_1.default.query().insert({ owner_id: id, content, title });
            }
        }
        else {
            res.status(400);
            res.send({ error: 400, reason: "Request must have content and title rows of new post" });
        }
        next();
    });
}
exports.create = create;
;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const { content, title, postId } = req.body;
        if ((content || title) && postId) {
            const targetPost = yield Posts_1.default.query().findById(postId);
            if (targetPost) {
                if (id === targetPost.owner_id) {
                    const newPost = yield Posts_1.default.query().findById(postId).patch({ content, title });
                    res.status(200);
                    res.send({ status: 'success' });
                }
                else {
                    res.status(400);
                    res.send({ error: 400, reason: "Access denied. You are not owner of this post" });
                }
            }
            else {
                res.status(400);
                res.send({ error: 400, reason: "Check you post id. Posts with your Id isn`t exist" });
            }
        }
        else {
            res.status(400);
            res.send({ error: 400, reason: "Request must have id of target post (postId) and title or content or both rows to update" });
        }
        next();
    });
}
exports.update = update;
;
function del(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const { postId } = req.body;
        if (postId) {
            const targetPost = yield Posts_1.default.query().findById(postId);
            if (targetPost) {
                if (id === targetPost.owner_id) {
                    const newPost = yield Posts_1.default.query().deleteById(postId);
                    res.status(200);
                    res.send({ status: 'success' });
                }
                else {
                    res.status(400);
                    res.send({ error: 400, reason: "Access denied. You are not owner of this post" });
                }
            }
            else {
                res.status(400);
                res.send({ error: 400, reason: "Check you post id. Posts with your Id isn`t exist" });
            }
        }
        else {
            res.status(400);
            res.send({ error: 400, reason: "Request must have id of target post to delete" });
        }
        next();
    });
}
exports.del = del;
;
function userPosts(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser[0];
        const posts = yield Posts_1.default.query().where('owner_id', id);
        res.status(200);
        res.send(posts);
        next();
    });
}
exports.userPosts = userPosts;
;
//# sourceMappingURL=posts.js.map