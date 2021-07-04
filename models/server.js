const express = require('express');
const cors = require('cors');
const { dbConn } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.apiPath = '/api/v1';

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

    routes() {
        this.app.use(this.apiPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo, Port:', this.port);
        });
    }


}

module.exports = Server;