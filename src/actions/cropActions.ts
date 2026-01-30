"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface StageInput {
    name: string;
    products: string[];
}

export async function createCrop(formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const pdfUrl = formData.get("pdfUrl") as string;
    
    const productIdsStr = formData.get("productIds") as string;
    const productIds = productIdsStr ? (JSON.parse(productIdsStr) as string[]) : [];

    const stagesStr = formData.get("stages") as string;
    const stages = stagesStr ? (JSON.parse(stagesStr) as StageInput[]) : [];

    await prisma.crop.create({
        data: {
            name,
            slug,
            description,
            image,
            pdfUrl,
            recommendedProducts: {
                connect: productIds.map((id: string) => ({ id }))
            },
            stages: {
                create: stages.map((s, index) => ({
                    name: s.name,
                    order: index,
                    recommendation: { products: s.products }
                }))
            }
        },
    });

    revalidatePath("/admin/crops");
    revalidatePath("/crop-farming");
}

export async function getCrops() {
    return await prisma.crop.findMany({
        include: {
            stages: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

export async function getCropBySlug(slug: string) {
    return await prisma.crop.findUnique({
        where: { slug },
        include: {
            stages: {
                orderBy: { order: "asc" }
            },
            recommendedProducts: true
        },
    });
}
export async function getCropById(id: string) {
    return await prisma.crop.findUnique({
        where: { id },
        include: {
            stages: { orderBy: { order: "asc" } },
            recommendedProducts: true
        },
    });
}

export async function updateCrop(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as string;
    const pdfUrl = formData.get("pdfUrl") as string;
    
    const productIdsStr = formData.get("productIds") as string;
    const productIds = productIdsStr ? (JSON.parse(productIdsStr) as string[]) : [];

    const stagesStr = formData.get("stages") as string;
    const stages = stagesStr ? (JSON.parse(stagesStr) as StageInput[]) : [];

    await prisma.crop.update({
        where: { id },
        data: {
            name,
            slug,
            description,
            image,
            pdfUrl,
            recommendedProducts: {
                set: productIds.map((id: string) => ({ id }))
            },
            stages: {
                deleteMany: {},
                create: stages.map((s, index) => ({
                    name: s.name,
                    order: index,
                    recommendation: { products: s.products }
                }))
            }
        },
    });

    revalidatePath("/admin/crops");
    revalidatePath("/crop-farming");
    revalidatePath(`/crops/${slug}`);
}

export async function deleteCrop(id: string) {
    await prisma.crop.delete({
        where: { id },
    });

    revalidatePath("/admin/crops");
    revalidatePath("/crop-farming");
}
