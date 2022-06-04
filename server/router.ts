import { Router, Request, Response } from 'express';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import productsController from './controllers/products.controller';
import { registerController } from './controllers/register.controller';
export const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.delete('/logout', logoutController);

router.get('/products', productsController.getProducts);
