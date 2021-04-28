const { Router } = require('express');

const User = require('../app/controllers/User');
const Auth = require('../app/middlewares/Auth');

const routes = Router();

routes.get('/singin', User.login);
routes.get('/:id', Auth, User.seekingUser)
routes.post('/singup', User.create);
routes.put('/:email', User.update);

module.exports = routes;