import User from '../../interfaces/types/user.type';
import {UserModel} from '../../models';


const createUser = async (user : User) => {
    const result = await UserModel.create(user);
    return result;
}

const getAllUser = async () => {
    const result = await UserModel.find( {} , {_id : 0 , __v : 0});
    return result;
}

export {createUser , getAllUser};



/**
 * TODO : Add session 
 * TODO : Add error handler
 * TODO : Add Logger
 * TODO : Add types
 * 
 */