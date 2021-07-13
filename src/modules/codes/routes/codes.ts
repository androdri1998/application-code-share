import { Router } from 'express';

import UsersRepository from '../../users/repositories/implementations/UsersRepository';
import CodesRepository from '../repositories/Implementations/CodesRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import database from '../../app/db';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../../users/middlewares/ensureAuthentication';
import { createCodeSchema } from '../schemas/codes.schema';
import CodesController from '../controllers/CodesController';

const codesRoutes = Router();

const usersRepository = new UsersRepository(database);
const codesRepository = new CodesRepository(database);
const databaseRepository = new DatabaseRepository(database);

const codesController = new CodesController(
  usersRepository,
  codesRepository,
  databaseRepository,
);

codesRoutes.post(
  '/',
  [ensureAuthentication, validateParams(createCodeSchema)],
  codesController.store,
);

export default codesRoutes;
