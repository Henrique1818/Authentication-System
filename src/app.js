const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes/User');
// const router = require('./routes/User');


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(router);

// app.use((req, res, next) => {
//     const error = new Error('Não encontrado');
//     error.status = 404

//     next(error);
// });

// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     return res.send({
//         erro: {
//             mensagem: error.message
//         }
//     });
// });

// module.exports = app;


class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.express.use(routes);
    }
}

module.exports = new AppController().express;