import * as express from "express";
import * as  bodyParser from "body-parser";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";

import {RedisService} from "../src/lib/redis";
import {Container} from "typedi";
import router from './router/index'
import MongoConnection from "./lib/mongo";
import logger from "../src/utils/logger";

const app = express();
const redisService = Container.get(RedisService);
const mongoConnection = MongoConnection;
mongoConnection.open().then(() => {
    logger.info('MongoDB connection successful!');
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/api', router);


// Capture 500 errors
app.use((err,req,res,next) => {
    res.status(500).send('Could not perform the calculation!');
    logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
    res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

export default app;