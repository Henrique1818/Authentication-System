const { Router } = require('express');

const UserSvc = require('../app/controllers/User');
const Auth = require('../app/middlewares/Auth');

const routes = Router();

routes.get('/singin', UserSvc.getLogin);
// routes.get('/:id', Auth, User.seekingUser)
routes.post('/singup', UserSvc.createUser);
// routes.put('/:email', User.update);

module.exports = routes;