import { Request, Response, NextFunction } from 'express';
import { USER_NOT_LOGGED_IN } from '../shared/errors/error-messages';

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // @ts-ignore
  if (req.session && req.session.uid) {
    next();
  } else {
    res.status(401).send(USER_NOT_LOGGED_IN);
  }
};
