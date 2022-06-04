import { NextFunction, Request, Response } from 'express';
import productsService, { Query } from '../services/products.service';

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productsService.getProducts(req.query);
    res.status(200).json(products);
  } catch (err) {
    return next(err);
  }
};

export default {
  getProducts,
};
