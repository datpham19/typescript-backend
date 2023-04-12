import { Router } from 'express';
import Card from './card/router'
import app from "@src/app";

const router = Router();

router.use('/v1/card', Card)
export default router;
