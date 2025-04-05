import mongoose from "mongoose";

const InvestorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    company: { type: String },
    funds: { type: Number },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Investor || mongoose.model("Investor", InvestorSchema);
