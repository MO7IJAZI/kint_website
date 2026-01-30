import { getPages } from "@/actions/pageActions";
import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminPages() {
    const pages = await getPages();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Pages Management</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Manage static pages like Company Profile.</p>
                </div>
                <Link href="/admin/pages/new" className="btn btn-primary">
                    New Page
                </Link>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Title</th>
                            <th style={{ padding: '1rem 1.5rem' }}>URL Slug</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page) => (
                            <tr key={page.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{page.title}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <code style={{ fontSize: '0.8125rem', backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>
                                        /{page.slug}
                                    </code>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        backgroundColor: page.isActive ? '#ecfdf5' : '#f3f4f6',
                                        color: page.isActive ? '#059669' : '#6b7280'
                                    }}>
                                        {page.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <Link href={`/admin/pages/${page.id}`} style={{ color: 'var(--primary)', fontWeight: '600', marginRight: '1rem' }}>Edit</Link>
                                    <DeleteButton id={page.id} type="page" />
                                </td>
                            </tr>
                        ))}
                        {pages.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No pages found. Create your first page!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
