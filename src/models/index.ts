import mongoose from 'mongoose';
import {DATABASE_CONFIG} from '../config'
import UserModel from './user';


/**
 * Function to connect to mongodb
 */
const connectDb = () => {
    return mongoose.connect(DATABASE_CONFIG.URL);
};



export { connectDb , UserModel};

