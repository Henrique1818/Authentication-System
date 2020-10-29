const express = require('express');
const { route } = require('../app');
const User = require('../app/controllers/User');
const Auth = require('../app/middlewares/Auth');

const router = express.Router();
router.get('/', User.redirect);
router.get('/singin', User.login);
router.get('/:id', Auth, User.seekingUser)
router.post('/singup', User.create);
router.put('/:email', User.update);

module.exports = router;