import { NextResponse } from "next/server";
import { createJobApplication } from "@/actions/jobApplicationActions";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        await createJobApplication(formData);
        return NextResponse.json({ success: true, message: "Application submitted successfully!" });
    } catch (error) {
        console.error("Failed to submit job application:", error);
        return NextResponse.json(
            { error: "Failed to submit application" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // This endpoint is for admin use - list all applications
    const { getJobApplications } = await import("@/actions/jobApplicationActions");
    try {
        const applications = await getJobApplications();
        return NextResponse.json(applications);
    } catch (error) {
        console.error("Failed to fetch job applications:", error);
        return NextResponse.json(
            { error: "Failed to fetch applications" },
            { status: 500 }
        );
    }
}
