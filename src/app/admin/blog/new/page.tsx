import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Write New Article</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Share agricultural expertise and company news.</p>
            </div>

            <BlogForm />
        </div>
    );
}
