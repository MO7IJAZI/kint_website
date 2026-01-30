import prisma from "@/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
    const posts = await prisma.blogPost.findMany({
        where: { isPublished: true },
        orderBy: { publishedAt: 'desc' }
    });

    return (
        <div className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Knowledge Centre</h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto' }}>
                        Latest insights, agricultural research, and company news from KINT.
                    </p>
                </div>

                <div style={{ display: 'grid', gap: '3rem' }}>
                    {posts.map((post) => (
                        <div key={post.id} className="card" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.2fr) 2fr', gap: '0', overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: '100%', minHeight: '350px' }}>
                                <Image src={post.image || '/images/hero.png'} alt={post.title} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <div style={{ padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem', fontSize: '0.875rem' }}>
                                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""} | By {post.author}
                                </div>
                                <h2 style={{ fontSize: '2.25rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>{post.title}</h2>
                                <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
                                    {post.excerpt}
                                </p>
                                <Link href={`/blog/${post.slug}`} className="btn btn-primary" style={{ alignSelf: 'flex-start', padding: '0.8rem 2rem' }}>
                                    Read Full Article
                                </Link>
                            </div>
                        </div>
                    ))}
                    {posts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--muted-foreground)' }}>
                            No articles found in our knowledge centre yet. Stay tuned!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
