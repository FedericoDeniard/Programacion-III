import { HttpError, ResponseObject } from '../utils/response';
import { NextFunction, Request, Response } from 'express';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(new ResponseObject(false, err.message, null));
}