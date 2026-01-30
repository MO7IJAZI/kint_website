import { getBlogPosts } from "@/actions/blogActions";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = 'force-dynamic';

export default async function AdminBlog() {
    const posts = await getBlogPosts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Blog Management</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Write and manage agricultural insights.</p>
                </div>
                <Link href="/admin/blog/new" className="btn btn-primary">
                    New Article
                </Link>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Title</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Author</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{post.title}</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>{post.slug}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>{post.author}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        backgroundColor: post.isPublished ? '#ecfdf5' : '#f3f4f6',
                                        color: post.isPublished ? '#059669' : '#6b7280'
                                    }}>
                                        {post.isPublished ? "Published" : "Draft"}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <Link href={`/admin/blog/${post.id}`} style={{ color: 'var(--primary)', fontWeight: '600', marginRight: '1rem' }}>Edit</Link>
                                    <DeleteButton id={post.id} type="blog" />
                                </td>
                            </tr>
                        ))}
                        {posts.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No blog articles found. Start writing!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
