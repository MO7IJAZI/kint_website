import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Local Representatives | KINT',
  description: 'Contact local KINT representatives in your country.',
};

export default function LocalRepresentativesPage() {
  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>Local Representatives</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
            We encourage distributors and agricultural producers to contact their local KINT representative. Our representatives will provide assistance and advice on the use of KINT products relating to both plant cultivation and animal production. For your convenience, contact us in your mother tongue via email, mobile phone, skype or WhatsApp.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>KINT representatives are available in the following countries</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ukraine</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+380 67 360 6777</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+380 67 467 2378</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Latvia</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+371 28 663 126</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Romania</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+40 722 572 537</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+40 743 488 021</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Brazil</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+55 14 997 656 969</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Form</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              Prefer writing? Use the contact form and we will route your message to a local representative.
            </p>
            <Link href="/contact?dept=local" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Open Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
