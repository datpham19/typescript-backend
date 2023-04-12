import { Router } from 'express';
import Card from '@src/feature/card/router'


const router = Router();

router.use('card', Card)

export default router;