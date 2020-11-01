import { Request, Response, Router } from "express";
import User from "../../interfaces/types/user.type";
import { createUser, getAllUser } from "../../database"



/**
 * 
 * @param request 
 * @param response 
 * A function to create a single user in the database.
 */
const registerUser = async (request: Request, response: Response) => {
    const user: User = request.body;
    const result : User = await createUser(user);
    response.json(result);
}

/**
 * 
 * @param request 
 * @param response 
 * A function to fetch all the user from the database
 */
const fetchAllUser = async (request: Request, response: Response) => {
    const allUsers : Array<User> = await getAllUser();
    response.json(allUsers);

}

/**
 * All the function defined above are binded to routes
 * When a certain route is triggered then respective function are called according to request methods
 */
module.exports = {
    userRoute: (router: Router) => {
        return router.route('/user')
            .get(fetchAllUser)
            .post(registerUser);
    }
}