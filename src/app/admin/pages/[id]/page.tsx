import { getPageById } from "@/actions/pageActions";
import PageForm from "@/components/admin/PageForm";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const page = await getPageById(id);

    if (!page) {
        return (
            <div>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Page Not Found</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>The requested page could not be found.</p>
            </div>
        );
    }

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Edit Page</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Update page content using the rich text editor.</p>
            </div>

            <PageForm initialData={page} />
        </div>
    );
}
