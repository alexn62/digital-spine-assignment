import { NextFunction, Response, Request } from 'express';
import { User } from '../db/models/user.model';
import { CustomError } from '../shared/errors/CustomError.class';
import { INVALID_EMAIL_OR_PASSWORD_ERROR, UNKNOWN_SERVER_ERROR } from '../shared/errors/error-messages';
import bcrypt from 'bcrypt';
import { LOGGED_IN } from '../shared/success-messages';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError(INVALID_EMAIL_OR_PASSWORD_ERROR, 400));
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError(INVALID_EMAIL_OR_PASSWORD_ERROR, 400));
    }
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(new CustomError(INVALID_EMAIL_OR_PASSWORD_ERROR, 400));
    }
    // @ts-ignore
    req.session.uid = user._id;
    res.status(200).send({ message: LOGGED_IN });
  } catch (err) {
    return next(new CustomError(UNKNOWN_SERVER_ERROR, 500));
  }
};
