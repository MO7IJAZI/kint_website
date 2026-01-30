import prisma from '@/lib/prisma';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function CertificatesPage() {
    const certificates = await prisma.certificate.findMany({
        where: { isActive: true },
        orderBy: { order: 'asc' },
    });

    return (
        <div className="about-page certificates-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Certificates & Quality</h1>
                        <p className="hero-subtitle">
                            Committed to the highest standards
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    {/* Certificate Gallery */}
                    {certificates.length > 0 ? (
                        <div className="certificates-gallery-section">
                            <div className="certificate-gallery">
                                {certificates.map((cert) => (
                                    <div key={cert.id} className="gallery-item">
                                        <div className="gallery-image">
                                            <Image 
                                                src={cert.imageUrl} 
                                                alt={cert.title}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="gallery-overlay">
                                            <span className="gallery-title">{cert.title}</span>
                                            {cert.description && (
                                                <p className="gallery-description">{cert.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <p style={{ color: '#666' }}>No certificates available at the moment.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
