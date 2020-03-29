import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import SessionController from './app/controllers/sessionController';
import AuthConfig from './app/middlewares/auth';
import UserController from './app/controllers/userController';
import RecipientController from './app/controllers/recipientController';
import FileController from './app/controllers/fileController';
import DeliveryPersonController from './app/controllers/deliveryPerson';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/session', SessionController.store);

routes.use(AuthConfig); // JWT token verifier

routes.post('/user', UserController.store);
routes.put('/user', UserController.update);
routes.get('/user', UserController.index);
routes.delete('/user', UserController.delete);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.get('/recipient', RecipientController.index);
routes.delete('/recipient', RecipientController.delete);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliveryperson', DeliveryPersonController.store);
routes.put('/deliveryperson', DeliveryPersonController.update);
routes.get('/deliveryperson', DeliveryPersonController.index);
routes.delete('/deliveryperson', DeliveryPersonController.delete);

export default routes;
