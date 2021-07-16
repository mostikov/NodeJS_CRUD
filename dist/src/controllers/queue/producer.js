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
exports.publishPostDelay = void 0;
const bull_1 = __importDefault(require("bull"));
const Posts_1 = __importDefault(require("../../models/Posts"));
exports.publishPostDelay = new bull_1.default('publishPostDelay');
exports.publishPostDelay.process((job, jobDone) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, id } = job.data;
    const newPost = yield Posts_1.default.query().insert({ owner_id: id, content, title });
    jobDone();
}));
exports.publishPostDelay.on("failed", (err) => {
    console.log(err);
});
//# sourceMappingURL=producer.js.map