import IUserModel from '../../interfaces/IDocuments/IUser.model';
import User from '../../interfaces/types/user.interface';
import {UserModel} from '../../models';

/**
 * 
 * @param user : The details of the user that needs to be created
 */
const createUser = async (user : User) : Promise<string> => {
    const result = await UserModel.create(user);
    return result._id
}

/**
 * Fetch all the users
 */
const getAllUser = async () : Promise<Array<User>>=> {
    const result : Array<User> = await UserModel.find( {} , {_id : 0 , __v : 0});
    return result;
}

/**
 * 
 * @param emailId emailId of the user
 * @returns User object
 * 
 * Fetch a user based on its emailId.
 */
const getUserByEmailId = async (emailId : String) : Promise<IUserModel | null> => {
    let user : IUserModel | null = await UserModel.findOne({emailId : emailId} , {emailId : 1 , hash : 1 , salt : 1, _id : 1});
    return user;
}

export {createUser , getAllUser , getUserByEmailId};



/**
 * TODO : Add Logger
 * TODO : Add Linter
 */