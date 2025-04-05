import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  role: "student" | "investor";
  profileImage: string;
  location: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  clerkId: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ["student", "investor"], required: true },
    profileImage: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    socialLinks: {
      linkedin: String,
      twitter: String,
      github: String,
      website: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    clerkId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
