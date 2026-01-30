"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createJobOffer(formData: FormData) {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const workType = formData.get("workType") as string;
    const contractType = formData.get("contractType") as string;
    const employmentType = formData.get("employmentType") as string;
    const companyIntro = formData.get("companyIntro") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const benefits = formData.get("benefits") as string;
    const qualifications = formData.get("qualifications") as string;
    const isActive = formData.get("isActive") === "true";

    await prisma.jobOffer.create({
        data: {
            title,
            location,
            workType,
            contractType,
            employmentType,
            companyIntro,
            responsibilities,
            benefits,
            qualifications,
            isActive,
        },
    });

    revalidatePath("/admin/career");
    revalidatePath("/about/career");
}

export async function updateJobOffer(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const location = formData.get("location") as string;
    const workType = formData.get("workType") as string;
    const contractType = formData.get("contractType") as string;
    const employmentType = formData.get("employmentType") as string;
    const companyIntro = formData.get("companyIntro") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const benefits = formData.get("benefits") as string;
    const qualifications = formData.get("qualifications") as string;
    const isActive = formData.get("isActive") === "true";

    await prisma.jobOffer.update({
        where: { id },
        data: {
            title,
            location,
            workType,
            contractType,
            employmentType,
            companyIntro,
            responsibilities,
            benefits,
            qualifications,
            isActive,
        },
    });

    revalidatePath("/admin/career");
    revalidatePath("/about/career");
}

export async function deleteJobOffer(id: string) {
    await prisma.jobOffer.delete({
        where: { id },
    });

    revalidatePath("/admin/career");
    revalidatePath("/about/career");
}

export async function getJobOffers() {
    return await prisma.jobOffer.findMany({
        where: { isActive: true },
        orderBy: { publishedAt: "desc" },
    });
}

export async function getAllJobOffers() {
    return await prisma.jobOffer.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getJobOfferById(id: string) {
    return await prisma.jobOffer.findUnique({
        where: { id },
    });
}
