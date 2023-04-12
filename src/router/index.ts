import { Router } from 'express';
import v1 from '../feature/index';

const router = Router();
router.use('/v1', v1);

export default router;

