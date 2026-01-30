"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBlogPost(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const image = formData.get("image") as string;
    const tagsRaw = formData.get("tags") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;
    const isPublished = formData.get("isPublished") === "true";

    // Process tags from comma-separated string to JSON array
    const tags = tagsRaw 
        ? JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(Boolean))
        : "[]";

    await prisma.blogPost.create({
        data: {
            title,
            slug,
            excerpt,
            content,
            author,
            image,
            tags,
            metaTitle,
            metaDesc,
            isPublished,
            publishedAt: isPublished ? new Date() : null,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
}

export async function updateBlogPost(id: string, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const image = formData.get("image") as string;
    const tagsRaw = formData.get("tags") as string;
    const metaTitle = formData.get("metaTitle") as string;
    const metaDesc = formData.get("metaDesc") as string;
    const isPublished = formData.get("isPublished") === "true";

    // Process tags
    const tags = tagsRaw 
        ? JSON.stringify(tagsRaw.split(',').map(t => t.trim()).filter(Boolean))
        : "[]";

    const post = await prisma.blogPost.findUnique({ where: { id } });

    await prisma.blogPost.update({
        where: { id },
        data: {
            title,
            slug,
            excerpt,
            content,
            author,
            image,
            tags,
            metaTitle,
            metaDesc,
            isPublished,
            publishedAt: isPublished && !post?.publishedAt ? new Date() : post?.publishedAt,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
}

export async function deleteBlogPost(id: string) {
    await prisma.blogPost.delete({
        where: { id },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
}

export async function getBlogPosts() {
    return await prisma.blogPost.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export async function getBlogPostBySlug(slug: string) {
    return await prisma.blogPost.findUnique({
        where: { slug },
    });
}
export async function getBlogPostById(id: string) {
    return await prisma.blogPost.findUnique({
        where: { id },
    });
}
