interface StatusToError {
  [key: string]: string;
}

class AppError {
  public readonly message: string;

  public readonly error: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    const statusToError: StatusToError = {
      '400': 'Bad Request',
      '401': 'Unauthorized',
      '403': 'Forbidden',
      '404': 'Not Found',
      '409': 'Conflict',
    };

    this.message = message;
    this.statusCode = statusCode;
    this.error = statusToError[statusCode];
  }
}

export default AppError;
