import express from 'express';
import Middlewares from "@src/middleware/authorizationMiddleware";
import {CardController} from "@src/feature/card/index";

const router = express.Router();


router.get('/', Middlewares.authorizationAPI, CardController.getAllCards)

export default router;