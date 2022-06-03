import { Router, Request, Response } from 'express';
import { registerController } from './controllers/register.controller';
export const router = Router();

router.post('/register', registerController);
