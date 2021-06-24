import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UsersRepository from '../repositories/implementations/UsersRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import database from '../../app/db';
import uploadConfig from '../../../config/upload';
import validateParams from '../../app/middlewares/validate-params';
import StorageProvider from '../../app/providers/implementations/StorageProvider';
import { registerUserSchema } from '../schemas/users.schema';

const upload = multer(uploadConfig.multer);

const userRoutes = Router();

const storageProvider = new StorageProvider();
const usersRepository = new UsersRepository(database);
const databaseRepository = new DatabaseRepository(database);

const usersController = new UsersController(
  usersRepository,
  storageProvider,
  databaseRepository,
);

userRoutes.post(
  '/',
  [upload.array('profile_photos', 2), validateParams(registerUserSchema)],
  usersController.store,
);

export default userRoutes;
