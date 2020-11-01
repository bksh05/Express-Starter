import { Router } from "express";

const userRoute = require('./user/user.controller');


function registerRoutes(){
    const router : Router = Router();
    userRoute.userRoute(router);
    return router;
}


export default registerRoutes;