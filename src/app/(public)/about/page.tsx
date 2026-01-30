'use client';

import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Company Profile</h1>
                        <p className="hero-subtitle">
                            Pioneering agricultural solutions since 1988
                        </p>
                    </div>
                </div>
                <div className="hero-overlay"></div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    {/* Introduction */}
                    <div className="intro-section">
                        <div className="intro-grid">
                            <div className="intro-text">
                                <h2 className="section-title">About KINT Kafri International</h2>
                                <p className="lead-text">
                                    KINT Kafri International is a company founded in Poland in 1988. From the beginning, 
                                    its activity focused on the development and production of modern preparations 
                                    for agriculture.
                                </p>
                                <p>
                                    Currently the company is one of the biggest manufacturers of fertilizers and 
                                    biostimulants, and actively participates in the sector of animal health products. 
                                    KINT Kafri International has expanded its operations in Europe, Asia, Africa, 
                                    North, and South America.
                                </p>
                            </div>
                            <div className="intro-image">
                                <div className="image-placeholder">
                                    <Image 
                                        src="/images/about/company-overview.webp" 
                                        alt="KINT Kafri International Company Overview" 
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Motto */}
                    <div className="mission-section">
                        <h2 className="section-title">Our Mission</h2>
                        <p className="mission-text">
                            Our ambition is to become the leading provider of the most modern solutions for 
                            farmers and help them increase productivity, following the company&apos;s motto:
                        </p>
                        <blockquote className="motto">
                            &quot;EFFECTIVENESS THROUGH KNOWLEDGE.&quot;
                        </blockquote>
                    </div>

                    {/* Research & Cooperation */}
                    <div className="content-section">
                        <p>
                            KINT Kafri International&apos;s mission is to promote solutions for increasing 
                            the efficiency of agricultural production while caring for the environment 
                            and food safety. For this purpose, we cooperate with renowned research and 
                            scientific centers. We have also built our own research and experimental 
                            facilities where advanced research and development activities are performed.
                        </p>
                    </div>

                    {/* Nature Inspired */}
                    <div className="content-section">
                        <p>
                            The inspiration for new projects are often solutions and mechanisms created 
                            by nature. Launching new products into the market is always preceded with 
                            extensive biological studies to confirm their effectiveness in real-life applications.
                        </p>
                    </div>

                    {/* Expert Team */}
                    <div className="content-section">
                        <p>
                            The strength of KINT Kafri International lies in a team of experienced experts 
                            who support our customers and partners with their knowledge and experience.
                        </p>
                    </div>

                    {/* R&D Investment */}
                    <div className="content-section">
                        <p>
                            KINT Kafri International&apos;s objective is a long-term development, so it 
                            is important for us to invest in research and development. Modern equipment 
                            and instruments in the laboratory and a team of experienced, educated 
                            professionals, full of commitment and passion for the search and discovery 
                            of new solutions, bring the astonishing results of innovative products on 
                            the market. Also, the production potential of the company continues to increase. 
                            Our expanded and modernized plant is now one of the most modern in Europe 
                            among manufacturers in the agriculture industry.
                        </p>
                    </div>

                    {/* Customer Focus */}
                    <div className="customer-section">
                        <div className="customer-card">
                            <p>
                                The company&apos;s primary virtue is customer satisfaction. Our customers&apos; 
                                growing requirements, opinions, and suggestions are the inspiration for continuous 
                                improvement of the product range and implementation of further innovative solutions, 
                                increasing in the profitability of agricultural production.
                            </p>
                            <p className="closing-text">
                                We look forward to cooperating with you.
                            </p>
                        </div>
                    </div>

                    {/* Product Qualities */}
                    <div className="qualities-section">
                        <h2 className="section-title center">Major Qualities of KINT Kafri International Products</h2>
                        
                        <div className="qualities-grid">
                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>High quality</h3>
                                <p>
                                    We guarantee a stable physical form of our products and a composition 
                                    consistent with the declared content. We use the latest production 
                                    technologies and follow procedures in accordance with recommendations. 
                                    Our production is based on the Quality and Environmental Management 
                                    Systems ISO 9001 and 14001, and Good Manufacturing Practices GMP +. 
                                    The raw materials used come from verified suppliers that meet quality 
                                    requirements according to ISO 9001 and 14001, as well as GMP+. 
                                    Prior to production, all components are subject to strict quality control checks.
                                </p>
                            </div>

                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>High efficiency</h3>
                                <p>
                                    Our products can significantly increase crop yield, improve its quality 
                                    and raise the productivity and health of animals. The effectiveness of 
                                    products is confirmed experimentally and supported by positive user 
                                    feedback. Agricultural recommendations are optimized for various climate 
                                    conditions. High-concentration products allow desired effects to be 
                                    achieved at low doses.
                                </p>
                            </div>

                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>Innovativeness</h3>
                                <p>
                                    Our products are based on unique ideas. Novel solutions are protected by 
                                    patents. We offer innovative products such as biostimulants, anti-stress 
                                    agents, bioproducts, specialty fertilizers, adjuvants and animal health 
                                    products. Our comprehensive technologies relating to crop farming and 
                                    animal health protection meet the requirements of professional agricultural 
                                    businesses.
                                </p>
                            </div>

                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>In-house formulae</h3>
                                <p>
                                    Compositions and formulations of fertilizers and animal preparations are 
                                    developed by technologists in KINT Kafri International laboratories in 
                                    consultation with scientific centers, and are field-tested on farms.
                                </p>
                            </div>

                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>Practicability</h3>
                                <p>
                                    Due to a sound knowledge of the market, we can provide a fast response 
                                    to the market&apos;s changing needs and requirements. We pay special attention 
                                    to the practicability of recommended solutions, for example compatibility 
                                    of fertilization and plant protection programs, as well as combined use 
                                    of agrochemicals. We yield positive test results for fertilizer miscibility 
                                    with commonly used pesticides. We also offer the advantage of a long 
                                    shelf-life for our products and availability of liquid and powder formulations.
                                </p>
                            </div>

                            <div className="quality-card">
                                <div className="quality-icon">✓</div>
                                <h3>Advisory services</h3>
                                <p>
                                    A wide range of support services are provided by a team of KINT Kafri International 
                                    advisors, including trainings, field demonstrations, seminars and individual advice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                /* Hero Section */
                .hero-section {
                    position: relative;
                    min-height: 50vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    color: white;
                    text-align: center;
                    padding: 6rem 0;
                }
                
                .hero-content {
                    position: relative;
                    z-index: 2;
                }
                
                .hero-title {
                    font-size: 4rem;
                    font-weight: 800;
                    margin-bottom: 1rem;
                    font-family: var(--font-heading);
                }
                
                .hero-subtitle {
                    font-size: 1.5rem;
                    opacity: 0.9;
                }
                
                .hero-overlay {
                    position: absolute;
                    inset: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="rgba(255,255,255,0.02)"/></svg>');
                    background-size: 50px 50px;
                }

                /* Section Styles */
                .section {
                    padding: 5rem 0;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 2rem;
                    color: #142346;
                    font-family: var(--font-heading);
                }

                .section-title.center {
                    text-align: center;
                }

                /* Intro Section */
                .intro-section {
                    margin-bottom: 4rem;
                }

                .intro-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                }

                .intro-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #4a5568;
                    margin-bottom: 1.5rem;
                }

                .lead-text {
                    font-size: 1.25rem !important;
                    color: #142346 !important;
                    font-weight: 500;
                }

                .intro-image .image-placeholder {
                    position: relative;
                    width: 100%;
                    height: 400px;
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
                    content: 'Image: Company Overview';
                }

                /* Mission Section */
                .mission-section {
                    margin-bottom: 2rem;
                }

                .mission-text {
                    font-size: 1.2rem;
                    color: #4a5568;
                    line-height: 1.8;
                    margin-bottom: 1rem;
                }

                .motto {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #e9496c;
                    font-style: italic;
                    border: none;
                    padding: 0;
                    margin: 0;
                }

                /* Content Section */
                .content-section {
                    margin-bottom: 2rem;
                }

                .content-section p {
                    font-size: 1.1rem;
                    color: #4a5568;
                    line-height: 1.8;
                }

                /* Customer Section */
                .customer-section {
                    margin: 4rem 0;
                }

                .customer-card {
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    border-radius: 2rem;
                    padding: 3rem;
                    color: white;
                }

                .customer-card p {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    opacity: 0.9;
                }

                .closing-text {
                    font-size: 1.3rem !important;
                    font-weight: 600;
                    opacity: 1 !important;
                    color: #e9496c !important;
                    margin-top: 1.5rem;
                }

                /* Qualities Section */
                .qualities-section {
                    margin-top: 4rem;
                }

                .qualities-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }

                .quality-card {
                    background: white;
                    border-radius: 1.5rem;
                    padding: 2rem;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .quality-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0,0,0,0.08);
                    border-color: #e9496c50;
                }

                .quality-icon {
                    font-size: 1.5rem;
                    color: #e9496c;
                    margin-bottom: 1rem;
                }

                .quality-card h3 {
                    font-size: 1.2rem;
                    color: #142346;
                    margin-bottom: 1rem;
                    text-transform: capitalize;
                }

                .quality-card p {
                    color: #4a5568;
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                @media (max-width: 1024px) {
                    .intro-grid {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .intro-image .image-placeholder {
                        height: 300px;
                    }

                    .qualities-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 768px) {
                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .hero-subtitle {
                        font-size: 1.2rem;
                    }

                    .qualities-grid {
                        grid-template-columns: 1fr;
                    }

                    .customer-card {
                        padding: 2rem;
                        border-radius: 1.5rem;
                    }

                    .section-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
