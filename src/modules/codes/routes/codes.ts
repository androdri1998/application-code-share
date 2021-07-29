import { Router } from 'express';

import UsersRepository from '../../users/repositories/implementations/UsersRepository';
import CodesRepository from '../repositories/Implementations/CodesRepository';
import DatabaseRepository from '../../app/repositories/implementations/DatabaseRepository';
import BoughtCodesRepository from '../../bought-codes/repositories/implementations/BoughtCodesRepository';
import CommentCodesRepository from '../../comment-codes/repositories/implementations/CommentCodesRepository';
import database from '../../app/db';
import validateParams from '../../app/middlewares/validate-params';
import ensureAuthentication from '../../users/middlewares/ensureAuthentication';
import {
  createCodeSchema,
  getCodesSchema,
  getCodeSchema,
  removeCodeSchema,
  updateCodeSchema,
  updateValidateCodeSchema,
  updateUnavailableAtCodeSchema,
} from '../schemas/codes.schema';
import { createBoughtCodeSchema } from '../../bought-codes/schemas/bought-codes.schema';
import {
  createCommentCodeSchema,
  removeCommentCodeSchema,
  updateCommentCodeSchema,
} from '../../comment-codes/schemas/comment-codes.schema';
import CodesController from '../controllers/CodesController';
import UpdateValidateCodeController from '../controllers/UpdateValidateCodeController';
import UpdateUnavailableAtController from '../controllers/UpdateUnavailableAtController';
import CommentCodesController from '../../comment-codes/controllers/CommentCodesController';
import BoughtCodesController from '../../bought-codes/controllers/BoughtCodesController';

const codesRoutes = Router();

const usersRepository = new UsersRepository(database);
const codesRepository = new CodesRepository(database);
const databaseRepository = new DatabaseRepository(database);
const commentCodesRepository = new CommentCodesRepository(database);
const boughtCodesRepository = new BoughtCodesRepository(database);

const codesController = new CodesController(
  usersRepository,
  codesRepository,
  databaseRepository,
);

const updateValidateCodeController = new UpdateValidateCodeController(
  usersRepository,
  codesRepository,
  databaseRepository,
);

const updateUnavailableAtController = new UpdateUnavailableAtController(
  usersRepository,
  codesRepository,
  databaseRepository,
);

const boughtCodesController = new BoughtCodesController(
  usersRepository,
  boughtCodesRepository,
  codesRepository,
  databaseRepository,
);

const commentCodesController = new CommentCodesController(
  usersRepository,
  commentCodesRepository,
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
  [ensureAuthentication, validateParams(getCodeSchema)],
  codesController.get,
);

codesRoutes.delete(
  '/:codeId',
  [ensureAuthentication, validateParams(removeCodeSchema)],
  codesController.destroy,
);

codesRoutes.patch(
  '/:codeId',
  [ensureAuthentication, validateParams(updateCodeSchema)],
  codesController.update,
);

codesRoutes.patch(
  '/:codeId/validate',
  [ensureAuthentication, validateParams(updateValidateCodeSchema)],
  updateValidateCodeController.update,
);

codesRoutes.patch(
  '/:codeId/unavailable-at',
  [ensureAuthentication, validateParams(updateUnavailableAtCodeSchema)],
  updateUnavailableAtController.update,
);

codesRoutes.post(
  '/:codeId/buy',
  [ensureAuthentication, validateParams(createBoughtCodeSchema)],
  boughtCodesController.store,
);

codesRoutes.post(
  '/:codeId/comments',
  [ensureAuthentication, validateParams(createCommentCodeSchema)],
  commentCodesController.store,
);

codesRoutes.delete(
  '/:codeId/comments/:commentCodeId',
  [ensureAuthentication, validateParams(removeCommentCodeSchema)],
  commentCodesController.destroy,
);

codesRoutes.patch(
  '/:codeId/comments/:commentCodeId',
  [ensureAuthentication, validateParams(updateCommentCodeSchema)],
  commentCodesController.update,
);

export default codesRoutes;
