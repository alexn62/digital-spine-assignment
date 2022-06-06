import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/models/product.model';
import { Cart } from '../db/models/cart.model';
import cartService from '../services/cart.service';
import { CART_UPDATE_SUCCESS } from '../shared/success-messages';
import { CART_NOT_FOUND, PRODUCT_NOT_FOUND, USER_NOT_AUTHORIZED } from '../shared/errors/error-messages';
import { CustomError } from '../shared/errors/CustomError.class';
import mongoose from 'mongoose';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError(PRODUCT_NOT_FOUND, 404));
    }
    let cart = await Cart.findOne({ sessionId: req.sessionID });
    if (!cart) {
      cart = await cartService.createCart(req.sessionID, product._id);
    } else {
      // if product already in cart, increase quantity
      const productIdStrings = cart.products.map((item: { product: mongoose.Types.ObjectId }) =>
        item.product.toString()
      );
      if (productIdStrings.includes(product._id.toString())) {
        const productIndex = productIdStrings.indexOf(product._id.toString());
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }
    }
    await cart.save();
    res.status(200).send({ message: CART_UPDATE_SUCCESS });
  } catch (err) {
    return next(err);
  }
};

const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError(PRODUCT_NOT_FOUND, 404));
    }
    let cart = await Cart.findOne({ sessionId: req.sessionID });

    if (!cart) {
      return next(new CustomError(CART_NOT_FOUND, 404));
    }
    const productIndex = cart.products
      .map((item: { product: mongoose.Types.ObjectId }) => item.product.toString())
      .indexOf(product._id.toString());
    if (productIndex === -1) {
      return next(new CustomError(PRODUCT_NOT_FOUND, 404));
    }
    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1);
    }
    await cart.save();
    res.status(200).send({ message: CART_UPDATE_SUCCESS });
  } catch (err) {
    return next(err);
  }
};

const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const cart = await Cart.findOne({ sessionId: req.sessionID }).populate('products.product');
    if (!cart) {
      return next(new CustomError(CART_NOT_FOUND, 404));
    }
    res.status(200).send(cart);
  } catch (err) {
    return next(err);
  }
};

export default {
  addToCart,
  removeFromCart,
  getCart,
};
