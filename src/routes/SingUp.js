const express = require('express');
const { route } = require('../app');
const router = express.Router();

router.post('/teste', (req, res) => {
    res.status(200).send({
        mensagem: 'ok deu certo Criado o POST'
    });

})

router.get('/teste', (req, res) => {
    res.status(200).send({
        mensagem: 'ok deu certo'
    })
})

module.exports = router;