import {Router} from "express";
import Middlewares from "../../middleware/authorizationMiddleware";
import {CardController} from "./index";

const router = Router();


router.get('/', Middlewares.authorizationAPI, CardController.getAllCards);
export default router;