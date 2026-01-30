import { FileDown } from "lucide-react";

export default function MixingTable() {
    return (
        <div className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
            <div className="container">
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Mixing Table <span style={{ color: 'var(--primary)' }}>2026</span></h1>
                    <p style={{ fontSize: '1.1rem', color: 'var(--muted-foreground)' }}>
                        Download the complete mixing table guide for tank-mix compatibility.
                    </p>
                </div>

                {/* PDF Download Section */}
                <div style={{
                    background: 'linear-gradient(135deg, #fce4e9 0%, #f8d7e1 100%)',
                    border: '2px solid #e9496c',
                    borderRadius: '1rem',
                    padding: '2rem',
                    maxWidth: '600px',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1.5rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            background: '#e9496c',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FileDown size={28} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.25rem', fontSize: '1.1rem' }}>Downloadable file in PDF format</h3>
                            <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>Optimum Conditions for Foliar Treatments</p>
                        </div>
                    </div>
                    <a
                        href="/documents/optimum-conditions-foliar-treatments.pdf"
                        download
                        style={{
                            background: '#d63d5c',
                            color: 'white',
                            padding: '0.875rem 1.75rem',
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontSize: '1rem'
                        }}
                    >
                        <FileDown size={20} />
                        Download PDF
                    </a>
                </div>
            </div>
        </div>
    );
}
