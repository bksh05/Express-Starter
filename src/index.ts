import express, {Request , Response} from "express";
import { constants } from "./utils/constant";
import {APPLICATION_CONFIG} from './config'
import { connectDb } from "./models";
import cors from 'cors';
import registerRoutes from "./controllers";
import helmet from 'helmet';
import compression from 'compression';


const app = express();


/**
 * A middleware to compress the body of the response
 * For more details : https://github.com/expressjs/compression
 */
app.use(compression()); 

/**
 * A middleware to set common headers that can be used to protect against some known attacks
 * For more details : https://helmetjs.github.io/
 */
app.use(helmet());


/**
 * A middleware to specify which application is allowed to recieve the response
 * Change "http://localhost:4200" to desired url
 * The package used here provide a lot of configuration and can be modified as per requirement
 * For more details : https://github.com/expressjs/cors
 */
var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions));



/**
 * Ping request
 * To test if the server is running
 */
app.use('/api/ping' , function(request : Request , response : Response ) {
    response.json({
        ping : "pinged"
    })
})

/**
 * Registering all routes 
 */
app.use('/api/exp-start' , registerRoutes());


/**
 * 1. Connect to database
 * 2. If connection to database is complete then re-start the application
 */
connectDb().then(
    () => {
        app.listen(APPLICATION_CONFIG.PORT , () => {
            console.log(constants.START_MESSAGE,APPLICATION_CONFIG.PORT)
        })
    }
)

