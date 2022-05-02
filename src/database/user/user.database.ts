import IUserModel from "../../interfaces/IDocuments/IUser.model";
import IOtpModel from "../../interfaces/IDocuments/IOtp.model";
import User from "../../interfaces/types/user.interface";
import { UserModel } from "../../models";
import OtpModel from "../../models/otp";

/**
 * @param user : The details of the user that needs to be created
 */
export const createUser = async (user: User): Promise<string> => {
  const result = await UserModel.create(user);
  return result._id;
};

/**
 * Fetch all the users
 */
export const getAllUser = async (): Promise<Array<User>> => {
  const result: Array<User> = await UserModel.find({}, { _id: 0, __v: 0 });
  return result;
};

/**
 *
 * @param emailId emailId of the user
 * @returns User object
 *
 * Fetch a user based on its emailId.
 */
export const getLoginCredentialByEmailId = async (
  emailId: string
): Promise<IUserModel | null> => {
  let user: IUserModel | null = await UserModel.findOne(
    { emailId: emailId },
    { emailId: 1, hash: 1, salt: 1, _id: 1 }
  );
  return user;
};

export const isExistingUser = async (emailId: string): Promise<boolean> => {
  let user: IUserModel | null = await UserModel.findOne({ emailId: emailId });
  return user ? true : false;
};

export const saveOTP = async (email: string, otp: string) => {
  const otpUserMap: IOtpModel | null = await OtpModel.findOne({ email: email });

  if (otpUserMap) {
    const timeElapsedInSeconds =
      (new Date().getTime() - otpUserMap?.updatedAt.getTime()) / 1000;
    if (timeElapsedInSeconds < 60) {
      return false;
    }
  }

  await OtpModel.updateOne(
    { email: email },
    { $set: { otp: otp } },
    { upsert: true }
  );

  return true;
};


export const validateOTP = async (email: string, otp: string) => {
  // OTP is deleted because any otp needs to be validated once.
  const otpUserMap: IOtpModel | null = await OtpModel.findOneAndDelete({ email: email , otp: otp});
  if(!otpUserMap){
    return false;
  }

  // Expiry time is 5 minutes after otp updatedAt
  const expiryTime = new Date(otpUserMap.updatedAt.getTime() + 5*60000);

  if(expiryTime < new Date()){
    return false
  }

  return true;

}


export const changePassword = async (email: string, salt: string, hash: string) => {
  const result = await UserModel.updateOne({email: email}, {$set : {salt : salt , hash: hash}});

  if(result.modifiedCount <= 0){
    return false;
  }
  return true;
}

