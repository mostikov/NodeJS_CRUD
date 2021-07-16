"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const knex_1 = __importDefault(require("knex"));
const objection_1 = require("objection");
const knexfile_1 = __importDefault(require("../knexfile"));
const express_form_data_1 = __importDefault(require("express-form-data"));
dotenv_1.default.config();
objection_1.Model.knex(knex_1.default(knexfile_1.default.development));
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_form_data_1.default.parse());
const port = process.env.APP_PORT || 3000;
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`server is listening on ${port}`);
});
//# sourceMappingURL=app.js.map