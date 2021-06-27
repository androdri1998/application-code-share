import { Router } from 'express';

import database from '../../app/db';
import UsersRepository from '../repositories/implementations/UsersRepository';
import UserLoginCodeRepository from '../repositories/implementations/UserLoginCodeRepository';
import GenerateUserLoginCodeController from '../controllers/GenerateUserLoginCodeController';
import CheckUserLoginCodeController from '../controllers/CheckUserLoginCodeController';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import {
  userLoginCodeGenerateSchema,
  checkUserLoginCodeSchema,
} from '../schemas/user-login-code.schema';
import validateParams from '../../app/middlewares/validate-params';

const userAuthenticateRoutes = Router();

const usersRepository = new UsersRepository(database);
const databaseRepository = new DatabaseRepository(database);
const userLoginCodeRepository = new UserLoginCodeRepository(database);
const generateUserLoginCodeController = new GenerateUserLoginCodeController(
  usersRepository,
  userLoginCodeRepository,
  databaseRepository,
);
const checkUserLoginCodeController = new CheckUserLoginCodeController(
  userLoginCodeRepository,
  databaseRepository,
);

userAuthenticateRoutes.post(
  '/login/code/generate',
  [validateParams(userLoginCodeGenerateSchema)],
  generateUserLoginCodeController.store,
);

userAuthenticateRoutes.post(
  '/login/code/check',
  [validateParams(checkUserLoginCodeSchema)],
  checkUserLoginCodeController.store,
);

export default userAuthenticateRoutes;
