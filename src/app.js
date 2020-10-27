const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/SingUp');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/singup', router);

app.use((req, res, next) => {
    const error = new Error('Não encontrado');
    error.status = 404

    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;