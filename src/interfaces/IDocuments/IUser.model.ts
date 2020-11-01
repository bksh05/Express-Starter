import { Document } from "mongoose";
import User from "../types/user.type";

export default interface IUserModel extends Document , User {   
}