import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import CodesByUserController from '../../codes/controllers/CodesByUserController';
import CodesRepository from '../../codes/repositories/Implementations/CodesRepository';
import UsersRepository from '../repositories/implementations/UsersRepository';
import UserLoginCodeRepository from '../repositories/implementations/UserLoginCodeRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import database from '../../app/db';
import uploadConfig from '../../../config/upload';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import StorageProvider from '../../app/providers/implementations/StorageProvider';
import { getCodesByUserSchema } from '../../codes/schemas/codes.schema';
import {
  registerUserSchema,
  getUserSchema,
  getUsersSchema,
  deleteUserSchema,
  updateUserSchema,
} from '../schemas/users.schema';

const upload = multer(uploadConfig.multer);

const userRoutes = Router();

const storageProvider = new StorageProvider();
const usersRepository = new UsersRepository(database);
const userLoginCodeRepository = new UserLoginCodeRepository(database);
const codesRepository = new CodesRepository(database);
const databaseRepository = new DatabaseRepository(database);

const usersController = new UsersController(
  usersRepository,
  userLoginCodeRepository,
  storageProvider,
  databaseRepository,
);

const codesByUserController = new CodesByUserController(
  usersRepository,
  codesRepository,
  databaseRepository,
);

userRoutes.post(
  '/',
  [upload.array('profile_photos', 2), validateParams(registerUserSchema)],
  usersController.store,
);

userRoutes.get(
  '/',
  [ensureAuthentication, validateParams(getUsersSchema)],
  usersController.index,
);

userRoutes.get(
  '/:userId',
  [ensureAuthentication, validateParams(getUserSchema)],
  usersController.get,
);

userRoutes.get(
  '/:userId/codes',
  [ensureAuthentication, validateParams(getCodesByUserSchema)],
  codesByUserController.index,
);

userRoutes.delete(
  '/:userId',
  [ensureAuthentication, validateParams(deleteUserSchema)],
  usersController.destroy,
);

userRoutes.put(
  '/:userId',
  [
    ensureAuthentication,
    upload.array('profile_photos', 2),
    validateParams(updateUserSchema),
  ],
  usersController.update,
);

export default userRoutes;
