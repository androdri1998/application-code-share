import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import UsersRepository from '../repositories/implementations/UsersRepository';
import database from '../../app/db';

const userRoutes = Router();

const usersRepository = new UsersRepository(database);

const usersController = new UsersController(usersRepository);

userRoutes.post('/', usersController.store);

export default userRoutes;
