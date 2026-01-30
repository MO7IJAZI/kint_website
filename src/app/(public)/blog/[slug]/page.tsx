import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.blogPost.findUnique({
        where: { slug }
    });

    if (!post) {
        notFound();
    }

    return (
        <article className="section">
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>
                        <Link href="/blog">Blog</Link>
                    </div>
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 8vw, 3.5rem)', 
                        marginBottom: '1.5rem', 
                        lineHeight: '1.1',
                        wordBreak: 'break-word'
                    }}>{post.title}</h1>
                    <div style={{ color: 'var(--muted-foreground)', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                        <span>By <strong>{post.author}</strong></span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Draft'}</span>
                    </div>
                </div>

                <div style={{ position: 'relative', height: '500px', borderRadius: '1.5rem', overflow: 'hidden', marginBottom: '4rem' }}>
                    <Image
                        src={post.image || '/images/hero.png'}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div style={{
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    color: 'var(--foreground)',
                }} className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />

                {post.tags && (() => {
                    try {
                        const tags = JSON.parse(post.tags);
                        if (Array.isArray(tags) && tags.length > 0) {
                            return (
                                <div style={{ marginTop: '3rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {tags.map((tag: string, index: number) => (
                                        <span key={index} style={{ 
                                            backgroundColor: '#f3f4f6', 
                                            padding: '0.5rem 1rem', 
                                            borderRadius: '2rem', 
                                            fontSize: '0.9rem',
                                            color: 'var(--muted-foreground)'
                                        }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            );
                        }
                    } catch {
                        return null;
                    }
                })()}

                <div style={{ marginTop: '5rem', padding: '3rem', backgroundColor: '#f9fafb', borderRadius: '1.5rem', textAlign: 'center' }}>
                    <h3 style={{ marginBottom: '1rem' }}>Want to learn more about our solutions?</h3>
                    <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem' }}>
                        Our experts are always available to discuss the latest agricultural research and how it applies to your crops.
                    </p>
                    <Link href="/contact" className="btn btn-primary">Contact an Expert</Link>
                </div>
            </div>
        </article>
    );
}
