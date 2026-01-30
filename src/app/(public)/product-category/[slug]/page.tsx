import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const category = await prisma.category.findUnique({
        where: { slug },
        include: {
            products: {
                where: { isActive: true },
                orderBy: { order: "asc" }
            },
            children: true
        }
    });

    if (!category) {
        notFound();
    }

    return (
        <div className="section">
            <div className="container">
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '1rem' }}>
                        <Link href="/products">Products</Link> / {category.name}
                    </div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{category.name}</h1>
                    {category.description && (
                        <p style={{ color: 'var(--muted-foreground)', fontSize: '1.25rem', maxWidth: '800px' }}>
                            {category.description}
                        </p>
                    )}
                </div>

                {category.children.length > 0 && (
                    <div style={{ marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem' }}>Subcategories</h2>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                            {category.children.map(child => (
                                <Link
                                    key={child.id}
                                    href={`/product-category/${child.slug}`}
                                    className="btn btn-outline"
                                    style={{ borderRadius: '2rem' }}
                                >
                                    {child.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                    {category.products.map((product) => (
                        <Link key={product.id} href={`/product/${product.slug}`} className="card">
                            <div style={{ position: 'relative', height: '220px' }}>
                                <Image
                                    src={product.image || '/images/cat-biostimulants.png'}
                                    alt={product.name}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ marginBottom: '0.5rem' }}>{product.name}</h3>
                                <p style={{ color: 'var(--muted-foreground)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                                    {product.shortDesc || product.description?.substring(0, 100) + '...'}
                                </p>
                                <div style={{ color: 'var(--primary)', fontWeight: '700' }}>
                                    View Product →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {category.products.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--muted-foreground)' }}>
                        No products found in this category.
                    </div>
                )}
            </div>
        </div>
    );
}
