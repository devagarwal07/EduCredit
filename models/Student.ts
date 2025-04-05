import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    course: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Student || mongoose.model("Student", StudentSchema);
