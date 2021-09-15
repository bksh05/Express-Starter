import mongoose from 'mongoose';
import {DATABASE_CONFIG} from '../config';


/**
 * Function to connect to mongodb
 */
export const connectDb = () => {
    return mongoose.connect(DATABASE_CONFIG.URL);
};