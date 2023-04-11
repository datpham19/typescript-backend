import * as express from "express";
import * as  bodyParser from "body-parser";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";

import {RedisService} from "@src/lib/redis";
import {Container} from "typedi";
import config from "./config";
import router from '@src/feature/router'


const port = config.appPort;
const app = express();
const redisService = Container.get(RedisService);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/api', router);

export default app;