import express from 'express';
import card from '@src/feature/card/router';

const router = express.Router();
router.use('/v1', card);

export default router;
