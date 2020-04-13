import { Router } from 'express'
import multer from 'multer'
import multerConfig from './config/multer'
const routes = new Router()

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import FileController from './app/controllers/FileController'
import ProviderController from './app/controllers/ProviderCintroller'
import AppointmentController from './app/controllers/AppointmentController'
import NotificationController from './app/controllers/NotificationController'
import authMiddleware from './app//middlewares/auth'
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/sessions', SessionController.store)

//middleware auth
routes.use(authMiddleware)
routes.post('/sessions', SessionController.store)

routes.put('/users', UserController.update)
routes.get('/users', UserController.index)

routes.get('/providers', ProviderController.index)

routes.post('/files', upload.single('file'), FileController.store)

routes.post('/appointments', AppointmentController.store)
routes.get('/appointment', AppointmentController.index)
routes.delete('/appointment/:id', AppointmentController.delete)

routes.get('/notifications', NotificationController.index)
routes.put('/notifications/:id', NotificationController.update)

export default routes
