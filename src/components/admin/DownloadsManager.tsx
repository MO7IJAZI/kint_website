"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";

interface DownloadItem {
    id?: string;
    title: string;
    type: string;
    fileUrl: string;
}

interface DownloadsManagerProps {
    initialData?: DownloadItem[];
    onChange: (data: DownloadItem[]) => void;
}

export default function DownloadsManager({ initialData, onChange }: DownloadsManagerProps) {
    const [downloads, setDownloads] = useState<DownloadItem[]>(initialData || []);

    const addDownload = () => {
        const newDownload: DownloadItem = { title: "", type: "Label", fileUrl: "" };
        const updated = [...downloads, newDownload];
        setDownloads(updated);
        onChange(updated);
    };

    const removeDownload = (index: number) => {
        const updated = downloads.filter((_, i) => i !== index);
        setDownloads(updated);
        onChange(updated);
    };

    const updateDownload = (index: number, field: keyof DownloadItem, value: string) => {
        const updated = [...downloads];
        updated[index] = { ...updated[index], [field]: value };
        setDownloads(updated);
        onChange(updated);
    };

    return (
        <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '700', fontSize: '0.85rem', color: 'var(--foreground)', opacity: 0.8 }}>PRODUCT DOWNLOADS (SDS, LABELS, BROCHURES)</label>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {downloads.map((item, index) => (
                    <div key={index} style={{ 
                        padding: '1.5rem', 
                        border: '1px solid var(--border)', 
                        borderRadius: '0.75rem',
                        backgroundColor: '#f8fafc',
                        position: 'relative'
                    }}>
                        <button 
                            type="button"
                            onClick={() => removeDownload(index)}
                            style={{
                                position: 'absolute',
                                top: '1rem',
                                right: '1rem',
                                color: '#ef4444',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}
                        >
                            REMOVE
                        </button>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>DOCUMENT TITLE</label>
                                <input 
                                    className="input" 
                                    style={{ width: '100%', backgroundColor: 'white' }}
                                    placeholder="e.g. Safety Data Sheet 2025"
                                    value={item.title}
                                    onChange={(e) => updateDownload(index, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: '600' }}>TYPE</label>
                                <select 
                                    className="input" 
                                    style={{ width: '100%', backgroundColor: 'white' }}
                                    value={item.type}
                                    onChange={(e) => updateDownload(index, 'type', e.target.value)}
                                >
                                    <option value="Label">Label</option>
                                    <option value="SDS">SDS (Safety Data Sheet)</option>
                                    <option value="Brochure">Brochure</option>
                                    <option value="Certificate">Certificate</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <FileUpload 
                            label="PDF FILE"
                            value={item.fileUrl}
                            onChange={(url) => updateDownload(index, 'fileUrl', url)}
                        />
                    </div>
                ))}
            </div>

            <button 
                type="button"
                onClick={addDownload}
                className="btn btn-outline"
                style={{ width: '100%', marginTop: '1rem', borderStyle: 'dashed', justifyContent: 'center' }}
            >
                + ADD DOCUMENT
            </button>
        </div>
    );
}
