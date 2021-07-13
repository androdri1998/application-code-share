import { Router } from 'express';

import codesRoutes from './codes';

const codeRoutes = Router();

codeRoutes.use('/codes', codesRoutes);

export default codeRoutes;
