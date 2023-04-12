import {Router} from "express";
import {CardController} from "./index";
import AuthorizationMiddleware from "../../middleware/authorizationMiddleware";

const router = Router();


router.get('/', AuthorizationMiddleware.authorizationAPI, CardController.getAllCards);
export default router;