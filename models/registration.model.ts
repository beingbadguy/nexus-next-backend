import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  semester: string; 
  gender: string;
  branch: string;
  registrationNumber: string;
}

const RegistrationSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    semester: { type: String, required: true, min: 1, max: 8 },
    gender: { type: String, required: true },
    branch: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Registration ||
  mongoose.model<IRegistration>("Registration", RegistrationSchema);
