import prisma from "@/lib/prisma";
import Image from 'next/image';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

export const dynamic = 'force-dynamic';

interface ProductCategory {
    id: string;
    name: string;
    name_ar?: string | null;
    slug: string;
}

interface ProductItem {
    id: string;
    slug: string;
    name: string;
    name_ar?: string | null;
    image?: string | null;
    shortDesc?: string | null;
    shortDesc_ar?: string | null;
    description?: string | null;
    description_ar?: string | null;
    category?: ProductCategory | null;
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations('Product');
    const tNav = await getTranslations('Navigation');
    const isAr = locale === 'ar';

    const products = await prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: { order: 'asc' }
    });

    const categories = await prisma.category.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' }
    });

    return (
        <div className="section" style={{ direction: isAr ? 'rtl' : 'ltr' }}>
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{t('productOffer')}</h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem' }}>
                        {t('exploreText')}
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
                    {/* Sidebar Filters */}
                    <aside style={{ width: '250px', flexShrink: 0 }}>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>{t('categories')}</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link href="/products" style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                    {t('allProducts')}
                                </Link>
                            </li>
                            {categories.map((cat: any) => {
                                const catName = (isAr && cat.name_ar) ? cat.name_ar : cat.name;
                                return (
                                    <li key={cat.id}>
                                        <Link href={`/product-category/${cat.slug}`} style={{ color: 'var(--foreground)' }}>
                                            {catName}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </aside>

                    {/* Product Grid */}
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                            {products.map((product: any) => {
                                const pName = (isAr && product.name_ar) ? product.name_ar : product.name;
                                const pShortDesc = (isAr && product.shortDesc_ar) ? product.shortDesc_ar : product.shortDesc;
                                const pDesc = (isAr && product.description_ar) ? product.description_ar : product.description;
                                const catName = (isAr && product.category?.name_ar) ? product.category?.name_ar : product.category?.name;

                                return (
                                    <Link key={product.id} href={`/product/${product.slug}`} className="card">
                                        <div style={{ position: 'relative', height: '200px', backgroundColor: '#fff' }}>
                                            <Image src={product.image || '/images/cat-biostimulants.png'} alt={pName} fill style={{ objectFit: 'contain', padding: '1rem' }} />
                                        </div>
                                        <div style={{ padding: '1.5rem' }}>
                                            <span style={{
                                                backgroundColor: 'var(--primary)',
                                                color: 'white',
                                                fontSize: '0.7rem',
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '1rem',
                                                textTransform: 'uppercase',
                                                fontWeight: '700',
                                                display: 'inline-block',
                                                marginBottom: '0.75rem'
                                            }}>
                                                {catName || 'Category'}
                                            </span>
                                            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{pName}</h3>
                                            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                                {pShortDesc || (pDesc ? pDesc.replace(/<[^>]*>?/gm, '').substring(0, 80) + "..." : "")}
                                            </p>
                                            <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                                                {tNav('viewDetails')} {isAr ? '←' : '→'}
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                            {products.length === 0 && (
                                <div style={{ gridColumn: 'span 3', padding: '5rem 0', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    {t('noProducts')}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
