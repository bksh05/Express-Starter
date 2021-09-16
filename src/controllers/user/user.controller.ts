import { Request, Response, Router } from "express";
import User from "../../interfaces/types/user.interface";
import { createUser, getAllUser } from "../../database"
import { constants } from "../../utils/constant";
import { generatePassword, getServerResponse, issueJWT, validatePassword } from "../../utils/helpers";
import { getUserByEmailId } from "../../database/user/user.database";
import passport from "passport";



export class UserController {

    /**
     * 
     * @param request 
     * @param response 
     * A function to create a single user in the database.
     */
    static async registerUser(request: Request, response: Response) {
        try {
            if (request.body.email && request.body.name && request.body.password) {
                const saltHash = generatePassword(request.body.password);
                const salt = saltHash.salt;
                const hash = saltHash.hash;
                const user = await getUserByEmailId(request.body.email);
                if (!user) {
                    const userId = await createUser({
                        email: request.body.email,
                        name: request.body.name,
                        salt: salt,
                        hash: hash,
                        image: request.body.image ?? "image.png"

                    });
                    const token = issueJWT(userId);
                    const serverResponse = getServerResponse(true, {
                        token: token.token,
                        expires: token.expires
                    });
                    response.send(serverResponse);
                } else {
                    const serverResponse = getServerResponse(false, {}, constants.USER_ALREADY_EXIST);
                    response.status(constants.USER_ALREADY_EXIST.code).send(serverResponse);
                }

            } else {
                const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);
                response.status(constants.BAD_REQUEST.code).send(serverResponse);
            }
        }
        catch (e) {
            console.log(e);
            const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
            response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
        }

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

    static async login(request: Request, response: Response) {
        const username = request.body.username;
        const password = request.body.password;

        try {
            if (username && password) {
                const user = await getUserByEmailId(username);
                if (user) {
                    if (validatePassword(password, user.hash, user.salt)) {
                        const token = issueJWT(user._id);
                        const serverResponse = getServerResponse(true, { token: token.token, expires: token.expires });
                        response.send(serverResponse);
                    }
                } else {
                    const serverResponse = getServerResponse(false, {}, constants.INVALID_CREDENTIALS);
                    response.status(constants.INVALID_CREDENTIALS.code).send(serverResponse);
                }
            } else {
                const serverResponse = getServerResponse(false, {}, constants.BAD_REQUEST);
                response.status(constants.BAD_REQUEST.code).send(serverResponse);
            }
        } catch (e) {
            console.log(e);
            const serverResponse = getServerResponse(false, {}, constants.INTERNAL_SERVER_ERROR);
            response.status(constants.INTERNAL_SERVER_ERROR.code).send(serverResponse);
        }

    }


    static initRoutes(router: Router): any {
        router.route('/login').post(this.login);
        router.route('/register').post(this.registerUser);
        return router.route('/user').get(passport.authenticate('jwt', { session: false }), this.fetchAllUser);
    }

}