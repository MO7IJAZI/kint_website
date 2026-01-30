import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
import Link from "next/link";

interface SearchProduct {
    id: string;
    slug: string;
    name: string;
    shortDesc?: string | null;
    category?: { name?: string | null } | null;
}

interface SearchPost {
    id: string;
    slug: string;
    title: string;
    excerpt?: string | null;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;

    if (!q) {
        return (
            <div className="section" style={{ textAlign: 'center', minHeight: '60vh' }}>
                <div className="container">
                    <h1 style={{ marginBottom: '2rem' }}>What are you looking for?</h1>
                    <form action="/search" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            name="q"
                            className="input"
                            autoFocus
                            placeholder="Search products, crops, or articles..."
                            style={{ width: '100%', padding: '1.5rem', fontSize: '1.25rem', borderRadius: '1rem' }}
                        />
                    </form>
                </div>
            </div>
        );
    }

    const [products, posts] = await Promise.all([
        prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: q } },
                    { description: { contains: q } },
                    { sku: { contains: q } },
                ],
                isActive: true
            },
            include: { category: true }
        }),
        prisma.blogPost.findMany({
            where: {
                OR: [
                    { title: { contains: q } },
                    { content: { contains: q } },
                ],
                isPublished: true
            }
        })
    ]);

    return (
        <div className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Search Results for: <span style={{ color: 'var(--primary)' }}>&quot;{q}&quot;</span></h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Found {products.length + posts.length} matching results.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
                    {/* Products Results */}
                    {products.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                📦 Products <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.5 }}>({products.length})</span>
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                {products.map((p: SearchProduct) => (
                                    <Link key={p.id} href={`/product/${p.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ padding: '1.5rem' }}>
                                            <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{p.category?.name || 'Category'}</div>
                                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{p.name}</h3>
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{p.shortDesc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Posts Results */}
                    {posts.length > 0 && (
                        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                📝 Articles <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.5 }}>({posts.length})</span>
                            </h2>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {posts.map((post: SearchPost) => (
                                    <Link key={post.id} href={`/blog/${post.slug}`} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>{post.excerpt}</p>
                                        </div>
                                        <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>Read More →</span>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {products.length === 0 && posts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: '#f9fafb', borderRadius: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔍</div>
                            <h3>No results found for &quot;{q}&quot;</h3>
                            <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem' }}>Try different keywords or check your spelling.</p>
                            <Link href="/products" className="btn btn-outline" style={{ marginTop: '2rem' }}>Browse All Products</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
