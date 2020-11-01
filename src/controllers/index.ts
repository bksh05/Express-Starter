import { Router } from "express";

const userRoute = require('./user/user.controller');


/**
 * This is a index file
 * The main objective of this file are : 
 *  1. Import everything inside the parent folder of this index file
 *  2. Define a function that will regiester all the routes that are imported into a commnon Router object
 *  3. Export the function
 */


function registerRoutes(){
    const router : Router = Router();
    userRoute.userRoute(router);
    return router;
}


export default registerRoutes;