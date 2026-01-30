import { Metadata } from 'next';
import prisma from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'Company Headquarter | KINT',
  description: 'Visit our company headquarter.',
};

export default async function HeadquarterPage() {
  const headquarter = await prisma.headquarter.findFirst();

  const getEmbedUrl = () => {
    let q = '';
    if (headquarter?.latitude && headquarter?.longitude) {
      q = `${headquarter.latitude},${headquarter.longitude}`;
    } else if (headquarter?.address) {
      q = headquarter.address;
    }
    
    if (!q) return '';
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>
            {headquarter?.title || 'Company Headquarter'}
          </h1>
          {headquarter?.content ? (
            <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
              {headquarter.content}
            </p>
          ) : (
            <p style={{ color: 'var(--muted-foreground)' }}>Information not available yet.</p>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {headquarter?.address && (
              <div className="card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📍 Address</h3>
                <p style={{ color: 'var(--muted-foreground)', fontSize: '1.05rem', lineHeight: '1.6' }}>
                  {headquarter.address}
                </p>
              </div>
            )}
          </div>

          <div className="card" style={{ overflow: 'hidden', height: '420px' }}>
            {getEmbedUrl() ? (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={getEmbedUrl()}
                allowFullScreen
                title="Headquarter Location"
              ></iframe>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--muted-foreground)' }}>
                Map location not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
