const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes/User');

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