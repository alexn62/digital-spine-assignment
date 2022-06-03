import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../shared/errors/CustomError.class';
import { UNKNOWN_SERVER_ERROR } from '../shared/errors/error-messages';

export const errorHandler = (error: any, _req: Request, res: Response, _next: NextFunction): void => {
  console.log(error);
  // if no error is passed or the error is not one that was thrown by us
  //    send an unknown server error
  if (!error || (error && !(error instanceof CustomError))) {
    res.status(500).send({ error: UNKNOWN_SERVER_ERROR });
    // else send the custom error to the client
  } else {
    res.status(error.httpStatusCode).send({ error: error.message });
  }
};
