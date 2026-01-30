import React from 'react';
import Link from 'next/link';
import {
    Droplets,
    ThermometerSun,
    Sun,
    Wind,
    Beaker,
    Clock,
    FileDown,
    ChevronRight
} from 'lucide-react';

export default function OptimumConditionsPage() {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>

            {/* Breadcrumb */}
            <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e2e8f0', padding: '1rem 0' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#64748b' }}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
                        <ChevronRight size={14} />
                        <Link href="/crop-farming" style={{ textDecoration: 'none', color: 'inherit' }}>Crop Farming</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: '#059669', fontWeight: 600 }}>Optimum Conditions</span>
                    </nav>
                </div>
            </div>

            {/* Hero Header */}
            <div style={{
                background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
                padding: '4rem 0',
                color: 'white'
            }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
                        Optimum Conditions for<br />
                        <span style={{ color: '#6ee7b7' }}>Foliar Treatments</span>
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: '#a7f3d0', maxWidth: '600px', lineHeight: 1.6 }}>
                        Key environmental factors for maximizing the effectiveness of foliar fertilizers and biostimulants.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem 1.5rem' }}>

                {/* PDF Download Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #fce4e9 0%, #f8d7e1 100%)',
                    border: '2px solid #e9496c',
                    borderRadius: '1rem',
                    padding: '1.5rem 2rem',
                    marginBottom: '3rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            background: '#e9496c',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <FileDown size={24} color="white" />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.25rem' }}>Download Full Guide</h3>
                            <p style={{ fontSize: '0.875rem', color: '#b91c1c' }}>PDF with complete optimum conditions reference</p>
                        </div>
                    </div>
                    <a
                        href="/documents/optimum-conditions-foliar-treatments.pdf"
                        download
                        style={{
                            background: '#d63d5c',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: '0.5rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'background 0.2s'
                        }}
                    >
                        <FileDown size={18} />
                        Download PDF
                    </a>
                </div>

                {/* Content Sections */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Humidity */}
                    <section style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #142346'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#fce4e9',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Droplets size={24} color="#e9496c" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Air Humidity</h2>
                                <span style={{ 
                                    background: '#fce4e9', 
                                    color: '#be123c', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.875rem', 
                                    fontWeight: 600 
                                }}>
                                    Optimum: 60-80%
                                </span>
                            </div>
                        </div>
                        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                When treating in lower humidity conditions, use plant safe preparations (e.g. chelates or amino chelates instead of simple salts).
                            </p>
                            <p>
                                High relative humidity promotes longer persistence of the liquid on the plant surface, which allows more efficient penetration of the preparation into the plant and improves the effectiveness of the applied preparations.
                            </p>
                        </div>
                    </section>

                    {/* Temperature */}
                    <section style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #f97316'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#fff7ed',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <ThermometerSun size={24} color="#ea580c" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Air Temperature</h2>
                                <span style={{ 
                                    background: '#ffedd5', 
                                    color: '#c2410c', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.875rem', 
                                    fontWeight: 600 
                                }}>
                                    Optimum: 12-20°C (min 4°C, max 25°C)
                                </span>
                            </div>
                        </div>
                        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                            <p style={{ marginBottom: '1rem' }}>
                                Foliar fertilizers are most often used together with pesticides. Therefore, it is important that the label indicates the air temperature at which the pesticide is effective. This information refers not only to the temperature range at which the active ingredient is effective, but also to the temperature at which the treatment can be safely applied to plants.
                            </p>
                            <p style={{ marginBottom: '1rem' }}>
                                Temperatures below the optimum will slow the uptake of ingredients from the solution and reduce the effectiveness of the applied product.
                            </p>
                            <p>
                                At temperatures above 25°C, there is an increased risk of plant tissue damage due to rapid evaporation of water from the solution applied to the leaves. In addition, when treatments (especially fine droplets) are applied at high temperatures and low humidity, a significant amount of the applied liquid will not reach the plants due to evaporation.
                            </p>
                        </div>
                    </section>

                    {/* Sunlight */}
                    <section style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #eab308'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#fefce8',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Sun size={24} color="#ca8a04" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Moderate Sunlight</h2>
                                <span style={{ 
                                    background: '#fef9c3', 
                                    color: '#a16207', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.875rem', 
                                    fontWeight: 600 
                                }}>
                                    Cloudy weather or late afternoon
                                </span>
                            </div>
                        </div>
                        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                            <p>
                                It is recommended to spray plants during periods of limited sunlight (cloudy weather, late afternoon, etc.). Strong sunlight during application may cause crop damage.
                            </p>
                        </div>
                    </section>

                    {/* Wind */}
                    <section style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #06b6d4'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#ecfeff',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Wind size={24} color="#0891b2" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Light Wind</h2>
                                <span style={{ 
                                    background: '#cffafe', 
                                    color: '#0e7490', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.875rem', 
                                    fontWeight: 600 
                                }}>
                                    Avoid drift conditions
                                </span>
                            </div>
                        </div>
                        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                            <p>
                                Do not spray in winds that cause droplets to drift (follow regulations for acceptable wind speed for crop protection treatments).
                            </p>
                        </div>
                    </section>

                    {/* Water Temperature */}
                    <section style={{
                        background: 'white',
                        borderRadius: '1rem',
                        padding: '2rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        borderLeft: '4px solid #8b5cf6'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: '#f5f3ff',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Beaker size={24} color="#7c3aed" />
                            </div>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1e293b', marginBottom: '0.25rem' }}>Water Temperature</h2>
                                <span style={{ 
                                    background: '#ede9fe', 
                                    color: '#6d28d9', 
                                    padding: '0.25rem 0.75rem', 
                                    borderRadius: '9999px', 
                                    fontSize: '0.875rem', 
                                    fontWeight: 600 
                                }}>
                                    Optimum: 12-20°C
                                </span>
                            </div>
                        </div>
                        <div style={{ color: '#475569', lineHeight: 1.8, fontSize: '1rem' }}>
                            <p>
                                This parameter is particularly important for proper solution preparation (e.g. dissolving solid products, homogenizing the solution).
                            </p>
                        </div>
                    </section>

                    {/* Best Time to Spray */}
                    <section style={{
                        background: 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)',
                        borderRadius: '1rem',
                        padding: '2rem',
                        color: 'white'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'rgba(255,255,255,0.15)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Clock size={24} color="#6ee7b7" />
                            </div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Best Time to Spray</h2>
                        </div>
                        <div style={{ lineHeight: 1.8, fontSize: '1rem', color: '#d1fae5' }}>
                            <p>
                                In hot weather, the best time to spray crops with agrochemicals is in the late afternoon or in the evening and night hours – until a heavy dew forms. In addition, pollinating insects have completed their flight in the evening, the wind tends to die down, and there is no spray drift.
                            </p>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
