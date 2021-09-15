import { Request, Response, Router } from "express";
import User from "../../interfaces/types/user.type";
import { createUser, getAllUser } from "../../database"



export class UserController {

    /**
     * 
     * @param request 
     * @param response 
     * A function to create a single user in the database.
     */
    static async registerUser(request: Request, response: Response) {
        console.log(request.body)
        const user: User = request.body;
        const result: User = await createUser(user);
        response.send(result);
    }


    /**
     * 
     * @param request 
     * @param response 
     * A function to fetch all the user from the database
     */
    static async fetchAllUser(request: Request, response: Response) {
        const allUsers: Array<User> = await getAllUser();
        response.send(allUsers);

    }


    static initRoutes(router : Router): any{
        return router.route('/user').get(this.fetchAllUser).post(this.registerUser);
    }
}