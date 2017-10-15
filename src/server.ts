
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from "compression";
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';
import * as schedule from 'node-schedule';
import * as http from "http";


import UserRouter from "./routes/UserRouter";
import PKMRouter from "./routes/PKMRouter";

class Server {
    app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();

    }

    config() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(compression());
        this.app.use(logger('dev'));
        this.app.use(helmet());
        this.app.use(cors());

        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', "http://localhost:3000/");
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();            
        });
    }

    routes(): void {
        let router: express.Router;
        router = express.Router();
        
        this.app.use('/', router);
        this.app.use('/user', UserRouter);
        this.app.use('/pkm', PKMRouter);

    }

    public run(PORT:number | string | boolean): void {
        if(process.env.NODE_ENV !== "TEST_ENV"){
            this.app.listen(PORT || 3000, ()=>{
                console.log(`Server listening on port ${3000} `);
            });
        }

        else{
            this.app.listen(PORT || 3001, ()=>{
                console.log(`Server listening on port ${3001}`);
            });
        }
    }
}

export default Server;