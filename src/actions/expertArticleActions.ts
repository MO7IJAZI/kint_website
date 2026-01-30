"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { syncArticleToSeeder, removeArticleFromSeeder, formatRichText } from "@/lib/seed-utils";

function sanitizeSlug(text: string) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-');     // Replace multiple - with single -
}

export async function createExpertArticle(formData: FormData) {
    const title = formData.get("title") as string;
    const rawSlug = formData.get("slug") as string;
    const slug = sanitizeSlug(rawSlug || title); // Fallback to title if slug is empty
    const excerpt = formData.get("excerpt") as string;
    const rawContent = formData.get("content") as string;
    const content = formatRichText(rawContent);
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;
    const isPublished = formData.get("isPublished") === "true";
    const order = parseInt(formData.get("order") as string || "0");

    const article = await prisma.expertArticle.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            image,
            category,
            order,
            metaTitle,
            metaDesc,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
        },
    });

    // Sync to seeder
    await syncArticleToSeeder({
        title,
        slug,
        excerpt,
        content,
        image,
        category,
        order,
        isPublished,
        metaTitle,
        metaDesc,
        publishedAt: article.publishedAt,
    });

    revalidatePath("/admin/expert-articles");
    revalidatePath("/experts-forum");
}

export async function updateExpertArticle(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const rawSlug = formData.get("slug") as string;
    const slug = sanitizeSlug(rawSlug || title);
    const excerpt = formData.get("excerpt") as string;
    const rawContent = formData.get("content") as string;
    const content = formatRichText(rawContent);
    const image = formData.get("image") as string;
    const category = formData.get("category") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;
    const isPublished = formData.get("isPublished") === "true";
    const order = parseInt(formData.get("order") as string || "0");

    const article = await prisma.expertArticle.findUnique({ where: { id } });

    const updatedArticle = await prisma.expertArticle.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            image,
            category,
            order,
            metaTitle,
            metaDesc,
            isPublished,
            publishedAt: isPublished && !article?.publishedAt ? new Date() : article?.publishedAt,
        },
    });

    // Sync to seeder
    await syncArticleToSeeder({
        title,
        slug,
        excerpt,
        content,
        image,
        category,
        order,
        isPublished,
        metaTitle,
        metaDesc,
        publishedAt: updatedArticle.publishedAt,
    });

    revalidatePath("/admin/expert-articles");
    revalidatePath("/experts-forum");
    revalidatePath(`/experts-forum/${slug}`);
}

export async function deleteExpertArticle(id: string) {
    const article = await prisma.expertArticle.findUnique({ where: { id } });
    if (article) {
        await removeArticleFromSeeder(article.slug);
    }
    
    await prisma.expertArticle.delete({
        where: { id },
    });

    revalidatePath("/admin/expert-articles");
    revalidatePath("/experts-forum");
}

export async function getExpertArticles() {
    return await prisma.expertArticle.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getExpertArticleBySlug(slug: string) {
    return await prisma.expertArticle.findUnique({
        where: { slug },
    });
}

export async function getExpertArticleById(id: string) {
    return await prisma.expertArticle.findUnique({
        where: { id },
    });
}

export async function getExpertArticlesByCategory() {
    const articles = await prisma.expertArticle.findMany({
        where: { isPublished: true },
        orderBy: { order: 'asc' },
    });
    
    // Group by category
    const grouped = {
        arable: articles.filter((article) => article.category === 'arable'),
        fruit: articles.filter((article) => article.category === 'fruit'),
        vegetable: articles.filter((article) => article.category === 'vegetable'),
    };
    
    return grouped;
}
