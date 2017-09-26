import {Router} from 'express';

import * as authController from './auth-controller';
import AuthServices from './auth-services';

const routes = new Router();

routes.post('/register', authController.singup);
routes.post('/login', authController.login, AuthServices.loginMiddleware);

export default routes;
