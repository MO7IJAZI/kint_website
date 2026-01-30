'use client';

import { useState, useEffect } from "react";
import JobApplicationForm from "@/components/admin/JobApplicationForm";

interface JobOffer {
    id: string;
    title: string;
    location: string | null;
    workType: string | null;
    contractType: string | null;
    employmentType: string | null;
    companyIntro: string | null;
    responsibilities: string | null;
    benefits: string | null;
    qualifications: string | null;
    isActive: boolean;
}

export default function CareerPage() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedJob, setExpandedJob] = useState<string | null>(null);
    const [applyingJob, setApplyingJob] = useState<{ id: string; title: string } | null>(null);

    useEffect(() => {
        loadJobOffers();
    }, []);

    async function loadJobOffers() {
        try {
            const res = await fetch("/api/job-offers");
            if (res.ok) {
                const data = await res.json();
                setJobOffers(data);
            }
        } catch (error) {
            console.error("Failed to load job offers:", error);
        } finally {
            setLoading(false);
        }
    }

    function toggleJob(jobId: string) {
        setExpandedJob(expandedJob === jobId ? null : jobId);
    }

    function startApplication(job: JobOffer) {
        setApplyingJob({ id: job.id, title: job.title });
        setExpandedJob(null);
    }

    function closeApplication() {
        setApplyingJob(null);
    }

    function handleApplicationSuccess() {
        setApplyingJob(null);
        loadJobOffers();
    }

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Career</h1>
                        <p className="hero-subtitle">
                            Join our team of agricultural experts
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    {/* Intro Section */}
                    <div className="intro-section">
                        <h2 className="section-title center">CAREER OPPORTUNITIES</h2>
                        <h3 className="subtitle center">Join the KINT Kafri International team</h3>
                        <div className="intro-text">
                            <p>
                                The fast growth of the KINT Kafri International business has been achieved 
                                thanks to a great commitment of its employees. Our team is gradually expanding, 
                                and due to the number of new projects we continue to look for creative and 
                                dynamic people.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="values-section">
                        <div className="values-grid">
                            <div className="value-card">
                                <div className="value-icon">📈</div>
                                <h3>Developing talents</h3>
                                <p>
                                    We aim to improve the skills and potential of our employees through 
                                    delegating responsibilities and ambitious tasks.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🎓</div>
                                <h3>Workforce development</h3>
                                <p>
                                    We aim to raise the qualifications of our employees through training 
                                    and attendance to scientific conferences.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">💡</div>
                                <h3>Recognizing innovation</h3>
                                <p>
                                    We encourage and reward ideas recommended by employees for the 
                                    development of new initiatives and innovative practices.
                                </p>
                            </div>
                            <div className="value-card">
                                <div className="value-icon">🤝</div>
                                <h3>Engaging with success</h3>
                                <p>
                                    We work together with our employees to meet individual goals that 
                                    are in line with our long-term business strategies.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Job Offers */}
                    <div className="jobs-section">
                        <h2 className="section-title center">Current Openings</h2>
                        
                        {loading ? (
                            <div className="loading">Loading job offers...</div>
                        ) : jobOffers.length === 0 ? (
                            <div className="no-jobs">
                                <p>No current job openings. Check back later!</p>
                            </div>
                        ) : (
                            <div className="jobs-list">
                                {jobOffers.map((job) => (
                                    <div key={job.id} className={`job-card ${expandedJob === job.id ? 'expanded' : ''}`}>
                                        <div className="job-header" onClick={() => toggleJob(job.id)}>
                                            <div className="job-header-left">
                                                <h3>{job.title}</h3>
                                                <div className="job-meta">
                                                    {job.location && <span className="meta-item"><span className="meta-icon">📍</span> {job.location}</span>}
                                                    {job.workType && <span className="meta-item"><span className="meta-icon">💼</span> {job.workType}</span>}
                                                    {job.contractType && <span className="meta-item"><span className="meta-icon">📋</span> {job.contractType}</span>}
                                                    {job.employmentType && <span className="meta-item"><span className="meta-icon">👤</span> {job.employmentType}</span>}
                                                </div>
                                            </div>
                                            <div className="job-toggle">
                                                <span className={`toggle-icon ${expandedJob === job.id ? 'rotated' : ''}`}>▼</span>
                                            </div>
                                        </div>
                                        
                                        {expandedJob === job.id && (
                                            <div className="job-details">
                                                {job.companyIntro && (
                                                    <div className="job-section">
                                                        <h4>About the Position</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: job.companyIntro }} />
                                                    </div>
                                                )}
                                                
                                                {job.responsibilities && (
                                                    <div className="job-section">
                                                        <h4>Key Responsibilities</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: job.responsibilities }} />
                                                    </div>
                                                )}
                                                
                                                {job.qualifications && (
                                                    <div className="job-section">
                                                        <h4>Qualifications & Skills</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: job.qualifications }} />
                                                    </div>
                                                )}
                                                
                                                {job.benefits && (
                                                    <div className="job-section benefits-section">
                                                        <h4>What We Offer</h4>
                                                        <div dangerouslySetInnerHTML={{ __html: job.benefits }} />
                                                    </div>
                                                )}
                                                
                                                <button onClick={() => startApplication(job)} className="apply-button">
                                                    Apply for this Position
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Contact */}
                    <div className="cta-section">
                        <div className="cta-card">
                            <p>
                                If you have interesting ideas, are ambitious and ready for new challenges, 
                                please do not hesitate to contact us.
                            </p>
                            <a href="/contact" className="cta-button">
                                Contact HR Department
                            </a>
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
                    margin-bottom: 1rem;
                    color: #142346;
                    font-family: var(--font-heading);
                }

                .section-title.center {
                    text-align: center;
                }

                .subtitle {
                    font-size: 1.3rem;
                    color: #e9496c;
                    margin-bottom: 2rem;
                    font-weight: 600;
                    text-align: center;
                }

                .intro-section {
                    margin-bottom: 3rem;
                }

                .intro-text {
                    max-width: 800px;
                    margin: 0 auto;
                }

                .intro-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #4a5568;
                    text-align: center;
                }

                .values-section {
                    margin-bottom: 4rem;
                }

                .values-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }

                .value-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 2rem;
                    border: 1px solid #e2e8f0;
                    text-align: center;
                }

                .value-card:hover {
                    border-color: #e9496c50;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }

                .value-icon {
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                }

                .value-card h3 {
                    font-size: 1.2rem;
                    color: #142346;
                    margin-bottom: 0.75rem;
                }

                .value-card p {
                    color: #4a5568;
                    line-height: 1.6;
                    font-size: 0.95rem;
                }

                .jobs-section {
                    margin-bottom: 4rem;
                }

                .loading, .no-jobs {
                    text-align: center;
                    padding: 3rem;
                    color: #64748b;
                    font-size: 1.1rem;
                }

                .jobs-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .job-card {
                    background: white;
                    border-radius: 1rem;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                    overflow: hidden;
                }

                .job-card:hover {
                    border-color: #e9496c50;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                }

                .job-card.expanded {
                    border-color: #e9496c;
                    box-shadow: 0 10px 30px rgba(233, 73, 108, 0.15);
                }

                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    cursor: pointer;
                }

                .job-header-left {
                    flex: 1;
                }

                .job-header h3 {
                    font-size: 1.4rem;
                    color: #142346;
                    margin-bottom: 0.75rem;
                }

                .job-meta {
                    display: flex;
                    gap: 1.5rem;
                    flex-wrap: wrap;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.9rem;
                    color: #4a5568;
                }

                .meta-icon {
                    font-size: 1rem;
                }

                .job-toggle {
                    padding-left: 1rem;
                }

                .toggle-icon {
                    font-size: 1.2rem;
                    color: #e9496c;
                    transition: transform 0.3s ease;
                    display: inline-block;
                }

                .toggle-icon.rotated {
                    transform: rotate(180deg);
                }

                .job-details {
                    padding: 0 2rem 2rem;
                    border-top: 1px solid #e2e8f0;
                }

                .job-section {
                    margin-top: 1.5rem;
                }

                .job-section h4 {
                    font-size: 1.1rem;
                    color: #142346;
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .job-section :global(h4::before) {
                    content: '';
                    display: inline-block;
                    width: 4px;
                    height: 1.1rem;
                    background: #e9496c;
                    border-radius: 2px;
                }

                .job-section :global(p) {
                    color: #4a5568;
                    line-height: 1.7;
                    margin-bottom: 0.5rem;
                }

                .job-section :global(ul) {
                    color: #4a5568;
                    line-height: 1.8;
                    padding-left: 1.5rem;
                    margin: 0.5rem 0;
                }

                .job-section :global(li) {
                    margin-bottom: 0.25rem;
                }

                .benefits-section {
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    margin: 1.5rem -2rem 1.5rem;
                    padding: 1.5rem 2rem;
                    border-radius: 0 0 1rem 1rem;
                }

                .apply-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #e9496c 0%, #d63d5c 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    margin-top: 1.5rem;
                }

                .apply-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(233, 73, 108, 0.3);
                }

                .cta-section {
                    margin-bottom: 2rem;
                }

                .cta-card {
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    border-radius: 2rem;
                    padding: 3rem;
                    text-align: center;
                    color: white;
                }

                .cta-card p {
                    font-size: 1.15rem;
                    line-height: 1.8;
                    max-width: 700px;
                    margin: 0 auto 1.5rem;
                    opacity: 0.95;
                }

                .cta-button {
                    display: inline-block;
                    background: linear-gradient(135deg, #e9496c 0%, #d63d5c 100%);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px rgba(233, 73, 108, 0.3);
                }

                @media (max-width: 768px) {
                    .values-grid {
                        grid-template-columns: 1fr;
                    }
                    
                    .hero-title {
                        font-size: 2.5rem;
                    }
                    
                    .job-header {
                        padding: 1rem 1.5rem;
                    }
                    
                    .job-meta {
                        gap: 1rem;
                    }
                    
                    .job-details {
                        padding: 0 1.5rem 1.5rem;
                    }
                    
                    .benefits-section {
                        margin: 1.5rem -1.5rem 1.5rem;
                        padding: 1.5rem;
                    }
                }

                .application-modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    padding: 1rem;
                    animation: fadeIn 0.2s ease;
                    overflow-y: auto;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            {/* Application Form Modal */}
            {applyingJob && (
                <div className="application-modal-overlay" onClick={closeApplication}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <JobApplicationForm
                            jobOfferId={applyingJob.id}
                            jobTitle={applyingJob.title}
                            onClose={closeApplication}
                            onSuccess={handleApplicationSuccess}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
