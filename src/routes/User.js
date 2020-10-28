const express = require('express');
const { route } = require('../app');
const User = require('../app/controllers/User');

const router = express.Router();

router.get('/singin', User.login);
router.post('/singup', User.create);
router.put('/:email', User.update);

module.exports = router;