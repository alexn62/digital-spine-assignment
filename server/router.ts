import { Router, Request, Response } from 'express';
import cartController from './controllers/cart.controller';
import { loginController } from './controllers/login.controller';
import { logoutController } from './controllers/logout.controller';
import checkoutController from './controllers/checkout.controller';
import productsController from './controllers/products.controller';
import { registerController } from './controllers/register.controller';
import { authMiddleware } from './middlewares/auth.middleware';
import ordersController from './controllers/orders.controller';
export const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.delete('/logout', logoutController);

router.get('/products', productsController.getProducts);
router.get('/products/:id', productsController.getProduct);

router.patch('/addToCart/:id', cartController.addToCart);
router.delete('/removeFromCart/:id', cartController.removeFromCart);
router.get('/cart', cartController.getCart);

router.post('/checkout', authMiddleware, checkoutController.checkout);

router.get('/orders', authMiddleware, ordersController.getOrders);
