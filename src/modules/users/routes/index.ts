import { Router } from 'express';

import userAuthenticateRoutes from './user-authenticate';

const userRoutes = Router();

userRoutes.use('/authenticate', userAuthenticateRoutes);

export default userRoutes;
