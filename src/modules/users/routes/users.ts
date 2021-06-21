import { Router } from 'express';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UsersRepository from '../repositories/implementations/UsersRepository';
import database from '../../app/db';
import uploadConfig from '../../../config/upload';
import validateParams from '../../app/middlewares/validate-params';
import StorageProvider from '../../app/providers/implementations/StorageProvider';
import { registerUserSchema } from '../schemas/users.schemas';

const upload = multer(uploadConfig.multer);

const userRoutes = Router();

const storageProvider = new StorageProvider();
const usersRepository = new UsersRepository(database);

const usersController = new UsersController(usersRepository, storageProvider);

userRoutes.post(
  '/',
  [upload.array('profile_photos', 2), validateParams(registerUserSchema)],
  usersController.store,
);

export default userRoutes;
