/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import UserAuthenticateLoginService from '../services/UserAuthenticateLoginService';

class UserAuthenticateController {
  store(req: Request, res: Response): Response<any, Record<string, any>> {
    const userAuthenticateLoginService = new UserAuthenticateLoginService();
    const response = userAuthenticateLoginService.execute();
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default UserAuthenticateController;
