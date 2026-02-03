import prisma from "@/lib/prisma";
import { getTranslations, getLocale } from 'next-intl/server';
import Link from "next/link";

export const dynamic = 'force-dynamic';

interface SearchProduct {
    id: string;
    slug: string;
    name: string;
    name_ar?: string | null;
    shortDesc?: string | null;
    shortDesc_ar?: string | null;
    category?: { 
        name?: string | null;
        name_ar?: string | null;
    } | null;
}

interface SearchPost {
    id: string;
    slug: string;
    title: string;
    title_ar?: string | null;
    excerpt?: string | null;
    excerpt_ar?: string | null;
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const t = await getTranslations('Search');
    const locale = await getLocale();
    const isRtl = locale === 'ar';
    const dir = isRtl ? 'rtl' : 'ltr';

    if (!q) {
        return (
            <div className="section" dir={dir} style={{ textAlign: 'center', minHeight: '60vh' }}>
                <div className="container">
                    <h1 style={{ marginBottom: '2rem' }}>{t('title')}</h1>
                    <form action={`/search`} style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <input
                            name="q"
                            className="input"
                            autoFocus
                            placeholder={t('placeholder')}
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
                    { name_ar: { contains: q } },
                    { description: { contains: q } },
                    { description_ar: { contains: q } },
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
                    { title_ar: { contains: q } },
                    { content: { contains: q } },
                    { content_ar: { contains: q } },
                ],
                isPublished: true
            }
        })
    ]);

    const totalResults = products.length + posts.length;

    return (
        <div className="section" dir={dir}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('resultsFor')} <span style={{ color: 'var(--primary)' }}>&quot;{q}&quot;</span></h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>{t('foundResults', { count: totalResults })}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem' }}>
                    {/* Products Results */}
                    {products.length > 0 && (
                        <section>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                📦 {t('products')} <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.5 }}>({products.length})</span>
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                                {products.map((p: SearchProduct) => {
                                    const name = isRtl ? (p.name_ar || p.name) : p.name;
                                    const desc = isRtl ? (p.shortDesc_ar || p.shortDesc) : p.shortDesc;
                                    const catName = isRtl ? (p.category?.name_ar || p.category?.name) : p.category?.name;
                                    
                                    return (
                                        <Link key={p.id} href={`/product/${p.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ padding: '1.5rem' }}>
                                                <div style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                                    {catName || t('category')}
                                                </div>
                                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{name}</h3>
                                                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>{desc}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {/* Posts Results */}
                    {posts.length > 0 && (
                        <section style={{ borderTop: '1px solid var(--border)', paddingTop: '4rem' }}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                📝 {t('articles')} <span style={{ fontSize: '1rem', fontWeight: 'normal', opacity: 0.5 }}>({posts.length})</span>
                            </h2>
                            <div style={{ display: 'grid', gap: '1.5rem' }}>
                                {posts.map((post: SearchPost) => {
                                    const title = isRtl ? (post.title_ar || post.title) : post.title;
                                    const excerpt = isRtl ? (post.excerpt_ar || post.excerpt) : post.excerpt;
                                    
                                    return (
                                        <Link key={post.id} href={`/blog/${post.slug}`} className="card" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{title}</h3>
                                                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem' }}>{excerpt}</p>
                                            </div>
                                            <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                                                {t('readMore')} {isRtl ? '←' : '→'}
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </section>
                    )}

                    {products.length === 0 && posts.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem', backgroundColor: '#f9fafb', borderRadius: '2rem' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🔍</div>
                            <h3>{t('noResultsTitle', { q })}</h3>
                            <p style={{ color: 'var(--muted-foreground)', marginTop: '1rem' }}>{t('noResultsDesc')}</p>
                            <Link href={`/products`} className="btn btn-outline" style={{ marginTop: '2rem' }}>
                                {t('browseProducts')}
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
