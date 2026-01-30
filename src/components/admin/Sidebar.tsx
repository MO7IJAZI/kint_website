"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', href: '/admin', icon: '📊' },
        { name: 'Categories', href: '/admin/categories', icon: '📁' },
        { name: 'Products', href: '/admin/products', icon: '📦' },
        { name: 'Crop Guides', href: '/admin/crops', icon: '🌾' },
        { name: 'Expert Articles', href: '/admin/expert-articles', icon: '🎓' },
        { name: 'Blog Posts', href: '/admin/blog', icon: '📝' },
        { name: 'Career', href: '/admin/career', icon: '💼' },
        { name: 'Applications', href: '/admin/applications', icon: '📬' },
        { name: 'Certificates', href: '/admin/certificates', icon: '🏆' },
        { name: 'Awards', href: '/admin/awards', icon: '🎖️' },
        { name: 'Headquarter', href: '/admin/headquarter', icon: '🏢' },
        { name: 'Contact Inquiries', href: '/admin/inquiries', icon: '📧' },
        { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
    ];

    return (
        <aside style={{
            width: '280px',
            backgroundColor: '#0f172a', // Deep Slate instead of pure black
            color: 'white',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            padding: '2.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
            zIndex: 100
        }}>
            <div style={{ padding: '0 0.5rem 3rem', borderBottom: '1px solid rgba(255,255,1,0.1)', marginBottom: '2.5rem' }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{
                        width: '40px', height: '40px', backgroundColor: 'var(--primary)',
                        borderRadius: '10px', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontWeight: 900, color: 'white'
                    }}>K</div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '1px' }}>KINT ADMIN</span>
                </Link>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.25rem',
                                padding: '1rem 1.25rem',
                                borderRadius: '0.75rem',
                                backgroundColor: isActive ? 'rgba(26, 92, 55, 0.2)' : 'transparent',
                                border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
                                color: isActive ? 'white' : '#94a3b8',
                                fontWeight: isActive ? '700' : '500',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.05em'
                            }}
                            className="sidebar-link"
                        >
                            <span style={{ fontSize: '1.25rem', opacity: isActive ? 1 : 0.6 }}>{item.icon}</span>
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <Link
                    href="/"
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                    }}
                >
                    <span>🏠</span> Back to Site
                </Link>
                <button
                    onClick={() => { }}
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.25rem',
                        padding: '1rem 1.25rem',
                        fontWeight: 500,
                        fontSize: '0.8rem',
                        textTransform: 'uppercase'
                    }}
                >
                    <span>🚪</span> Logout
                </button>
            </div>

            <style jsx>{`
                .sidebar-link:hover {
                    background-color: rgba(255,255,255,0.05);
                    color: white;
                    transform: translateX(5px);
                }
            `}</style>
        </aside>
    );
}
