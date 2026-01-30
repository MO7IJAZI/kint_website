'use client';

import Image from 'next/image';

export default function LogisticsCentrePage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Warehouse & Logistics Centre</h1>
                        <p className="hero-subtitle">
                            Efficient global distribution network
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    {/* Intro */}
                    <div className="intro-section">
                        <div className="intro-grid">
                            <div className="intro-text">
                                <h2 className="section-title">Modern Logistics Operations</h2>
                                <p>
                                    Warehouse and Logistics Centre operates in accordance with the implemented modern 
                                    WMS class IT system that supports all processes associated with order planning, 
                                    booking, selection and release of goods from the warehouse, and transport selection 
                                    and organisation.
                                </p>
                                <p>
                                    At the same time, the system covers the area of raw materials and packaging purchase 
                                    planning, planning, supervision, and control over production and quality control.
                                </p>
                            </div>
                            <div className="intro-image">
                                <div className="image-placeholder">
                                    <Image 
                                        src="/images/about/logistics.webp" 
                                        alt="Logistics Centre" 
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Production Planning */}
                    <div className="content-section">
                        <p>
                            Based the customers&apos; orders it is possible to quickly check and book stocks and to 
                            efficiently plan production in advance and in the correct quantity.
                        </p>
                    </div>

                    {/* Warehouse Areas */}
                    <div className="warehouse-section">
                        <h2>Modern Warehouse is Divided into Three Areas</h2>
                        
                        <div className="warehouse-grid">
                            <div className="warehouse-card">
                                <div className="warehouse-icon">📦</div>
                                <h3>Collection Area</h3>
                                <p>
                                    An area where goods are received from two KINT Kafri International production plants.
                                </p>
                            </div>
                            
                            <div className="warehouse-card">
                                <div className="warehouse-icon">🏪</div>
                                <h3>Storage Area</h3>
                                <p>
                                    Main warehouse equipped with high storage shelves.
                                </p>
                            </div>
                            
                            <div className="warehouse-card">
                                <div className="warehouse-icon">🚚</div>
                                <h3>Release Area</h3>
                                <p>
                                    An area where orders are prepared for shipments.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Loading Capacity */}
                    <div className="capacity-section">
                        <p>
                            The collection and release areas are equipped with independent loading ramps for 
                            50 FTL trucks and cargo containers received and dispatched per day.
                        </p>
                    </div>

                    {/* Process Optimization */}
                    <div className="optimization-section">
                        <p>
                            Process optimization and full availability of finished products ensure timely 
                            delivery to customers.
                        </p>
                    </div>

                    {/* Gallery Section */}
                    <div className="gallery-section">
                        <h2 className="section-title center">Our Logistics Facilities</h2>
                        <div className="gallery-grid">
                            {[1, 2, 3, 4].map((num) => (
                                <div key={num} className="gallery-item">
                                    <div className="image-placeholder">
                                        <Image 
                                            src={`/images/about/gallery/LC_${num}.webp`} 
                                            alt={`Logistics Centre ${num}`} 
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .hero-section {
                    position: relative;
                    min-height: 40vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    color: white;
                    text-align: center;
                    padding: 4rem 0;
                }
                
                .hero-content {
                    position: relative;
                    z-index: 2;
                }
                
                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    font-family: var(--font-heading);
                }
                
                .hero-subtitle {
                    font-size: 1.3rem;
                    opacity: 0.9;
                }

                .section {
                    padding: 4rem 0;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    color: #142346;
                    font-family: var(--font-heading);
                }

                .section-title.center {
                    text-align: center;
                    margin-bottom: 2rem;
                }

                .intro-section {
                    margin-bottom: 3rem;
                }

                .intro-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    align-items: center;
                }

                .intro-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #4a5568;
                    margin-bottom: 1rem;
                }

                .intro-image .image-placeholder {
                    position: relative;
                    width: 100%;
                    height: 350px;
                    background: linear-gradient(135deg, #e9496c20 0%, #14234620 100%);
                    border-radius: 1.5rem;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a0aec0;
                    font-size: 1rem;
                }

                .intro-image .image-placeholder::before {
                    content: 'Image: Logistics Centre';
                }

                .content-section {
                    margin-bottom: 2rem;
                }

                .content-section p {
                    font-size: 1.1rem;
                    color: #4a5568;
                    line-height: 1.8;
                }

                .warehouse-section {
                    margin: 2rem 0;
                }

                .warehouse-section h2 {
                    font-size: 1.4rem;
                    color: #142346;
                    margin-bottom: 1.5rem;
                }

                .warehouse-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                .warehouse-card {
                    background: #f8fafc;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    border-left: 4px solid #e9496c;
                    text-align: center;
                }

                .warehouse-card:hover {
                    background: #fff;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }

                .warehouse-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .warehouse-card h3 {
                    font-size: 1.1rem;
                    color: #142346;
                    margin-bottom: 0.5rem;
                }

                .warehouse-card p {
                    color: #4a5568;
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                .capacity-section {
                    margin: 2rem 0;
                    padding: 2rem;
                    background: #e9496c10;
                    border-radius: 1rem;
                    border: 1px solid #e9496c30;
                }

                .capacity-section p {
                    font-size: 1.1rem;
                    color: #142346;
                    line-height: 1.8;
                    text-align: center;
                }

                .optimization-section {
                    margin: 2rem 0;
                    padding: 2rem;
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    border-radius: 1.5rem;
                    color: white;
                }

                .optimization-section p {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    text-align: center;
                }

                .gallery-section {
                    margin-top: 4rem;
                }

                .gallery-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 1.5rem;
                }

                .gallery-item {
                    border-radius: 1rem;
                    overflow: hidden;
                    aspect-ratio: 1;
                }

                .gallery-item .image-placeholder {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #e9496c20 0%, #14234620 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #a0aec0;
                    font-size: 0.9rem;
                }

                @media (max-width: 1024px) {
                    .gallery-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .warehouse-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .intro-grid,
                    .gallery-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .hero-title {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
}
