import { Request, Response, NextFunction } from 'express';
import { Product } from '../db/models/product.model';
import { Cart } from '../db/models/cart.model';
import cartService from '../services/cart.service';
import { CART_UPDATE_SUCCESS } from '../shared/success-messages';
import { PRODUCT_NOT_FOUND, USER_NOT_AUTHORIZED } from '../shared/errors/error-messages';
import { CustomError } from '../shared/errors/CustomError.class';

const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new CustomError(PRODUCT_NOT_FOUND, 404));
    }
    // @ts-ignore
    let cart = await Cart.findOne({ _id: req.session.uid });
    if (!cart) {
      // @ts-ignore
      cart = await cartService.createCart(req.session.uid);
    }
    cart.products.push(product._id);
    await cart.save();
    res.status(200).send({ message: CART_UPDATE_SUCCESS });
  } catch (err) {
    return next(err);
  }
};

export default {
  addToCart,
};
