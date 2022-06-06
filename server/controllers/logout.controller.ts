import { Request, Response, NextFunction } from 'express';
import { LOGGED_OUT } from '../shared/success-messages';

export const logoutController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session) {
      // @ts-ignore
      req.session = null;
    }
    res.status(200).send({ message: LOGGED_OUT });
  } catch (err) {
    return next(err);
  }
};
