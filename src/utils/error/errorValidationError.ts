import { ValidationError } from 'express-validator';
import { CustomError } from './customError';
export class ReqVaidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, ReqVaidationError.prototype);
  }
  formatErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}