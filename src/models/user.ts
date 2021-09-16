import mongoose from 'mongoose';
import IUserModel from '../interfaces/IDocuments/IUser.model';

/**
 * Define the schema of User
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
    },

    hash: {
      type: String,
      required: true,
    },

    salt: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: false
    }


  },
  { timestamps: true , },
);

userSchema.index({ email : 1} , {unique : true})

/**
 * Create model using the schema
 */
const UserModel = mongoose.model<IUserModel>('User', userSchema);

export default UserModel;