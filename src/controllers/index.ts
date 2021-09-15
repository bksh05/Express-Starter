import { Router } from "express";
import {UserController} from './user/user.controller';


/**
 * This is a index file
 * The main objective of this file are : 
 *  1. Import everything inside the parent folder of this index file
 *  2. Define a function that will register all the routes that are imported into a common Router object
 *  3. Export the function
 */


function registerRoutes(){
    const router : Router = Router();
    UserController.initRoutes(router);
    return router;
    
}


export default registerRoutes;