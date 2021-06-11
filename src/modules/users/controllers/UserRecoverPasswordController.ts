/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import UserRecoverPasswordService from '../services/UserRecoverPasswordService';

class UserRecoverPasswordController {
  patch(req: Request, res: Response): Response<any, Record<string, any>> {
    const userRecoverPasswordService = new UserRecoverPasswordService();
    const response = userRecoverPasswordService.execute();
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default UserRecoverPasswordController;
