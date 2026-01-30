"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, X } from "lucide-react";
import JobOfferForm from "@/components/admin/JobOfferForm";
import DeleteButton from "@/components/admin/DeleteButton";
import { getAllJobOffers } from "@/actions/jobOfferActions";

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
    createdAt: Date;
}

export default function CareerAdminPage() {
    const [jobOffers, setJobOffers] = useState<JobOffer[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingOffer, setEditingOffer] = useState<JobOffer | null>(null);

    useEffect(() => {
        loadJobOffers();
    }, []);

    async function loadJobOffers() {
        try {
            const offers = await getAllJobOffers();
            setJobOffers(offers as JobOffer[]);
        } catch (error) {
            console.error("Failed to load job offers:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleEdit = (offer: JobOffer) => {
        setEditingOffer(offer);
        setShowForm(true);
    };

    // handleDelete is now handled by DeleteButton component

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingOffer(null);
        loadJobOffers();
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Career Management</h1>
                <button onClick={() => setShowForm(true)} className="btn-add">
                    <Plus size={18} />
                    Add Job Offer
                </button>
            </div>

            {/* Job Offers List */}
            <div className="content-card">
                <h2>Job Offers</h2>
                
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : jobOffers.length === 0 ? (
                    <div className="empty-state">
                        <p>No job offers yet. Create your first job offer.</p>
                    </div>
                ) : (
                    <div className="offers-list">
                        {jobOffers.map((offer) => (
                            <div key={offer.id} className="offer-item">
                                <div className="offer-info">
                                    <h3>{offer.title}</h3>
                                    <div className="offer-meta">
                                        {offer.location && (
                                            <span className="meta-tag">{offer.location}</span>
                                        )}
                                        {offer.workType && (
                                            <span className="meta-tag">{offer.workType}</span>
                                        )}
                                        {offer.contractType && (
                                            <span className="meta-tag">{offer.contractType}</span>
                                        )}
                                        <span className={`status-badge ${offer.isActive ? 'active' : 'inactive'}`}>
                                            {offer.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                                <div className="offer-actions">
                                    <button onClick={() => handleEdit(offer)} className="btn-edit">
                                        <Edit2 size={16} />
                                    </button>
                                    <DeleteButton 
                                        id={offer.id}
                                        type="job-offer"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="modal-overlay" onClick={handleCloseForm}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>{editingOffer ? 'Edit Job Offer' : 'Add Job Offer'}</h2>
                            <button onClick={handleCloseForm} className="btn-close">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="modal-body">
                            {editingOffer ? (
                                <JobOfferForm jobOffer={editingOffer} />
                            ) : (
                                <JobOfferForm />
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                .page {
                    padding: 2rem;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .page-header h1 {
                    font-size: 1.75rem;
                    color: #1e293b;
                    font-weight: 700;
                }

                .btn-add {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.25rem;
                    background: linear-gradient(135deg, #e9496c 0%, #d63d5c 100%);
                    color: white;
                    border: none;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                }

                .btn-add:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(233, 73, 108, 0.3);
                }

                .content-card {
                    background: white;
                    border-radius: 1rem;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                }

                .content-card h2 {
                    font-size: 1.25rem;
                    color: #1e293b;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .loading {
                    text-align: center;
                    padding: 2rem;
                    color: #64748b;
                }

                .empty-state {
                    text-align: center;
                    padding: 3rem;
                    color: #64748b;
                }

                .offers-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .offer-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.25rem;
                    background: #f8fafc;
                    border-radius: 0.75rem;
                    border: 1px solid #e2e8f0;
                    transition: border-color 0.2s;
                }

                .offer-item:hover {
                    border-color: #e9496c50;
                }

                .offer-info h3 {
                    font-size: 1rem;
                    color: #1e293b;
                    margin-bottom: 0.5rem;
                }

                .offer-meta {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                }

                .meta-tag {
                    font-size: 0.8rem;
                    padding: 0.25rem 0.5rem;
                    background: #e2e8f0;
                    color: #475569;
                    border-radius: 0.25rem;
                }

                .status-badge {
                    font-size: 0.75rem;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-weight: 500;
                }

                .status-badge.active {
                    background: #dcfce7;
                    color: #166534;
                }

                .status-badge.inactive {
                    background: #fee2e2;
                    color: #991b1b;
                }

                .offer-actions {
                    display: flex;
                    gap: 0.5rem;
                }

                .btn-edit {
                    padding: 0.5rem;
                    background: #f1f5f9;
                    color: #475569;
                    border: none;
                    border-radius: 0.375rem;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .btn-edit:hover {
                    background: #e2e8f0;
                }

                .modal-overlay {
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    padding: 2rem;
                }

                .modal-content {
                    background: white;
                    border-radius: 1rem;
                    width: 100%;
                    max-width: 900px;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border-bottom: 1px solid #e2e8f0;
                }

                .modal-header h2 {
                    font-size: 1.25rem;
                    color: #1e293b;
                }

                .btn-close {
                    padding: 0.5rem;
                    background: none;
                    border: none;
                    color: #64748b;
                    cursor: pointer;
                    border-radius: 0.375rem;
                }

                .btn-close:hover {
                    background: #f1f5f9;
                }

                .modal-body {
                    padding: 1.5rem;
                }
            `}</style>
        </div>
    );
}
