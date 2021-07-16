import dotenv from 'dotenv'
import express from 'express';
import router from './routes'
import Knex from 'knex'
import { Model } from 'objection'
import knexConfig from '../knexfile'
import bodyParser from 'express-form-data'
dotenv.config()

Model.knex(Knex(knexConfig.development))


const app = express();
app.use(express.json())
app.use(bodyParser.parse());

const port = process.env.APP_PORT || 3000;
app.use(router)

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});