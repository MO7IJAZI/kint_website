'use client';

import Image from 'next/image';

export default function RDPage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Research & Development Centre</h1>
                        <p className="hero-subtitle">
                            Innovation driving agricultural excellence
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
                                <h2 className="section-title">Research & Development</h2>
                                <p>
                                    The existence of the Research and Development Centre at KINT Kafri International 
                                    aligns with our corporate strategy, where great emphasis is put on research and 
                                    development of innovative products designed for use in agriculture. Our research 
                                    team includes world-class specialists in the areas of technology, chemistry, 
                                    biology and microbiology.
                                </p>
                            </div>
                            <div className="intro-image">
                                <div className="image-placeholder">
                                    <Image 
                                        src="/images/about/RD top.webp" 
                                        alt="R&D Centre" 
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Laboratories */}
                    <div className="labs-section">
                        <p>
                            The KINT Kafri International laboratories are equipped with modern instruments to perform 
                            a wide range of tasks including formulations, chemical analyses and biological research. 
                            They include four main laboratories: the formulation laboratory, analytical laboratory, 
                            biotechnology laboratory and biological research laboratory.
                        </p>
                    </div>

                    {/* Formulation Research Laboratory */}
                    <div className="lab-section">
                        <h2>Formulation Research Laboratory</h2>
                        <p>
                            This laboratory is equipped with high quality instruments for conducting tasks 
                            associated with the design and the development of new products.
                        </p>
                    </div>

                    {/* Analytical Laboratory */}
                    <div className="lab-section">
                        <h2>Analytical Laboratory</h2>
                        <p>
                            This laboratory is an important part of the KINT Kafri International product, 
                            quality control process. It performs the chemical composition analysis of the 
                            raw materials we use; of our manufactured products and of any newly developed 
                            formulations. This laboratory help facilitate the optimization of our research 
                            and development goals and a consistent high-quality product.
                        </p>
                    </div>

                    {/* Biotechnology Laboratory */}
                    <div className="lab-section">
                        <h2>Biotechnology Laboratory</h2>
                        <p>
                            This laboratory provides the environment and equipment where our microbiologists 
                            work on the development of new generations of biopreparations using isolations 
                            of selected strains of microorganisms.
                        </p>
                    </div>

                    {/* Biological Research Laboratory */}
                    <div className="lab-section">
                        <h2>Biological Research Laboratory</h2>
                        <p>
                            This laboratory is equipped with a state of the art phytotron for conducting 
                            studies on plants in programmed and strictly controlled climatic conditions 
                            and an experimental tunnel for climate modeling which includes features such 
                            as automated heating, ventilation, shading, watering, and plant feeding systems.
                        </p>
                    </div>

                    {/* Mission Statement */}
                    <div className="mission-section">
                        <p>
                            To provide a team of experienced committed, and passionate professionals, 
                            with modern equipment and instruments to develop and manufacture innovative 
                            preparations used in modern agriculture around the world. This constitutes 
                            the foundation of the KINT Kafri International mission.
                        </p>
                    </div>

                    {/* Gallery Section */}
                    <div className="gallery-section">
                        <h2 className="section-title center">Our Facilities</h2>
                        <div className="gallery-grid">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                <div key={num} className="gallery-item">
                                    <div className="image-placeholder">
                                        <Image 
                                            src={`/images/about/gallery/RD_${num}.webp`} 
                                            alt={`R&D Centre ${num}`} 
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
                    content: 'Image: R&D Centre';
                }

                .labs-section {
                    margin-bottom: 2rem;
                }

                .labs-section p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #4a5568;
                }

                .lab-section {
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    background: #f8fafc;
                    border-radius: 1rem;
                    border-left: 4px solid #e9496c;
                }

                .lab-section h2 {
                    font-size: 1.3rem;
                    color: #142346;
                    margin-bottom: 1rem;
                }

                .lab-section p {
                    font-size: 1.05rem;
                    color: #4a5568;
                    line-height: 1.7;
                }

                .mission-section {
                    margin: 3rem 0;
                    padding: 2rem;
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    border-radius: 1.5rem;
                    color: white;
                }

                .mission-section p {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    text-align: center;
                    max-width: 900px;
                    margin: 0 auto;
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
