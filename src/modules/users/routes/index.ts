import { Router } from 'express';

import userAuthenticateRoutes from './user-authenticate';
import usersRoutes from './users';

const userRoutes = Router();

userRoutes.use('/authenticate', userAuthenticateRoutes);
userRoutes.use('/users', usersRoutes);

export default userRoutes;
