const express = require('express');
const { route } = require('../app');
const User = require('../app/controllers/User');

const router = express.Router();

router.post('/singup', User.create);
router.get('/singin', User.login);

module.exports = router;