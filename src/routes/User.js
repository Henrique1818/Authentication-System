const { Router } = require('express');

const UserSvc = require('../app/controllers/User');
const Auth = require('../app/middlewares/Auth');

const routes = Router();

routes.get('/admin/singin', UserSvc.getLogin);
routes.get('/admin/:id', Auth, UserSvc.searchForUser)
routes.post('/admin/singup', UserSvc.create);
routes.put('/admin/:email', UserSvc.update);
routes.delete('/admin/:id', UserSvc.delete);

module.exports = routes;