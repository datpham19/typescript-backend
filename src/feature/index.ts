import {Router} from 'express';
import card from './card/router'


const router = Router();

router.use('/cards', card)
export default router;
