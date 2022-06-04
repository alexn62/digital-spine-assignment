import { Router, Request, Response } from 'express';
import cartController from './controllers/cart.controller';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import productsController from './controllers/products.controller';
import { registerController } from './controllers/register.controller';
import { authMiddleware } from './middlewares/auth.middleware';
export const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.delete('/logout', logoutController);

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);

router.patch('/addToCart/:id', authMiddleware, cartController.addToCart);
router.delete('/removeFromCart/:id', authMiddleware, cartController.removeFromCart);
router.get('/cart', authMiddleware, cartController.getCart);
