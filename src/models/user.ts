import mongoose from 'mongoose';
 
/**
 * Define the schema of User
 */
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name : {
        type : String,
        required : true,
        unique : false
    }
  },
  { timestamps: true },
);
 

/**
 * Create model using the schema
 */
const UserModel = mongoose.model('User', userSchema);
 
export default UserModel;