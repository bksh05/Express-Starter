import mongoose from 'mongoose';
import {DATABASE_CONFIG} from '../config';


/**
 * Function to connect to mongodb
 */
export const connectDb = () => {
    const options = {
        useNewUrlParser: true,
        autoIndex: true, 
        keepAlive: true,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 45000,
        useUnifiedTopology: true
    }
    return mongoose.connect(DATABASE_CONFIG.URL, options);
};