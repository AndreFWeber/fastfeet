import { Router } from 'express';
import SessionController from './app/controllers/sessionController';
import AuthConfig from './app/middlewares/auth';

import UserController from './app/controllers/userController';
import RecipientController from './app/controllers/recipientController';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(AuthConfig); // JWT token verifier

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.get('/user', UserController.index);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.get('/recipient', RecipientController.index);

export default routes;
