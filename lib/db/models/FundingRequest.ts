import mongoose, { Schema, Document } from "mongoose";

export interface IFundingRequest extends Document {
  student: mongoose.Types.ObjectId;
  investor: mongoose.Types.ObjectId;
  amount: number;
  purpose: string;
  description: string;
  milestones: {
    title: string;
    description: string;
    deadline: Date;
    amount: number;
    isCompleted: boolean;
    completedDate?: Date;
  }[];
  status: "pending" | "approved" | "rejected" | "completed";
  contractAddress?: string;
  applicationDate: Date;
  responseDate?: Date;
  completionDate?: Date;
}

const MilestoneSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  amount: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },
  completedDate: Date,
});

const FundingRequestSchema: Schema = new Schema(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
    investor: { type: Schema.Types.ObjectId, ref: "Investor", required: true },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    description: { type: String, required: true },
    milestones: [MilestoneSchema],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "completed"],
      default: "pending",
    },
    contractAddress: String,
    applicationDate: { type: Date, default: Date.now },
    responseDate: Date,
    completionDate: Date,
  },
  { timestamps: true }
);

export default mongoose.models.FundingRequest ||
  mongoose.model<IFundingRequest>("FundingRequest", FundingRequestSchema);
