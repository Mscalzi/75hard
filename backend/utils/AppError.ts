export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: 'fail' | 'error';

  constructor(message: string, statusCode: number, isOperational = false) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}
