import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import UsersRepository from '../repositories/implementations/UsersRepository';
import database from '../../app/db';
import validateParams from '../../app/middlewares/validate-params';
import { registerUserSchema } from '../schemas/users.schemas';

const userRoutes = Router();

const usersRepository = new UsersRepository(database);

const usersController = new UsersController(usersRepository);

userRoutes.post('/', validateParams(registerUserSchema), usersController.store);

export default userRoutes;
