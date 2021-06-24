import { Router } from 'express';

import database from '../../app/db';
import UsersRepository from '../repositories/implementations/UsersRepository';
import UserLoginCodeRepository from '../repositories/implementations/UserLoginCodeRepository';
import GenerateUserLoginCodeController from '../controllers/GenerateUserLoginCodeController';
import UserRecoverPasswordController from '../controllers/UserRecoverPasswordController';
import { UserLoginCodeGenerateSchema } from '../schemas/user-login-code.schema';
import validateParams from '../../app/middlewares/validate-params';

const userAuthenticateRoutes = Router();

const usersRepository = new UsersRepository(database);
const userLoginCodeRepository = new UserLoginCodeRepository(database);
const generateUserLoginCodeController = new GenerateUserLoginCodeController(
  usersRepository,
  userLoginCodeRepository,
);
const userRecoverPasswordController = new UserRecoverPasswordController();

userAuthenticateRoutes.post(
  '/login/code/generate',
  [validateParams(UserLoginCodeGenerateSchema)],
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
