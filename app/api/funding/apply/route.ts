import { NextResponse } from "next/server";
import connectToDB from "@/lib/mongoose"; // Corrected import for default export
import FundingRequest from "@/lib/db/models/FundingRequest";
import { auth } from "@clerk/nextjs/server"; // Assuming Clerk for auth

export async function POST(request: Request) {
  try {
    // 1. Check authentication and get user ID
    const { userId } = await auth(); // Added await
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse request body
    const formData = await request.json();

    // 3. Validate incoming data (basic check)
    if (
      !formData ||
      !formData.personalInfo ||
      !formData.education ||
      !formData.funding ||
      !formData.career ||
      !formData.documents
    ) {
      return NextResponse.json(
        { error: "Missing required form data sections" },
        { status: 400 }
      );
    }

    // 4. Connect to Database
    await connectToDB();

    // 5. Prepare data for saving (add userId)
    const fundingRequestData = {
      ...formData,
      userId: userId, // Add the authenticated user's ID
      status: "pending", // Set initial status
    };

    // 6. Create and save the funding request
    const newFundingRequest = new FundingRequest(fundingRequestData);
    await newFundingRequest.save();

    // 7. Return success response
    return NextResponse.json(
      {
        message: "Funding application submitted successfully!",
        data: newFundingRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting funding application:", error);
    // Handle potential Mongoose validation errors specifically
    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Validation Error", details: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
