import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    slug: string;
    image?: string | null;
    shortDesc?: string | null;
    description?: string | null;
    benefits?: string | null;
    usage?: string | null;
    usageTable?: UsageRow[] | null;
    compTable?: CompositionRow[] | null;
    isOrganic?: boolean | null;
    category?: { slug: string; name: string } | null;
    downloads?: DownloadItem[] | null;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

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

    return (
        <div style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}>
            {/* Header / Breadcrumbs - Intermag Style */}
            <section style={{ padding: '3rem 0 2rem', borderBottom: '1px solid #f1f5f9', backgroundColor: '#fcfdfe' }}>
                <div className="container-technical">
                    <nav style={{ marginBottom: '1.5rem', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        <Link href="/" style={{ color: '#94a3b8' }}>HOME</Link> /
                        <Link href="/products" style={{ color: '#94a3b8' }}> PRODUCT OFFER</Link> /
                        <Link href={`/product-category/${product.category?.slug}`} style={{ color: '#94a3b8' }}> {product.category?.name?.toUpperCase()}</Link> /
                        <span style={{ color: 'var(--primary)' }}> {product.name.toUpperCase()}</span>
                    </nav>
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 8vw, 3rem)', 
                        fontWeight: 900, 
                        textTransform: 'uppercase', 
                        letterSpacing: '-0.03em', 
                        color: 'var(--foreground)',
                        wordBreak: 'break-word'
                    }}>
                        {product.name}
                    </h1>
                </div>
            </section>

            <section className="section" style={{ paddingTop: '4rem' }}>
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
                                    borderLeft: '5px solid var(--primary)',
                                    paddingLeft: '2rem'
                                }}>
                                    {product.shortDesc}
                                </div>

                                {/* Composition Table */}
                                {product.compTable && Array.isArray(product.compTable) && product.compTable.length > 0 && (
                                    <div style={{ marginBottom: '4rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                            Composition
                                        </h3>
                                        <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>NUTRIENT / INGREDIENT</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>VALUE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product.compTable.map((row, i) => (
                                                        <tr key={i} style={{ borderBottom: i === (product.compTable?.length ?? 0) - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                            <td style={{ padding: '1rem', fontWeight: 600, color: '#334155' }}>{row.name}</td>
                                                            <td style={{ padding: '1rem', color: '#64748b' }}>{row.value}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}

                                {/* Benefits Section */}
                                {product.benefits && (
                                    <div style={{ marginBottom: '4rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                            Benefits
                                        </h3>
                                        <div
                                            className="technical-content"
                                            style={{ fontSize: '1.1rem', color: '#334155' }}
                                            dangerouslySetInnerHTML={{ __html: product.benefits }}
                                        />
                                    </div>
                                )}

                                {/* Mechanism of Action / Features */}
                                {product.description && (
                                    <div style={{ marginBottom: '4rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                            How it works
                                        </h3>
                                        <div
                                            className="technical-content"
                                            style={{ fontSize: '1.1rem', color: '#334155' }}
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                    </div>
                                )}

                                {/* Application / Usage */}
                                {product.usage && (
                                    <div style={{ marginBottom: '4rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                            Application
                                        </h3>
                                        <div
                                            className="technical-content"
                                            style={{ fontSize: '1.1rem', color: '#334155' }}
                                            dangerouslySetInnerHTML={{ __html: product.usage }}
                                        />
                                    </div>
                                )}

                                {/* Usage Table (Dosage) */}
                                {product.usageTable && Array.isArray(product.usageTable) && product.usageTable.length > 0 && (
                                    <div style={{ marginBottom: '4rem' }}>
                                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                                            Dosage Recommendations
                                        </h3>
                                        <div style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}>
                                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                                                <thead>
                                                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>CROP</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>APPLICATION STAGE</th>
                                                        <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#475569' }}>DOSAGE</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {product.usageTable.map((row, i) => (
                                                        <tr key={i} style={{ borderBottom: i === (product.usageTable?.length ?? 0) - 1 ? 'none' : '1px solid #f1f5f9' }}>
                                                            <td style={{ padding: '1rem', fontWeight: 700, color: '#334155' }}>{row.crop}</td>
                                                            <td style={{ padding: '1rem', color: '#64748b' }}>{row.stage}</td>
                                                            <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>{row.dosage}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar / Info Card */}
                        <aside>
                            <div style={{ position: 'sticky', top: '120px' }}>
                                <div className="card" style={{ overflow: 'hidden', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                    <div style={{ position: 'relative', height: '320px', backgroundColor: '#fff', padding: '2rem' }}>
                                        <Image
                                            src={product.image || '/images/cat-biostimulants.png'}
                                            alt={product.name}
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
                                                🌱 CERTIFIED ORGANIC
                                            </div>
                                        )}

                                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1.25rem' }}>TECHNICAL DOCUMENTS</h4>
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
                                                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>No technical documents available yet.</p>
                                            )}
                                        </div>

                                        <div style={{ marginTop: '2.5rem' }}>
                                            <Link href="/contact" className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '0.9rem' }}>
                                                ORDER INQUIRY
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="card" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                                    <h4 style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '0.5rem' }}>NEED SUPPORT?</h4>
                                    <p style={{ fontSize: '0.85rem', fontWeight: 700 }}>+48 796 106 899</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>kint@kafri-intl.com</p>
                                </div>
                            </div>
                        </aside>

                    </div>
                </div>
            </section>
        </div>
    );
}
