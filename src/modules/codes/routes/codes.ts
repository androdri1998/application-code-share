import { Router } from 'express';

import UsersRepository from '../../users/repositories/implementations/UsersRepository';
import CodesRepository from '../repositories/Implementations/CodesRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import database from '../../app/db';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../../users/middlewares/ensureAuthentication';
import {
  createCodeSchema,
  getCodesSchema,
  getCodeSchemaByUser,
  removeCodeSchemaByUser,
  updateCodeSchemaByUser,
} from '../schemas/codes.schema';
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

codesRoutes.get(
  '/',
  [ensureAuthentication, validateParams(getCodesSchema)],
  codesController.index,
);

codesRoutes.get(
  '/:codeId',
  [ensureAuthentication, validateParams(getCodeSchemaByUser)],
  codesController.get,
);

codesRoutes.delete(
  '/:codeId',
  [ensureAuthentication, validateParams(removeCodeSchemaByUser)],
  codesController.destroy,
);

codesRoutes.patch(
  '/:codeId',
  [ensureAuthentication, validateParams(updateCodeSchemaByUser)],
  codesController.update,
);

export default codesRoutes;
