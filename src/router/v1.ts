import { Router } from 'express';
import feature from './index'
const router = Router();

router.use('/v1', feature)
export default router;
