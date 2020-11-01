import { Request, Response, Router } from "express";
import User from "../../interfaces/types/user.type";
import { createUser, getAllUser } from "../../database"

const registerUser = async (request: Request, response: Response) => {
    const user: User = request.body;
    const result = await createUser(user);
    response.json(result);
}

const fetchAllUser = async (request: Request, response: Response) => {
    const allUsers = await getAllUser();
    response.json(allUsers);

}


module.exports = {
    userRoute: (router: Router) => {
        return router.route('/user')
            .get(fetchAllUser)
            .post(registerUser);
    }
}