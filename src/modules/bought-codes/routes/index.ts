import { Router } from 'express';

import boughtCodesRoutes from './bought-codes';

const boughtCodeRoutes = Router();

boughtCodeRoutes.use('/bought-codes', boughtCodesRoutes);

export default boughtCodeRoutes;
