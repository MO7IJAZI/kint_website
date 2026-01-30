"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Crop {
    id: string;
    name: string;
    slug: string;
    metaTitle: string | null;
    description: string | null;
    image: string | null;
}

export default function CropGuidesList({ initialCrops }: { initialCrops: Crop[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('ALL');

    const tabs = ['ALL', 'ARABLE CROPS', 'VEGETABLE CROPS', 'FRUIT CROPS'];

    const filteredCrops = useMemo(() => {
        return initialCrops.filter(crop => {
            const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTab = activeTab === 'ALL' || (crop.metaTitle?.toUpperCase() === activeTab);
            return matchesSearch && matchesTab;
        });
    }, [initialCrops, searchQuery, activeTab]);

    return (
        <div style={{ backgroundColor: '#fdfdfd', minHeight: '100vh' }}>
            {/* Page Header */}
            <section style={{
                padding: '4rem 0 4rem',
                backgroundColor: 'white',
                borderBottom: '1px solid #eee',
                textAlign: 'center'
            }}>
                <div className="container">
                    {/* Breadcrumbs */}
                    <nav style={{ marginBottom: '2rem', fontSize: '0.8rem', color: '#999', fontWeight: 700 }}>
                        <Link href="/" style={{ color: '#999' }}>HOME</Link> / <span style={{ color: 'var(--primary)' }}>CROP GUIDES</span>
                    </nav>
                    <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
                        CROP <span style={{ color: 'var(--primary)' }}>GUIDES</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto 3rem' }}>
                        Professional fertilization and biostimulation programs for specific plant species.
                    </p>

                    {/* Search Field */}
                    <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                        <input
                            type="text"
                            placeholder="Find your crop..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '1.25rem 2rem',
                                borderRadius: '3rem',
                                border: '1px solid #ddd',
                                fontSize: '1rem',
                                outline: 'none',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
                            }}
                        />
                        <span style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.3 }}>🔍</span>
                    </div>
                </div>
            </section>

            {/* Tabs / Filters */}
            <section style={{ padding: '2rem 0', position: 'sticky', top: '80px', backgroundColor: 'white', zIndex: 10, borderBottom: '1px solid #eee' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 2rem',
                                    borderRadius: '2rem',
                                    fontWeight: 700,
                                    fontSize: '0.85rem',
                                    transition: '0.3s',
                                    backgroundColor: activeTab === tab ? 'var(--primary)' : 'transparent',
                                    color: activeTab === tab ? 'white' : '#666',
                                    border: activeTab === tab ? '1px solid var(--primary)' : '1px solid #ddd'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Grid */}
            <section className="section">
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {filteredCrops.map((crop) => (
                            <Link key={crop.id} href={`/crops/${crop.slug}`} className="card crop-card" style={{
                                display: 'flex',
                                flexDirection: 'column',
                                border: '1px solid #eee',
                                borderRadius: '1.5rem',
                                background: 'white',
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'relative', height: '220px', width: '100%' }}>
                                    {crop.image ? (
                                        <Image
                                            src={crop.image}
                                            alt={crop.name}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    ) : (
                                        <div style={{
                                            height: '100%', width: '100%', backgroundColor: '#f3f4f6',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '4rem'
                                        }}>
                                            {crop.metaTitle === 'Arable Crops' ? '🌾' : crop.metaTitle === 'Fruit Crops' ? '🍎' : '🥦'}
                                        </div>
                                    )}
                                </div>
                                <div style={{ padding: '2rem', textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                        {crop.name}
                                    </h3>
                                    <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '2rem' }}>
                                        Fertilization technology
                                    </p>
                                    <div style={{
                                        marginTop: 'auto',
                                        padding: '0.75rem 2rem',
                                        borderRadius: '2rem',
                                        border: '1px solid #ddd',
                                        fontSize: '0.85rem',
                                        fontWeight: 700,
                                        color: 'var(--primary)',
                                        transition: '0.3s'
                                    }} className="view-button">
                                        VIEW PROGRAM →
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredCrops.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '5rem', color: '#999' }}>
                            No crops match your search or filter.
                        </div>
                    )}
                </div>
            </section>

            {/* Expert Section */}
            <section className="section" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4rem',
                        backgroundColor: '#142346',
                        borderRadius: '2rem',
                        color: 'white',
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div style={{ maxWidth: '600px', position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: 800 }}>Need a custom program?</h2>
                            <p style={{ fontSize: '1.1rem', opacity: 0.9, marginBottom: '2.5rem', lineHeight: '1.7' }}>
                                Our agronomists are ready to prepare a personalized fertilization program
                                adjusted to your local soil conditions and specific crop varieties.
                            </p>
                            <Link href="/contact" className="btn" style={{
                                backgroundColor: 'white', color: '#142346', padding: '1.1rem 2.5rem', fontWeight: 700, borderRadius: '1rem'
                            }}>
                                CONSULT AN EXPERT
                            </Link>
                        </div>
                        <div style={{ fontSize: '10rem', opacity: 0.1, transform: 'rotate(15deg)', position: 'absolute', right: '5rem' }}>🌾</div>
                    </div>
                </div>
            </section>
        </div>
    );
}
