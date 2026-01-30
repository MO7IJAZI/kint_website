import ContactForm from "@/components/ContactForm";
import { Suspense } from "react";

export default function ContactPage() {
    return (
        <div className="section">
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem' }}>
                    <div>
                        <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1' }}>Let&apos;s Grow <br /><span style={{ color: 'var(--primary)' }}>Together</span></h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--muted-foreground)', marginBottom: '3.5rem', lineHeight: '1.7' }}>
                            Have questions about our biostimulants or specialty fertilizers?
                            Whether you are a professional farmer, a distributor, or a researcher,
                            our team is ready to provide you with the support you need.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '2rem' }}>📍</div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Global Headquarters</h4>
                                    <p style={{ color: 'var(--muted-foreground)', lineHeight: '1.5' }}>
                                        123 Agriculture Avenue, Innovation Park<br />
                                        00-001 Warsaw, Poland
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '2rem' }}>📧</div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Direct Contact</h4>
                                    <p style={{ color: 'var(--muted-foreground)' }}>General Inquiries: info@kint-group.com</p>
                                    <p style={{ color: 'var(--muted-foreground)' }}>Export Dept: export@kint-group.com</p>
                                    <p style={{ color: 'var(--muted-foreground)' }}>Support: +48 12 345 67 89</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                                <div style={{ fontSize: '2rem' }}>⏰</div>
                                <div>
                                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Business Hours</h4>
                                    <p style={{ color: 'var(--muted-foreground)' }}>Monday - Friday: 08:00 - 17:00 (GMT+1)</p>
                                    <p style={{ color: 'var(--muted-foreground)' }}>Weekend: Closed</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '4rem', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>Send an Inquiry</h3>
                        <Suspense fallback={<div>Loading form...</div>}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
}
