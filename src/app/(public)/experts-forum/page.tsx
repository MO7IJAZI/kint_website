import { getExpertArticlesByCategory } from "@/actions/expertArticleActions";
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Wheat, Apple, Carrot } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface Article {
    title: string;
    excerpt?: string | null;
    image?: string | null;
    slug: string;
}

function ArticleCard({ article }: { article: Article }) {
    return (
        <div className="article-card">
            <div className="article-card-image">
                {article.image ? (
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        No Image
                    </div>
                )}
            </div>
            <div className="article-card-content">
                <h3 className="article-card-title">
                    {article.title}
                </h3>
                <p className="article-card-excerpt">
                    {article.excerpt}
                </p>
                <Link
                    href={`/experts-forum/${article.slug}`}
                    className="article-card-link"
                >
                    Read more
                    <ChevronRight size={16} />
                </Link>
            </div>
        </div>
    );
}

function CategorySection({ 
    title, 
    icon, 
    articles, 
    color 
}: { 
    title: string; 
    icon: React.ReactNode; 
    articles: Article[]; 
    color: string;
}) {
    if (articles.length === 0) return null;

    return (
        <section style={{ marginBottom: '4rem' }}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '2rem'
            }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    background: color,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                    {icon}
                </div>
                <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    color: '#1e293b'
                }}>
                    {title}
                </h2>
            </div>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem'
            }}>
                {articles.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                ))}
            </div>
        </section>
    );
}

export default async function ExpertsForumPage() {
    const { arable, fruit, vegetable } = await getExpertArticlesByCategory();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
            
            {/* Breadcrumb */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/crop-farming" style={{ textDecoration: 'none', color: 'inherit' }}>Crop Farming</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: '#e9496c', fontWeight: 600 }}>Experts&apos; Forum</span>
                    </nav>
                </div>
            </div>

            {/* Hero Header */}
            <div style={{
                background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 50%, #b91c1c 100%)',
                padding: '4rem 0',
                color: 'white'
            }}>
                <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>
                        Experts&apos; <span style={{ color: '#6ee7b7' }}>Forum</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#a7f3d0', maxWidth: '600px', lineHeight: 1.6 }}>
                        Insights and expert knowledge on crop cultivation, fertilization techniques, and agricultural best practices.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
                
                <CategorySection
                    title="Arable crops"
                    icon={<Wheat size={24} />}
                    articles={arable}
                    color="#d97706"
                />

                <CategorySection
                    title="Fruit crops"
                    icon={<Apple size={24} />}
                    articles={fruit}
                    color="#dc2626"
                />

                <CategorySection
                    title="Vegetable crops"
                    icon={<Carrot size={24} />}
                    articles={vegetable}
                    color="#16a34a"
                />
                
                {arable.length === 0 && fruit.length === 0 && vegetable.length === 0 && (
                     <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                        <p>No expert articles available at the moment. Please check back later.</p>
                     </div>
                )}

            </div>
        </div>
    );
}
