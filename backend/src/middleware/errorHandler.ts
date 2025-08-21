import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  
  const response: ApiResponse<null> = {
    success: false,
    error: {
      code: errorCode,
      message: err.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV === 'development' && { details: err.stack })
    },
    timestamp: new Date().toISOString()
  };

  res.status(statusCode).json(response);
};

export const createError = (message: string, statusCode = 500, code?: string): AppError => {
  const error = new Error(message) as AppError;
  error.statusCode = statusCode;
  error.code = code;
  return error;
};

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};