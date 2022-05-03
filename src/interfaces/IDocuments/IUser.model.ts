import { Document } from "mongoose";
import User from "../types/user.interface";

/**
 * These are special interfaces that combines Document type of mongoose and user-defined type
 * This helps to define types on the return types of mongoose methods.
 */

export default interface IUserModel extends Document , User {   
}