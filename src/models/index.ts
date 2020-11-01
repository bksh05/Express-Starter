import mongoose from 'mongoose';
import {DATABASE_CONFIG} from '../config'
import UserModel from './user';



mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true); 
const connectDb = () => {
    const options = {
        keepAlive : DATABASE_CONFIG.KEEP_ALIVE,
        user : DATABASE_CONFIG.USER,
        pass : DATABASE_CONFIG.PASSWORD,
        poolSize : DATABASE_CONFIG.POOL_SIZE,
    }
    return mongoose.connect(DATABASE_CONFIG.URL , options);
};



export { connectDb , UserModel};

