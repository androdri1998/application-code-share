import { Router } from 'express';

import UsersRepository from '../../users/repositories/implementations/UsersRepository';
import CodesRepository from '../../codes/repositories/Implementations/CodesRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import BoughtCodesRepository from '../repositories/implementations/BoughtCodesRepository';
import database from '../../app/db';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../../users/middlewares/ensureAuthentication';
import { removeBoughtCodeSchema } from '../schemas/bought-codes.schema';
import BoughtCodesController from '../controllers/BoughtCodesController';

const codesRoutes = Router();

const usersRepository = new UsersRepository(database);
const codesRepository = new CodesRepository(database);
const databaseRepository = new DatabaseRepository(database);
const boughtCodesRepository = new BoughtCodesRepository(database);

const boughtCodesController = new BoughtCodesController(
  usersRepository,
  boughtCodesRepository,
  codesRepository,
  databaseRepository,
);

codesRoutes.delete(
  '/:boughtCodeId/undo',
  [ensureAuthentication, validateParams(removeBoughtCodeSchema)],
  boughtCodesController.destroy,
);

export default codesRoutes;
