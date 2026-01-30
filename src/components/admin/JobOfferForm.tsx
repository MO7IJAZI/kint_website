"use client";

import { useState } from "react";
import { createJobOffer, updateJobOffer } from "@/actions/jobOfferActions";
import RichTextEditor from "./RichTextEditor";

interface JobOfferFormProps {
    jobOffer?: {
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
    };
}

export default function JobOfferForm({ jobOffer }: JobOfferFormProps) {
    const isEditing = !!jobOffer;

    const [companyIntro, setCompanyIntro] = useState(jobOffer?.companyIntro || "");
    const [responsibilities, setResponsibilities] = useState(jobOffer?.responsibilities || "");
    const [benefits, setBenefits] = useState(jobOffer?.benefits || "");
    const [qualifications, setQualifications] = useState(jobOffer?.qualifications || "");

    return (
        <form
            action={async (formData) => {
                if (isEditing) {
                    await updateJobOffer(jobOffer.id, formData);
                } else {
                    await createJobOffer(formData);
                }
            }}
            className="job-offer-form"
            style={{ maxWidth: "800px", margin: "0 auto" }}
        >
            <h2 style={{ color: "#142346", marginBottom: "20px" }}>
                {isEditing ? "Edit Job Offer" : "Create New Job Offer"}
            </h2>

            <div className="form-group" style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                    Job Title *
                </label>
                <input
                    type="text"
                    name="title"
                    defaultValue={jobOffer?.title || ""}
                    required
                    style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                />
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div className="form-group">
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        defaultValue={jobOffer?.location || ""}
                        placeholder="e.g., Warsaw, Poland"
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    />
                </div>

                <div className="form-group">
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                        Work Type
                    </label>
                    <select
                        name="workType"
                        defaultValue={jobOffer?.workType || ""}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="">Select work type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="On-site">On-site</option>
                    </select>
                </div>
            </div>

            <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div className="form-group">
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                        Contract Type
                    </label>
                    <select
                        name="contractType"
                        defaultValue={jobOffer?.contractType || ""}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="">Select contract type</option>
                        <option value="Permanent">Permanent</option>
                        <option value="Fixed-term">Fixed-term</option>
                        <option value="B2B">B2B</option>
                        <option value="Mandate">Mandate</option>
                    </select>
                </div>

                <div className="form-group">
                    <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                        Employment Type
                    </label>
                    <select
                        name="employmentType"
                        defaultValue={jobOffer?.employmentType || ""}
                        style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
                    >
                        <option value="">Select employment type</option>
                        <option value="Employee">Employee</option>
                        <option value="Manager">Manager</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Director">Director</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                    Company Introduction
                </label>
                <RichTextEditor
                    value={companyIntro}
                    onChange={setCompanyIntro}
                />
                <input type="hidden" name="companyIntro" value={companyIntro} />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                    Responsibilities
                </label>
                <RichTextEditor
                    value={responsibilities}
                    onChange={setResponsibilities}
                />
                <input type="hidden" name="responsibilities" value={responsibilities} />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                    Benefits
                </label>
                <RichTextEditor
                    value={benefits}
                    onChange={setBenefits}
                />
                <input type="hidden" name="benefits" value={benefits} />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold", color: "#142346" }}>
                    Qualifications
                </label>
                <RichTextEditor
                    value={qualifications}
                    onChange={setQualifications}
                />
                <input type="hidden" name="qualifications" value={qualifications} />
            </div>

            <div className="form-group" style={{ marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                    <input
                        type="checkbox"
                        name="isActive"
                        value="true"
                        defaultChecked={jobOffer?.isActive ?? true}
                    />
                    <span style={{ fontWeight: "bold", color: "#142346" }}>Active (visible on website)</span>
                </label>
            </div>

            <button
                type="submit"
                style={{
                    backgroundColor: "#e9496c",
                    color: "white",
                    padding: "12px 24px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "bold",
                }}
            >
                {isEditing ? "Update Job Offer" : "Create Job Offer"}
            </button>
        </form>
    );
}
