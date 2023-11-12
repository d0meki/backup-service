const express = require('express')
const cors = require('cors')
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.backup = '/api/backups';
        //Middlewares
        this.middlewares();
        //rutas
        this.routes();
    }

    middlewares() {
        //CORS
        // this.app.use(cors())
        const whiteList = ['http://127.0.0.1:8000'];
        this.app.use(cors({
            origin: whiteList
        }))
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.backup, require('../routes/backup'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto', this.port);
        })
    }
}

module.exports = Server
