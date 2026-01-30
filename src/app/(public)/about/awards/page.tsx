import prisma from '@/lib/prisma';
import Image from 'next/image';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Awards | KINT',
  description: 'Our achievements and recognition.',
};

export default async function AwardsPage() {
  const awards = await prisma.award.findMany({
    where: { isActive: true },
    orderBy: { order: 'asc' },
  });

  return (
    <div className="about-page certificates-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Awards & Recognition</h1>
            <p className="hero-subtitle">
              Celebrating our commitment to excellence
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section">
        <div className="container">
          {/* Awards Gallery */}
          {awards.length > 0 ? (
            <div className="certificates-gallery-section">
              <div className="certificate-gallery">
                {awards.map((award) => (
                  <div key={award.id} className="gallery-item">
                    <div className="gallery-image">
                      <Image 
                        src={award.imageUrl} 
                        alt={award.title}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <div className="gallery-overlay">
                      <span className="gallery-title">{award.title}</span>
                      {award.description && (
                        <p className="gallery-description">{award.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: '#666' }}>No awards available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
