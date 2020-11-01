import {Request , Response} from "express";

const express = require('express');




const app = express();


app.use('/api' , function(request : Request , response : Response ) {
    response.json({ping : "true"})
})

app.listen(3000 , () => {
    console.log('lol')
})