import { Router } from 'express';

import GenerateUserLoginCodeController from '../controllers/GenerateUserLoginCodeController';
import UserRecoverPasswordController from '../controllers/UserRecoverPasswordController';

const userAuthenticateRoutes = Router();

const generateUserLoginCodeController = new GenerateUserLoginCodeController();
const userRecoverPasswordController = new UserRecoverPasswordController();

userAuthenticateRoutes.post(
  '/login/code/generate',
  generateUserLoginCodeController.store,
);

userAuthenticateRoutes.post(
  '/login/code/check',
  generateUserLoginCodeController.store,
);

userAuthenticateRoutes.patch(
  '/recover-password',
  userRecoverPasswordController.patch,
);

export default userAuthenticateRoutes;
