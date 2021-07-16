"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Users_1 = __importDefault(require("./Users"));
class Posts extends objection_1.Model {
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            posts: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Users_1.default,
                join: {
                    from: 'posts.owner_id',
                    to: 'users.id'
                }
            }
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                owner_id: { type: 'integer' },
                content: { type: 'string' },
                title: { type: 'string' }
            }
        };
    }
}
exports.default = Posts;
Posts.tableName = 'posts';
//# sourceMappingURL=Posts.js.map