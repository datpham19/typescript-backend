import * as express from "express";
import * as  bodyParser from "body-parser";
import * as swaggerUI from "swagger-ui-express";
import expressSwaggerGenerator from 'express-swagger-generator';

import {RedisService} from "../src/lib/redis";
import {Container} from "typedi";
import router from './router/index'
import config from "./config";
import MongoConnection from "./lib/mongo";
import logger, {httpLoggerMiddleware} from "../src/utils/logger";
import PostgreSQL from "../src/lib/pg";

const app = express();
const redisService = Container.get(RedisService);
const mongoConnection = new MongoConnection();
const postgresConnection = new PostgreSQL();

postgresConnection.connect();
mongoConnection.open()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(httpLoggerMiddleware)

app.use('/api', router);
export default app;