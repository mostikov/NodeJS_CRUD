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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const posts = __importStar(require("../controllers/posts"));
const users = __importStar(require("../controllers/users"));
const auth_1 = __importDefault(require("../controllers/auth"));
router.get('/', posts.show);
router.get('/my', auth_1.default, posts.userPosts);
router.get('/show/:id', auth_1.default, posts.show);
router.post('/auth', auth_1.default);
router.post('/posts/create', auth_1.default, posts.create);
router.patch('/posts/update', auth_1.default, posts.update);
router.delete('/posts/delete', auth_1.default, posts.del);
router.get('/profile', auth_1.default, users.myProfile);
router.get('/user/:id', auth_1.default, users.usersProfile);
router.get('/users', auth_1.default, users.usersProfile);
router.post('/profile', auth_1.default, users.updateMyProfile);
exports.default = router;
//# sourceMappingURL=index.js.map