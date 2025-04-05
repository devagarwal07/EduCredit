import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import mongoose from "mongoose";

// MongoDB connection string
const MONGODB_URI =
  "mongodb+srv://gholumolumola:yO71YzU61x8p6fk1@cluster0.zhua5vp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

// Define UserInfo schema
const UserInfoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    personalDetails: {
      name: String,
      location: String,
      bio: String,
    },
    education: {
      level: String,
      institution: String,
      major: String,
      gradYear: String,
    },
    skills: {
      selectedSkills: [String],
      interests: [String],
    },
    career: {
      goals: String,
      preferredIndustries: [String],
      salaryExpectation: String,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: "UserInfo" }
);

// Get UserInfo model (or create if it doesn't exist)
const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", UserInfoSchema);

export async function POST(request) {
  try {
    // Verify authentication
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse request body
    const data = await request.json();

    // Connect to database
    await connectToDatabase();

    // Check if user already exists
    let userInfo = await UserInfo.findOne({ userId });

    if (userInfo) {
      // Update existing user
      userInfo.personalDetails = data.personalDetails;
      userInfo.education = data.education;
      userInfo.skills = data.skills;
      userInfo.career = data.career;
      userInfo.updatedAt = new Date();

      await userInfo.save();
    } else {
      // Create new user
      userInfo = new UserInfo({
        userId,
        personalDetails: data.personalDetails,
        education: data.education,
        skills: data.skills,
        career: data.career,
      });

      await userInfo.save();
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding data saved successfully",
      data: {
        userId: userInfo.userId,
        personalDetails: userInfo.personalDetails,
        education: userInfo.education,
        skills: userInfo.skills,
        career: userInfo.career,
      },
    });
  } catch (error) {
    console.error("Error saving onboarding data:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to save onboarding data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
