import {Request , Response} from "express";
import { constants } from "./utils/constant";
import {APPLICATION_CONFIG} from './config'
import { connectDb } from "./models";

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser');


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
 * Parse incoming request bodies in a middleware before your handlers
 * By using this request body of a request is accessible
 * For more detail : https://github.com/expressjs/body-parser
 */

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json



app.use('/api/ping' , function(request : Request , response : Response ) {
    response.json({
        ping : "pinged"
    })
})

connectDb().then(
    () => {
        app.listen(APPLICATION_CONFIG.PORT , () => {
            console.log(constants.START_MESSAGE,APPLICATION_CONFIG.PORT)
        })
    }
)

