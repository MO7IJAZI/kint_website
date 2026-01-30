"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface DownloadInput {
    title: string;
    type: string;
    fileUrl: string;
}

export async function createProduct(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const sku = formData.get("sku") as string;
    const description = formData.get("description") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const categoryId = formData.get("categoryId") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    const isOrganic = formData.get("isOrganic") === "true";
    const image = formData.get("image") as string;
    const benefits = formData.get("benefits") as string;
    const usage = formData.get("usage") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;

    const usageTableStr = formData.get("usageTable") as string;
    const compTableStr = formData.get("compTable") as string;
    const downloadsStr = formData.get("downloads") as string;

    const usageTable = usageTableStr ? JSON.parse(usageTableStr) : null;
    const compTable = compTableStr ? JSON.parse(compTableStr) : null;
    const downloads = downloadsStr ? (JSON.parse(downloadsStr) as DownloadInput[]) : [];

    await prisma.product.create({
        data: {
            name,
            slug,
            sku,
            description,
            shortDesc,
            categoryId,
            isFeatured,
            isOrganic,
            image,
            benefits,
            usage,
            usageTable,
            compTable,
            metaTitle,
            metaDesc,
            downloads: {
                create: downloads.map((d) => ({
                    title: d.title,
                    type: d.type,
                    fileUrl: d.fileUrl
                }))
            }
        },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/product/${slug}`);
}

export async function updateProduct(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const sku = formData.get("sku") as string;
    const description = formData.get("description") as string;
    const shortDesc = formData.get("shortDesc") as string;
    const categoryId = formData.get("categoryId") as string;
    const isFeatured = formData.get("isFeatured") === "true";
    const isOrganic = formData.get("isOrganic") === "true";
    const image = formData.get("image") as string;
    const benefits = formData.get("benefits") as string;
    const usage = formData.get("usage") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;

    const usageTableStr = formData.get("usageTable") as string;
    const compTableStr = formData.get("compTable") as string;
    const downloadsStr = formData.get("downloads") as string;

    const usageTable = usageTableStr ? JSON.parse(usageTableStr) : null;
    const compTable = compTableStr ? JSON.parse(compTableStr) : null;
    const downloads = downloadsStr ? (JSON.parse(downloadsStr) as DownloadInput[]) : [];

    await prisma.product.update({
        where: { id },
        data: {
            name,
            slug,
            sku,
            description,
            shortDesc,
            categoryId,
            isFeatured,
            isOrganic,
            image,
            benefits,
            usage,
            usageTable,
            compTable,
            metaTitle,
            metaDesc,
            downloads: {
                deleteMany: {},
                create: downloads.map((d) => ({
                    title: d.title,
                    type: d.type,
                    fileUrl: d.fileUrl
                }))
            }
        },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
    revalidatePath(`/product/${slug}`);
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id },
    });

    revalidatePath("/admin/products");
    revalidatePath("/products");
}

export async function getProducts() {
    return await prisma.product.findMany({
        include: {
            category: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getProductBySlug(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            images: true,
            downloads: true,
        },
    });
}
export async function getProductById(id: string) {
    return await prisma.product.findUnique({
        where: { id },
        include: {
            category: true,
            downloads: true,
        },
    });
}
