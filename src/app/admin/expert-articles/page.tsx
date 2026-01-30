import { getExpertArticles } from "@/actions/expertArticleActions";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = 'force-dynamic';

interface ExpertArticleRow {
    id: string;
    title: string;
    slug: string;
    category: string;
    order: number;
    isPublished: boolean;
}

export default async function AdminExpertArticles() {
    const articles = await getExpertArticles();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Expert Articles Management</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Manage expert forum articles and insights.</p>
                </div>
                <Link href="/admin/expert-articles/new" className="btn btn-primary">
                    New Expert Article
                </Link>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Title</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Category</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Order</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map((article: ExpertArticleRow) => (
                            <tr key={article.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{article.title}</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>{article.slug}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textTransform: 'capitalize' }}>{article.category}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>{article.order}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        backgroundColor: article.isPublished ? '#ecfdf5' : '#f3f4f6',
                                        color: article.isPublished ? '#059669' : '#6b7280'
                                    }}>
                                        {article.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <Link href={`/admin/expert-articles/${article.id}`} style={{ color: 'var(--primary)', fontWeight: '600', marginRight: '1rem' }}>Edit</Link>
                                    <DeleteButton id={article.id} type="expert-article" />
                                </td>
                            </tr>
                        ))}
                        {articles.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No expert articles found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
