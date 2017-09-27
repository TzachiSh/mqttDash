import {Router} from 'express';

import authRoutes from './auth';
import AuthServices from './auth/auth-services';

const routes = new Router();

routes.use('/auth', authRoutes);

routes.get('/',AuthServices.jwtMiddleware,(req,res) => {
  res.send("If you see this, that mean you logged");
})

export default routes;