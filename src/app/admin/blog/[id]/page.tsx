import { getBlogPostById } from "@/actions/blogActions";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await getBlogPostById(id);

    if (!post) {
        notFound();
    }

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Edit Article</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Update your content and publishing status.</p>
            </div>

            <BlogForm initialData={post} />
        </div>
    );
}
