import { Router } from 'express';

import userRoutes from '../../users/routes';
import codeRoutes from '../../codes/routes';

const appRoutes = Router();

appRoutes.use(userRoutes);
appRoutes.use(codeRoutes);

export default appRoutes;
