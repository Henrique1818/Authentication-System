const express = require('express');
const { route } = require('../app');
const User = require('../app/controllers/User');

const router = express.Router();

router.post('/usuario', User.create);

router.get('/usuario', (req, res) => {
    res.status(200).send({
        mensagem: 'ok deu certo'
    })
})

module.exports = router;