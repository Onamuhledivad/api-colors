const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/user';
        this.adminPath = '/api/admin';

        //Middlewares
        this.middlewares();

        //Rutas de API
        this.routes();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Especificar formato
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.adminPath, require('../routes/admin'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo, Port:', this.port);
        });
    }


}

module.exports = Server;