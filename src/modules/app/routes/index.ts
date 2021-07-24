import { Router } from 'express';

import userRoutes from '../../users/routes';
import codeRoutes from '../../codes/routes';
import boughtCodeRoutes from '../../bought-codes/routes';

const appRoutes = Router();

appRoutes.use(userRoutes);
appRoutes.use(codeRoutes);
appRoutes.use(boughtCodeRoutes);

export default appRoutes;
