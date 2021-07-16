"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
const Posts_1 = __importDefault(require("./Posts"));
class Users extends objection_1.Model {
    static get idColumn() {
        return 'id';
    }
    static get relationMappings() {
        return {
            posts: {
                relation: objection_1.Model.HasManyRelation,
                modelClass: Posts_1.default,
                join: {
                    from: 'users.id',
                    to: 'posts.owner_id'
                }
            }
        };
    }
    static get jsonSchema() {
        return {
            type: 'object',
            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                token: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                nickname: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }
}
exports.default = Users;
Users.tableName = 'users';
//# sourceMappingURL=Users.js.map