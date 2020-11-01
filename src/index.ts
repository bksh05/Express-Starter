import {Request , Response} from "express";

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors')
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






app.use('/api/ping' , function(request : Request , response : Response ) {
    response.json({
        ping : "pinged"
    })
})

app.listen(3000 , () => {
    console.log('lol')
})
