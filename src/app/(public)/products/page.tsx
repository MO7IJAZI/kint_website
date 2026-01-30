import prisma from "@/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

interface ProductCategory {
    id: string;
    name: string;
    slug: string;
}

interface ProductItem {
    id: string;
    slug: string;
    name: string;
    image?: string | null;
    shortDesc?: string | null;
    description?: string | null;
    category?: ProductCategory | null;
}

export default async function ProductsPage() {
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
        <div className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Product Offer</h1>
                    <p style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem' }}>
                        Explore our scientific approach to plant nutrition and biostimulation.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '3rem' }}>
                    {/* Sidebar Filters */}
                    <aside>
                        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Categories</h3>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <li>
                                <Link href="/products" style={{ fontWeight: '600', color: 'var(--primary)' }}>
                                    All Products
                                </Link>
                            </li>
                            {categories.map((cat: ProductCategory) => (
                                <li key={cat.id}>
                                    <Link href={`/product-category/${cat.slug}`} style={{ color: 'var(--foreground)' }}>
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </aside>

                    {/* Product Grid */}
                    <div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
                            {products.map((product: ProductItem) => (
                                <Link key={product.id} href={`/product/${product.slug}`} className="card">
                                    <div style={{ position: 'relative', height: '200px' }}>
                                        <Image src={product.image || '/images/cat-biostimulants.png'} alt={product.name} fill style={{ objectFit: 'cover' }} />
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
                                            {product.category?.name || 'Category'}
                                        </span>
                                        <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>{product.name}</h3>
                                        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                                            {product.shortDesc || (product.description ? product.description.substring(0, 80) + "..." : "")}
                                        </p>
                                        <div style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem' }}>
                                            View Details →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {products.length === 0 && (
                                <div style={{ gridColumn: 'span 3', padding: '5rem 0', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No products found.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
