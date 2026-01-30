import prisma from "@/lib/prisma";
import Image from 'next/image';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const categories = await prisma.category.findMany({
    where: { parentId: null, isActive: true },
    take: 3
  });

  const news = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    take: 3
  });

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        height: '85vh',
        minHeight: '700px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}>
        <Image
          src="/images/hero.png"
          alt="Modern Agriculture"
          fill
          priority
          style={{ objectFit: 'cover', zIndex: -1 }}
        />
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, right: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)',
          zIndex: 0
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
          <div className="animate-fade-in" style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: 800 }}>
              Innovative Solutions for <span style={{ color: 'var(--primary-light)' }}>Professional Agriculture</span>
            </h1>
            <p style={{ fontSize: '1.4rem', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.6' }}>
              Kafri International (KINT) is a global leader in biostimulants and specialty fertilizers,
              committed to sustainable growth and superior yields since 1988.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/products" className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
                Explore Product Categories
              </Link>
              <Link href="/about" className="btn btn-outline" style={{
                padding: '1.2rem 2.5rem', fontSize: '1.1rem', borderColor: 'white', color: 'white'
              }}>
                Our Manufacturing Excellence
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Core Solutions</h2>
            <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--primary)', margin: '0 auto 2rem' }}></div>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
              Proven biotechnology for every stage of plant development.
            </p>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem'
          }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/product-category/${cat.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '280px' }}>
                  <Image
                    src={cat.image || '/images/cat-biostimulants.png'}
                    alt={cat.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{cat.name}</h3>
                  <p style={{ color: 'var(--muted-foreground)', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.6' }}>
                    {cat.description || "High-performance nutritional support for professional farming operations."}
                  </p>
                  <div style={{
                    marginTop: 'auto', color: 'var(--primary)', fontWeight: '700',
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}>
                    Explore Category <span>→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured About Teaser */}
      <section style={{ backgroundColor: '#0a0a0a', color: 'white', padding: '10rem 0', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '3rem', marginBottom: '2rem', lineHeight: '1.2' }}>
                35+ Years of <br /><span style={{ color: 'var(--primary-light)' }}>Agricultural Innovation</span>
              </h2>
              <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#cbd5e1', lineHeight: '1.8' }}>
                At KINT, we don&apos;t just manufacture fertilizers; we design chemical and biological
                systems that unlock the full genetic potential of crops. Our proprietary
                technologies are developed in-house by our R&D experts.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-light)' }}>60+</div>
                  <div style={{ opacity: 0.7 }}>Countries Exported</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary-light)' }}>500+</div>
                  <div style={{ opacity: 0.7 }}>Field Trials Per Year</div>
                </div>
              </div>
              <Link href="/about" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                About KINT Group
              </Link>
            </div>
            <div style={{ position: 'relative', height: '600px', borderRadius: '2.5rem', overflow: 'hidden' }}>
              <Image src="/images/hero.png" alt="Innovation" fill style={{ objectFit: 'cover', opacity: 0.7 }} />
            </div>
          </div>
        </div>
      </section>

      {/* News Feed */}
      <section className="section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Knowledge Centre</h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: '1.1rem' }}>
                Latest laboratory findings and field results.
              </p>
            </div>
            <Link href="/blog" style={{ color: 'var(--primary)', fontWeight: '700' }}>
              View All Articles →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {news.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="card" style={{ backgroundColor: 'white' }}>
                <div style={{ position: 'relative', height: '220px' }}>
                  <Image src={post.image || '/images/hero.png'} alt={post.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                  </div>
                  <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {post.excerpt?.substring(0, 120)}...
                  </p>
                </div>
              </Link>
            ))}
            {news.length === 0 && (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem', color: 'var(--muted-foreground)' }}>
                No news updates at this time.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.75rem', marginBottom: '1.5rem' }}>Ready to optimize your yields?</h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '3rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto 3rem' }}>
            Partner with KINT to access world-class agricultural preparations
            engineered for the most demanding environmental conditions.
          </p>
          <Link href="/contact" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'var(--primary)', padding: '1.2rem 3.5rem', fontSize: '1.1rem' }}>
            Contact our International Sales Team
          </Link>
        </div>
      </section>
    </div>
  );
}
