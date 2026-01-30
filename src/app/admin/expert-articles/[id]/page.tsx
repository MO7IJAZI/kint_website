import { getExpertArticleById } from "@/actions/expertArticleActions";
import ExpertArticleForm from "@/components/admin/ExpertArticleForm";
import { notFound } from "next/navigation";

export default async function EditExpertArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = await getExpertArticleById(id);

    if (!article) {
        notFound();
    }

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Edit Expert Article</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Update content, category, and publishing status.</p>
            </div>

            <ExpertArticleForm initialData={article} />
        </div>
    );
}
