import { Router } from 'express';

import UserAuthenticateController from '../controllers/UserAuthenticateController';
import UserRecoverPasswordController from '../controllers/UserRecoverPasswordController';

const userAuthenticateRoutes = Router();

const userAuthenticateController = new UserAuthenticateController();
const userRecoverPasswordController = new UserRecoverPasswordController();

userAuthenticateRoutes.post('/login', userAuthenticateController.store);
userAuthenticateRoutes.patch(
  '/recover-password',
  userRecoverPasswordController.patch,
);

export default userAuthenticateRoutes;
