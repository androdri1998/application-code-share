/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import HTTPStatusCode from 'http-status-codes';

import GenerateUserLoginCodeService from '../services/GenerateUserLoginCodeService';

class GenerateUserLoginCodeController {
  store(req: Request, res: Response): Response<any, Record<string, any>> {
    const generateUserLoginCodeService = new GenerateUserLoginCodeService();
    const response = generateUserLoginCodeService.execute();
    return res.status(HTTPStatusCode.OK).json(response);
  }
}

export default GenerateUserLoginCodeController;
