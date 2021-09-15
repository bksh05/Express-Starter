import User from '../../interfaces/types/user.type';
import {UserModel} from '../../models';

/**
 * 
 * @param user : The details of the user that needs to be created
 */
const createUser = async (user : User) : Promise<User> => {
    const result : User = await UserModel.create(user);
    return result;
}

/**
 * Fetch all the users
 */
const getAllUser = async () : Promise<Array<User>>=> {
    const result : Array<User> = await UserModel.find( {} , {_id : 0 , __v : 0});
    return result;
}

export {createUser , getAllUser};



/**
 * TODO : Add session 
 * TODO : Add error handler
 * TODO : Add Logger
 * TODO : Add common server response format
 * TODO : Add Linter
 */