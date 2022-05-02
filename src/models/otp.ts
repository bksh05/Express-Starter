import mongoose from "mongoose";
import IOtp from "../interfaces/IDocuments/IOtp.model";

/**
 * Define the schema of OTP
 */
const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },

    otp: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

otpSchema.index({ email: 1 }, { unique: true });

/**
 * Create model using the schema
 */
const OtpModel = mongoose.model<IOtp>("otp", otpSchema);

export default OtpModel;
