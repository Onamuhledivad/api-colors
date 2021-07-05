const express = require('express');
const cors = require('cors');
const { dbConn } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = '/api/v1/color';
        this.loginPath = '/api/v1/auth';

        //Conexion a la BD
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de API
        this.routes();
    }

    //Cadena de conexion
    async conectarDB() {
        await dbConn();
    }

    middlewares() {

        //CORS
        this.app.use(cors());

        //Especificar formato
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));
    }

    //Rutas
    routes() {
        this.app.use(this.loginPath, require('../routes/auth'));
        this.app.use(this.apiPath, require('../routes/color'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo, Port:', this.port);
        });
    }


}

module.exports = Server;