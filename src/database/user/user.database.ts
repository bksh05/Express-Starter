import User from '../../interfaces/types/user.type';
import {UserModel} from '../../models';


const createUser = async (user : User) : Promise<User> => {
    const result : User = await UserModel.create(user);
    return result;
}

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
 */