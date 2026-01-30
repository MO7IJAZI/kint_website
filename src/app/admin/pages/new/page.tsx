import PageForm from "@/components/admin/PageForm";

export default function NewPage() {
    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Create New Page</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Add a new static page with rich text content.</p>
            </div>

            <PageForm />
        </div>
    );
}
