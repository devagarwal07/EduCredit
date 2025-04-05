import mongoose from "mongoose";

const MarketplaceSchema = new mongoose.Schema({
    fullName: String,
    emailAddress: String,
    phoneNumber: String,
    location: String,
    bio: String,
    educationLevel: String,
    institution: String,
    fieldOfStudy: String,
    expectedGradDate: String,
    gpa: String,
    skills: [String],
    fundAmount: String,
    fundingTimeline: String,
    fundingPurpose: String,
    shortTermGoals: String,
    longTermGoals: String,
    targetIndustries: [String],
    targetRoles: [String],
    expectedSalary: String,
    portfolioLink: String,
    additionalLinks: [String],
}, {
    collection: "marketplace",
});

export default mongoose.model("Marketplace", MarketplaceSchema);
