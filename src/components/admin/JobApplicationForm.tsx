"use client";

import { useState } from "react";

interface JobApplicationFormProps {
    jobOfferId: string;
    jobTitle: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function JobApplicationForm({ jobOfferId, jobTitle, onClose, onSuccess }: JobApplicationFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        formData.append("jobOfferId", jobOfferId);

        try {
            const res = await fetch("/api/job-applications", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                setSuccess(true);
                setTimeout(() => {
                    onSuccess();
                }, 2000);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to submit application");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (success) {
        return (
            <div className="application-success">
                <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h3>Application Sent!</h3>
                <p>We will review your application for <strong>{jobTitle}</strong> and contact you soon.</p>
                <button onClick={onSuccess} className="btn-close-success">OK</button>
                <style jsx>{`
                    .application-success {
                        text-align: center;
                        padding: 1.5rem 2rem;
                    }
                    .success-icon {
                        width: 48px;
                        height: 48px;
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        color: white;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 0 auto 1rem;
                    }
                    .success-icon svg {
                        width: 24px;
                        height: 24px;
                    }
                    .application-success h3 {
                        color: #142346;
                        font-size: 1.25rem;
                        margin-bottom: 0.5rem;
                    }
                    .application-success p {
                        color: #666;
                        font-size: 0.9rem;
                        margin-bottom: 1rem;
                    }
                    .btn-close-success {
                        padding: 0.5rem 2rem;
                        background: #142346;
                        color: white;
                        border: none;
                        border-radius: 0.375rem;
                        cursor: pointer;
                        font-weight: 600;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="application-form">
            <div className="form-header">
                <h3>Apply Now</h3>
                <span className="job-title">{jobTitle}</span>
                <button onClick={onClose} className="btn-close">×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>First Name *</label>
                        <input type="text" name="firstName" required placeholder="John" />
                    </div>
                    <div className="form-group">
                        <label>Last Name *</label>
                        <input type="text" name="lastName" required placeholder="Doe" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required placeholder="john@example.com" />
                    </div>
                    <div className="form-group">
                        <label>Phone</label>
                        <input type="tel" name="phone" placeholder="+1 234 567 8900" />
                    </div>
                </div>

                <div className="form-group">
                    <label>LinkedIn URL</label>
                    <input type="url" name="linkedIn" placeholder="linkedin.com/in/yourprofile" />
                </div>

                <div className="form-group">
                    <label>CV Link *</label>
                    <input type="url" name="cvUrl" required placeholder="Drive, Dropbox or website link" />
                </div>

                <div className="form-group">
                    <label>Cover Letter (optional)</label>
                    <textarea name="coverLetter" rows={2} placeholder="Brief introduction..." />
                </div>

                {error && <div className="error-message">{error}</div>}

                <div className="form-actions">
                    <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? "Sending..." : "Send Application"}
                    </button>
                </div>
            </form>

            <style jsx>{`
                .application-form {
                    background: white;
                    border-radius: 0.75rem;
                    overflow: hidden;
                    max-width: 480px;
                    width: 95%;
                    margin: 1rem;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                }
                
                .form-header {
                    background: linear-gradient(135deg, #142346 0%, #1a2f5c 100%);
                    color: white;
                    padding: 1rem 1.25rem;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    flex-wrap: wrap;
                }
                
                .form-header h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    font-weight: 700;
                }
                
                .job-title {
                    font-size: 0.85rem;
                    opacity: 0.9;
                    flex: 1;
                }
                
                .btn-close {
                    background: rgba(255,255,255,0.15);
                    border: none;
                    color: white;
                    font-size: 1.25rem;
                    cursor: pointer;
                    padding: 0.2rem 0.6rem;
                    border-radius: 0.25rem;
                }
                
                form {
                    padding: 1rem 1.25rem;
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                }
                
                .form-group {
                    margin-bottom: 0.5rem;
                }
                
                .form-group label {
                    display: block;
                    font-size: 0.8rem;
                    font-weight: 600;
                    color: #333;
                    margin-bottom: 0.2rem;
                }
                
                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.5rem 0.65rem;
                    border: 1px solid #ddd;
                    border-radius: 0.35rem;
                    font-size: 0.85rem;
                    transition: border-color 0.2s;
                }
                
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #e9496c;
                }
                
                .error-message {
                    background: #fee;
                    color: #c00;
                    padding: 0.5rem;
                    border-radius: 0.35rem;
                    font-size: 0.8rem;
                    margin: 0.5rem 0;
                }
                
                .form-actions {
                    display: flex;
                    gap: 0.5rem;
                    justify-content: flex-end;
                    margin-top: 0.75rem;
                    padding-top: 0.75rem;
                    border-top: 1px solid #eee;
                }
                
                .btn-cancel {
                    padding: 0.5rem 1rem;
                    background: #f0f0f0;
                    color: #555;
                    border: none;
                    border-radius: 0.35rem;
                    cursor: pointer;
                    font-size: 0.85rem;
                }
                
                .btn-submit {
                    padding: 0.5rem 1.25rem;
                    background: linear-gradient(135deg, #e9496c 0%, #d63d5c 100%);
                    color: white;
                    border: none;
                    border-radius: 0.35rem;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.85rem;
                }
                
                .btn-submit:disabled {
                    opacity: 0.7;
                }
                
                @media (max-width: 400px) {
                    .form-row {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
