import prisma from "@/lib/prisma";
import Tabs from "@/components/ui/Tabs";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from 'next-intl/server';

export const revalidate = 300;

interface CompositionRow {
    name: string;
    value: string;
}

interface UsageRow {
    crop: string;
    stage: string;
    dosage: string;
}

interface DownloadItem {
    id: string;
    fileUrl: string;
    title: string;
}

interface ProductDetailData {
    id: string;
    name: string;
    name_ar?: string | null;
    slug: string;
    image?: string | null;
    shortDesc?: string | null;
    shortDesc_ar?: string | null;
    description?: string | null;
    description_ar?: string | null;
    benefits?: string | null;
    benefits_ar?: string | null;
    usage?: string | null;
    usage_ar?: string | null;
    usageTable?: UsageRow[] | null;
    usageTable_ar?: UsageRow[] | null;
    compTable?: CompositionRow[] | null;
    compTable_ar?: CompositionRow[] | null;
    isOrganic?: boolean | null;
    categoryId?: string | null;
    category?: { slug: string; name: string; name_ar?: string | null } | null;
    downloads?: DownloadItem[] | null;
    tabs?: { id: string; title: string; content: string }[] | null;
    tabs_ar?: { id: string; title: string; content: string }[] | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
    const { slug, locale } = await params;
    const t = await getTranslations('Product');
    const tNav = await getTranslations('Navigation');
    const isAr = locale === 'ar';

    const product = await prisma.product.findUnique({
        where: { slug },
        include: {
            category: true,
            images: true,
            downloads: true
        }
    }) as ProductDetailData | null;

    if (!product) {
        notFound();
    }

    // Localized Data
    const name = (isAr && product.name_ar) ? product.name_ar : product.name;
    const description = (isAr && product.description_ar) ? product.description_ar : product.description;
    const shortDesc = (isAr && product.shortDesc_ar) ? product.shortDesc_ar : product.shortDesc;
    const benefits = (isAr && product.benefits_ar) ? product.benefits_ar : product.benefits;
    const usage = (isAr && product.usage_ar) ? product.usage_ar : product.usage;
    const compTable = (isAr && product.compTable_ar) ? product.compTable_ar : product.compTable;
    const usageTable = (isAr && product.usageTable_ar) ? product.usageTable_ar : product.usageTable;
    const productTabs = (isAr && product.tabs_ar) ? product.tabs_ar : product.tabs;
    const categoryName = (isAr && product.category?.name_ar) ? product.category?.name_ar : product.category?.name;

    // Fetch related products (same category, excluding current)
    const relatedProductsRaw = product.categoryId ? await prisma.product.findMany({
        where: {
            categoryId: product.categoryId,
            id: { not: product.id },
            isActive: true
        },
        take: 3,
        include: { category: true }
    }) : [];

    // Process related products for localization
    const relatedProducts = relatedProductsRaw.map((p: any) => {
        const pData = p as unknown as ProductDetailData;
        return {
            ...p,
            name: (isAr && pData.name_ar) ? pData.name_ar : p.name,
            shortDesc: (isAr && pData.shortDesc_ar) ? pData.shortDesc_ar : p.shortDesc,
            description: (isAr && pData.description_ar) ? pData.description_ar : p.description,
            categoryName: (isAr && pData.category?.name_ar) ? pData.category?.name_ar : p.category?.name
        };
    });

    const tabs = [];

    // 1. Description / How it works
    if (description) {
        tabs.push({
            label: t('Description').toUpperCase(),
            content: (
                <div
                    className="technical-content"
                    style={{ fontSize: '1.1rem', color: '#334155' }}
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )
        });
    }

    // 2. Benefits
    if (benefits) {
        tabs.push({
            label: t('benefits').toUpperCase(),
            content: (
                <div
                    className="technical-content"
                    style={{ fontSize: '1.1rem', color: '#334155' }}
                    dangerouslySetInnerHTML={{ __html: benefits }}
                />
            )
        });
    }

