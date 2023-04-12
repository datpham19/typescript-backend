import { Response } from 'express';

export class JsonResponse {
  static success(response: Response, data: any, statusCode = 200) {
    response.status(statusCode).json(data);
  }

  static error(response: Response, message: string, statusCode = 500) {
    response.status(statusCode).json({ error: message });
  }
}