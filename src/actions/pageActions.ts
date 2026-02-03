"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPage(formData: FormData) {
    const title = formData.get("title") as string;
    const title_ar = formData.get("title_ar") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const content_ar = formData.get("content_ar") as string;
    const template = formData.get("template") as string;
    const isActive = formData.get("isActive") === "true";

    await prisma.page.create({
        data: {
            title,
            title_ar,
            slug,
            content,
            content_ar,
            template,
            isActive,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath(`/${slug}`);
    revalidatePath(`/page/${slug}`);
}

export async function updatePage(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const title_ar = formData.get("title_ar") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const content_ar = formData.get("content_ar") as string;
    const template = formData.get("template") as string;
    const isActive = formData.get("isActive") === "true";

    const page = await prisma.page.findUnique({ where: { id } });

    await prisma.page.update({
        where: { id },
        data: {
            title,
            title_ar,
            slug,
            content,
            content_ar,
            template,
            isActive,
        },
    });

    revalidatePath("/admin/pages");
    revalidatePath(`/${slug}`);
    revalidatePath(`/page/${slug}`);
    if (page?.slug && page.slug !== slug) {
        revalidatePath(`/${page.slug}`);
    }
}

export async function deletePage(id: string) {
    const page = await prisma.page.findUnique({ where: { id } });
    
    await prisma.page.delete({
        where: { id },
    });

    revalidatePath("/admin/pages");
    if (page) {
        revalidatePath(`/${page.slug}`);
        revalidatePath(`/page/${page.slug}`);
    }
}

export async function getPages() {
    return await prisma.page.findMany({
        orderBy: { updatedAt: "desc" },
    });
}

export async function getPageBySlug(slug: string) {
    return await prisma.page.findUnique({
        where: { slug },
    });
}

export async function getPageById(id: string) {
    return await prisma.page.findUnique({
        where: { id },
    });
}
