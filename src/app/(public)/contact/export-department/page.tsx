import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Export Department | KINT',
  description: 'Contact the KINT Export Department for international cooperation.',
};

export default function ExportDepartmentPage() {
  return (
    <div className="section">
      <div className="container">
        <div style={{ marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--primary)' }}>Export Department</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)', lineHeight: '1.7' }}>
            We encourage all agrochemical product distributors, veterinary product distributors and agrochemical and feed manufacturers to contact us. By contacting us you will receive full information about our offers and conditions of co-operation. For your convenience, contact us via email, mobile phone, skype or WhatsApp.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start' }}>
          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>We speak the following languages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>English</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 501 492 352 (Europe)</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 509 793 938 (North America)</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 514 438 191 (Latin America)</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 509 793 938</p>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 511 719 256 (Asia, Africa)</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Spanish</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 514 438 191</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Slovak</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 606 213 257</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Czech</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 606 213 257</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Croatian</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 606 213 257</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Serbian</h3>
                <p style={{ color: 'var(--muted-foreground)' }}>+48 606 213 257</p>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Contact Form</h2>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: '1.5rem' }}>
              Prefer writing? Use the contact form and we will route your message to the Export Department.
            </p>
            <Link href="/contact?dept=export" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
              Open Contact Form
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
