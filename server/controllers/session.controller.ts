import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { Cart } from '../db/models/cart.model';
import { CustomError } from '../shared/errors/CustomError.class';
import { SESSION_NOT_FOUND } from '../shared/errors/error-messages';
const getSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = {};

    if (!req.session) {
      throw new CustomError(SESSION_NOT_FOUND, 404);
    }
    // @ts-ignore
    if (req.session.uid) {
      // @ts-ignore
      response.uid = req.session.uid;
    }
    const cart = await Cart.findOne({ sessionId: req.sessionID });
    if (cart) {
      // @ts-ignore
      response.cart = cart.products.map((product) => product.quantity).reduce((a, b) => a + b, 0);
    }
    res.status(200).send(response);
  } catch (err) {
    return next(err);
  }
};

export default {
  getSession,
};
