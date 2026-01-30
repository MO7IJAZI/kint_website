import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{
            backgroundColor: '#0a0a0a',
            color: 'white',
            padding: '6rem 0 3rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Subtle background decoration */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '400px',
                height: '400px',
                backgroundColor: 'var(--primary)',
                opacity: 0.05,
                filter: 'blur(100px)',
                borderRadius: '50%'
            }} />

            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1fr 1fr 1.2fr',
                    gap: '4rem',
                    marginBottom: '5rem'
                }}>
                    {/* Brand Section */}
                    <div>
                        <Link href="/" style={{
                            fontSize: '1.75rem',
                            fontWeight: 900,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                width: '72px',
                                height: '72px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                backgroundColor: 'transparent',
                                overflow: 'hidden'
                            }}>
                                <Image src="/images/logo.png" alt="" width={72} height={72} style={{ objectFit: 'contain' }} />
                            </div>
                        </Link>
                        <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1rem' }}>
                            Pioneering agricultural biotechnology since 1988. We provide world-class biostimulants and specialty fertilizers to empower professional farmers worldwide.
                        </p>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>in</a>
                            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>yt</a>
                            <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.3s' }}>fb</a>
                        </div>
                    </div>

                    {/* Quick Selection */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: '700' }}>Product Offer</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><Link href="/product-category/biostimulants" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Biostimulants</Link></li>
                            <li><Link href="/product-category/activators" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Activators</Link></li>
                            <li><Link href="/product-category/bioproducts" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Bioproducts</Link></li>
                            <li><Link href="/product-category/foliar-fertilizers" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Foliar Fertilizers</Link></li>
                            <li><Link href="/product-category/organic-farming" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Organic Solutions</Link></li>
                        </ul>
                    </div>

                    {/* Helpful Links */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: '700' }}>Resources</h4>
                        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <li><Link href="/crop-farming" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Crop Guides</Link></li>
                            <li><Link href="/mixing-table" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Mixing Table</Link></li>
                            <li><Link href="/research-development" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>R&D Centre</Link></li>
                            <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Expert Forum</Link></li>
                            <li><Link href="/about" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }}>Company Profile</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', fontWeight: '700' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)' }}>📍</span>
                                <span>123 Agriculture Avenue, <br />Innovation Park, Warsaw, PL</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)' }}>📞</span>
                                <span>+48 12 345 67 89</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <span style={{ color: 'var(--primary)' }}>✉️</span>
                                <span>info@kint-group.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.9rem'
                }}>
                    <p>© {currentYear} KINT Kafri International. All rights reserved.</p>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link href="/page/privacy-policy" style={{ transition: '0.3s' }}>Privacy Policy</Link>
                        <Link href="/page/terms" style={{ transition: '0.3s' }}>Terms of Use</Link>
                        <Link href="/page/cookies" style={{ transition: '0.3s' }}>Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
