"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitInquiry(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    await prisma.contactSubmission.create({
        data: {
            name,
            email,
            phone,
            subject,
            message,
        },
    });

    revalidatePath("/admin/inquiries");
    return { success: true, message: "Your message has been sent successfully!" };
}

export async function getInquiries() {
    return await prisma.contactSubmission.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function markAsRead(id: string) {
    await prisma.contactSubmission.update({
        where: { id },
        data: { isRead: true },
    });
    revalidatePath("/admin/inquiries");
}

export async function deleteInquiry(id: string) {
    await prisma.contactSubmission.delete({
        where: { id },
    });
    revalidatePath("/admin/inquiries");
}