    // 3. Composition
    if (compTable && Array.isArray(compTable) && compTable.length > 0) {
        tabs.push({
            label: t('composition').toUpperCase(),
            content: (
                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem', textAlign: isAr ? 'right' : 'left', fontWeight: 700, color: '#475569' }}>{t('nutrient').toUpperCase()}</th>
                                <th style={{ padding: '1rem', textAlign: isAr ? 'right' : 'left', fontWeight: 700, color: '#475569' }}>{t('value').toUpperCase()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compTable.map((row, i) => (
                                <tr key={i} style={{ borderBottom: i === (compTable?.length ?? 0) - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>{row.name}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{row.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        });
    }

    // 4. Application
    if (usage) {
        tabs.push({
            label: t('application').toUpperCase(),
            content: (
                <div
                    className="technical-content"
                    style={{ fontSize: '1.1rem', color: '#334155' }}
                    dangerouslySetInnerHTML={{ __html: usage }}
                />
            )
        });
    }

    // 5. Dosage
    if (usageTable && Array.isArray(usageTable) && usageTable.length > 0) {
        tabs.push({
            label: t('dosage').toUpperCase(),
            content: (
                <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '1rem', textAlign: isAr ? 'right' : 'left', fontWeight: 700, color: '#475569' }}>{t('crop').toUpperCase()}</th>
                                <th style={{ padding: '1rem', textAlign: isAr ? 'right' : 'left', fontWeight: 700, color: '#475569' }}>{t('stage').toUpperCase()}</th>
                                <th style={{ padding: '1rem', textAlign: isAr ? 'right' : 'left', fontWeight: 700, color: '#475569' }}>{t('dosage').toUpperCase()}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usageTable.map((row, i) => (
                                <tr key={i} style={{ borderBottom: i === (usageTable?.length ?? 0) - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                    <td style={{ padding: '1rem', fontWeight: 700, color: '#334155' }}>{row.crop}</td>
                                    <td style={{ padding: '1rem', color: '#64748b' }}>{row.stage}</td>
                                    <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>{row.dosage}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        });
    }

    // 6. Dynamic Tabs
    if (productTabs && Array.isArray(productTabs)) {
        productTabs.forEach(tab => {
            tabs.push({
                label: tab.title.toUpperCase(),
                content: (
                    <div
                        className="technical-content"
                        style={{ fontSize: '1.1rem', color: '#334155' }}
                        dangerouslySetInnerHTML={{ __html: tab.content }}
                    />
                )
            });
        });
    }

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', direction: isAr ? 'rtl' : 'ltr' }}>
            {/* Header / Breadcrumbs - Intermag Style */}
            <section style={{ padding: '3rem 0 2rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fcfdfe' }}>
                <div className="container-technical">
                    <nav style={{ marginBottom: '1.5rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Link href={`/`} style={{ color: '#94a3b8' }}>{tNav('home')}</Link> /
                        <Link href={`/products`} style={{ color: '#94a3b8' }}> {tNav('products')}</Link> /
                        <Link href={`/product-category/${product.category?.slug}`} style={{ color: '#94a3b8' }}> {categoryName?.toUpperCase()}</Link> /
                        <span style={{ color: 'var(--primary)' }}> {name?.toUpperCase()}</span>
                    </nav>
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 8vw, 3rem)', 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        letterSpacing: '-0.03em', 
                        color: 'var(--foreground)',
                        wordBreak: 'break-word'
                    }}>
                        {name}
                    </h1>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
                <div className="container-technical">
                    <div className="crop-detail-grid">

                        {/* Main Content Area */}
                        <div>
                            {/* Mission / Purpose Statement */}
                            <div style={{ marginBottom: '4rem' }}>
                                <div style={{
                                    fontSize: '1.4rem',
                                    lineHeight: '1.7',
                                    color: '#475569',
                                    fontWeight: 500,
                                    marginBottom: '3rem',
                                    borderLeft: isAr ? 'none' : '5px solid var(--primary)',
                                    borderRight: isAr ? '5px solid var(--primary)' : 'none',
                                    paddingLeft: isAr ? 0 : '2rem',
                                    paddingRight: isAr ? '2rem' : 0
                                }}>
                                    {shortDesc}
                                </div>

                                {tabs.length > 0 && <Tabs tabs={tabs} />}
                            </div>
                        </div>

                        {/* Sidebar / Info Card */}
                        <aside>
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <div className="card" style={{ overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                    <div style={{ position: 'relative', height: '320px', backgroundColor: '#fff', padding: '2rem' }}>
                                        <Image
                                            src={product.image || '/images/cat-biostimulants.png'}
                                            alt={name || product.name}
                                            fill
                                            style={{ objectFit: 'contain', padding: '1rem' }}
                                        />
                                    </div>
                                    <div style={{ padding: '2.5rem', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
                                        {product.isOrganic && (
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.75rem',
                                                color: '#e9496c',
                                                fontWeight: 700,
                                                fontSize: '0.85rem',
                                                marginBottom: '1.5rem',
                                                backgroundColor: '#fce4e9',
                                                padding: '0.5rem 1rem',
                                                borderRadius: '0.5rem',
                                                width: 'fit-content'
                                            }}>
                                                {t('certifiedOrganic').toUpperCase()}
                                            </div>
                                        )}

                                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>{t('technicalDocuments')}</h4>
                                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                                            {(product.downloads?.length ?? 0) > 0 ? product.downloads?.map((dl) => (
                                                <a
                                                    key={dl.id}
                                                    href={dl.fileUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.75rem',
                                                        padding: '0.85rem 1.25rem',
                                                        backgroundColor: 'white',
                                                        border: '1px solid #e2e8f0',
                                                        borderRadius: '0.75rem',
                                                        fontSize: '0.8rem',
                                                        fontWeight: 700,
                                                        color: '#475569',
                                                        transition: '0.2s'
                                                    }}
                                                    className="download-link"
                                                >
                                                    <span style={{ fontSize: '1.1rem' }}>📄</span>
                                                    {dl.title.toUpperCase()}
                                                </a>
                                            )) : (
                                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{t('noDocuments')}</p>
                                            )}
                                        </div>

                                        <div style={{ marginTop: '2.5rem' }}>
                                            <Link href={`/contact`} className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '0.9rem' }}>
                                                {t('orderInquiry')}
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>{t('needSupport')}</h4>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>+48 796 106 899</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>kint@kafri-intl.com</p>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="section" style={{ backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '5rem 0' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
                            <div>
                                <h4 style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{t('discoverMore').toUpperCase()}</h4>
                                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b' }}>{t('relatedProducts').toUpperCase()}</h2>
                            </div>
                            <Link href={`/product-category/${product.category?.slug}`} style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {t('viewAll').toUpperCase()} {categoryName?.toUpperCase()} {isAr ? '←' : '→'}
                            </Link>
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {relatedProducts.map((related: any) => (
                                <Link key={related.id} href={`/product/${related.slug}`} className="card" style={{ border: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', transition: 'transform 0.3s ease', backgroundColor: 'white' }}>
                                    <div style={{ position: 'relative', height: '240px', backgroundColor: '#fff', padding: '2rem', borderBottom: '1px solid #f1f5f9' }}>
                                        <Image 
                                            src={related.image || '/images/cat-biostimulants.png'} 
                                            alt={related.name} 
                                            fill 
                                            style={{ objectFit: 'contain', padding: '1rem' }} 
                                        />
                                    </div>
                                    <div style={{ padding: '2rem' }}>
                                        <span style={{
                                            backgroundColor: '#f1f5f9',
                                            color: '#64748b',
                                            fontSize: '0.7rem',
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '2rem',
                                            textTransform: 'uppercase',
                                            fontWeight: '700',
                                            display: 'inline-block',
                                            marginBottom: '1rem',
                                            letterSpacing: '0.05em'
                                        }}>
                                            {related.categoryName || 'Product'}
                                        </span>
                                        <h3 style={{ marginBottom: '0.75rem', fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>{related.name}</h3>
                                        <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                            {related.shortDesc || (related.description ? related.description.replace(/<[^>]*>?/gm, '').substring(0, 100) + "..." : "Learn more about this product.")}
                                        </p>
                                        <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                                            {t('viewDetails').toUpperCase()} {isAr ? '←' : '→'}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
