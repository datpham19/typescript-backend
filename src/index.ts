import * as express from "express";
import * as dotenv from 'dotenv';
import "reflect-metadata";
import {Container} from "typedi";
import {UserControllers} from "./controllers/user.controllers";
import * as  bodyParser from "body-parser";
import * as swaggerJson from "./swagger.json";
import * as swaggerUI from "swagger-ui-express";
import Router from "./router/UserRouter";
import {RedisService} from "./config/redis";

dotenv.config();

const port = process.env['APP_PORT'];
const app = express();
const router = Router;
const redisService = Container.get(RedisService);


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(["/openapi", "/docs", "/swagger"], swaggerUI.serve, swaggerUI.setup(swaggerJson));

app.use('/api/v1', router);

app.use(Router);

app.listen(port, () => console.log(`Express is listening at http://localhost:${port}`));

export default app;