import {Router} from "express";
import {CardController} from "./index";
import AuthorizationMiddleware from "../../middleware/authorizationMiddleware";

const router = Router();
const controller = new CardController()


router.get('/', AuthorizationMiddleware.authorizationAPI, controller.getAllCards);
export default router;