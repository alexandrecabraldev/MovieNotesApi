import { Router } from 'express'
import usersControllers from '../controllers/usersController'
import authenticationMiddleware from '../middlewares/verifyAuthentication'
import verifyUsersController from '../controllers/verifyUsersControllers'
import verifyUsersControllers from '../controllers/verifyUsersControllers'
export const routes = Router()

routes.post('/create',verifyUsersController.verifyCreateUsers, usersControllers.createUser)
// routes.put('/user',verifyAuthSignin ,verifyUsersControllers.verifyOldPassword, usersControllers.updateUserInformation)

routes.use(authenticationMiddleware.verifyAuthentication)
routes.route('/users')
.get(usersControllers.getAllUsers)

routes.route('/user')
  //.post(verifyUsersController.verifyCreateUsers, usersControllers.createUser)
  .put( verifyUsersControllers.verifyOldPassword, usersControllers.updateUserInformation )
  .get(usersControllers.getUserAuthenticated)

routes.route('/user/:id')
  .get( usersControllers.getUser)
