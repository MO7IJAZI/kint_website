"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJobApplication(formData: FormData) {
    const jobOfferId = formData.get("jobOfferId") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const linkedIn = formData.get("linkedIn") as string;
    const cvUrl = formData.get("cvUrl") as string;
    const coverLetter = formData.get("coverLetter") as string;

    await prisma.jobApplication.create({
        data: {
            jobOfferId,
            firstName,
            lastName,
            email,
            phone,
            address,
            linkedIn,
            cvUrl,
            coverLetter,
            status: "pending",
        },
    });

    revalidatePath("/about/career");
}

export async function getJobApplications() {
    return await prisma.jobApplication.findMany({
        include: {
            jobOffer: true,
        },
        orderBy: { submittedAt: "desc" },
    });
}

export async function getJobApplicationById(id: string) {
    return await prisma.jobApplication.findUnique({
        where: { id },
        include: {
            jobOffer: true,
        },
    });
}

export async function updateJobApplicationStatus(id: string, status: string, notes?: string) {
    await prisma.jobApplication.update({
        where: { id },
        data: {
            status,
            notes,
        },
    });

    revalidatePath("/admin/applications");
}

export async function deleteJobApplication(id: string) {
    await prisma.jobApplication.delete({
        where: { id },
    });

    revalidatePath("/admin/applications");
}
