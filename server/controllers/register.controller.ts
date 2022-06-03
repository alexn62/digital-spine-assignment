import { Request, Response, NextFunction } from 'express';
import { User } from '../db/models/user.model';
import registerService from '../services/register.service';
import bcrypt from 'bcrypt';
import { CustomError } from '../shared/errors/CustomError.class';
import {
  INVALID_EMAIL_ERROR,
  INVALID_PASSWORD_ERROR,
  UNKNOWN_SERVER_ERROR,
  USER_ALREADY_EXISTS_ERROR,
} from '../shared/errors/error-messages';
import { USER_CREATED } from '../shared/success-messages';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!registerService.validateEmail(email)) {
    next(new CustomError(INVALID_EMAIL_ERROR, 400));
  }
  if (!registerService.validatePassword(password)) {
    next(new CustomError(INVALID_PASSWORD_ERROR, 400));
  }
  if (await registerService.userExists(email)) {
    next(new CustomError(USER_ALREADY_EXISTS_ERROR, 400));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  try {
    await user.save();
    res.status(201).send({ message: USER_CREATED });
  } catch (err) {
    next(new CustomError(UNKNOWN_SERVER_ERROR, 500));
  }
};
