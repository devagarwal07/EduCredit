import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const createCollection = async (): Promise<{ success: boolean; error?: any }> => {
    try {
        await mongoose.connect(process.env.NEXT_MONGODB_URI!);

        if (!mongoose.connection.db) {
            throw new Error("Database connection not established.");
        }

        await mongoose.connection.db.createCollection("marketplace");

        return { success: true };
    } catch (error) {
        return { success: false, error };
    }
};
