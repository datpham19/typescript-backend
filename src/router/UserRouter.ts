import { Router, Request, Response } from 'express';
import {UserControllers} from "../controllers/user.controllers";

const router = Router();
const userController = new UserControllers();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await userController.index('', true, '');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

export default router;