import {Router} from "express";
import {CardController} from "./card.controller";
import AuthorizationMiddleware from "../../middleware/authorizationMiddleware";

const cardRouter = Router();



cardRouter.get('/', AuthorizationMiddleware.authorizationAPI, CardController.getAllCards);
cardRouter.post('/', AuthorizationMiddleware.authorizationAPI, CardController.createCard);
export default cardRouter;

/*********************************************************************/

/**
 * @swagger
 * /api/v1/authentication/token:
 *   post:
 *     summary: Login
 *     tags:
 *       - Authentication
 *     description: if grant_type = password then need eth_address and signature
 *     parameters:
 *       - in: body
 *         name: data
 *         description: Data for login.
 *         schema:
 *            type: object
 *            required:
 *            - eth_address
 *            - signature
 *            example:
 *               {
                        "grant_type":"client_credentials|password",
                        "api_key":"ea5f4d86-0c45-437e-bcb5-fa08946797f6",
                        "secret": "39yce55G7iyS2E5x5fKTKf1Oh1gpsvrm",
                        "eth_address":"0xc9c4e110ce10dbe70bb29c90feb053f53a983034",
                        "signature":"0xfd66726eec9dee89c2bf3b168687a291b1751b341270acd29dab19d4b38153f559671b6acfbff459d7f7f1c67560efc5c6e37fca287328be822bfc4c88802b0700",
                        "public_key":"cd61548a88b21b37189649d71ee13878bdd72e09746aadd1b5fd8804513a2b0a6b8dc6025d7cce987747991e6f087eb6644a2512486838f2d08466f74b576537"
                  }
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Ok
 *         examples:
 *           application/json:
 *             {
 *                 "data":{
                        "access_token":
                        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI1YjAxN2Y4ZS03MzE3LTQ5ZDMtYTEyOC02MTg3NTdmMTBiZGEiLCJ1c2VyX2lkIjoiMGIyNWQ3YjAtMjFlZC00NmFiLWI3OTEtMDk4NmQxOWNiZDA3IiwiaWF0IjoxNTY0MDM4MTYwLCJleHAiOjE1NjQwODEzNjAsImF1ZCI6Imh0dHBzOi8vd3d3LmluZmluaXRvLmlvLyIsImlzcyI6ImluZmluaXRvMSIsInN1YiI6ImluZm9AaW5maW5pdG8uaW8ifQ.IyGnNfdrfIRvqm4XinoSiyQN8p3WW5FOgxXtaFpl-zD_3i53-3sVDgact2DnJN5jcCoHxG0ywFFtmWKNAFsfXyqckFaX6B7OQNVfnx_oaIF3_ewN63O6RJUAWh0RiaMiQC-G-XSR5JlvBw1GkxUcd_L8h6mJcK4pi6JAk7rM5Y6iKURWXRJU3O2Vb8A6wXPkynlQSulhYF4wer_KK017UbG_0G2OshRnNQ0Qqx04p8bC7bv8940rACKlyFmsERx76DpHabASDqDgF5-nKKJV7FSF4d9fWC40HTs2zVWhCnfrYADbEphGgi1d0Rg6f5EnYnf-gaFS6UD2CM2FO_DkYA",
                        "token_type": "Bearer",
                        "expires_in": 3599,
                        "refresh_token": "712e3e04038dad366f734248960c56a90de395f5"
                    }
 *             }
 */
