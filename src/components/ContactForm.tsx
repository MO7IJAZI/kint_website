"use client";

import { submitInquiry } from "@/actions/inquiryActions";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactForm() {
    const searchParams = useSearchParams();
    const dept = searchParams.get('dept');

    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
    const [isPending, setIsPending] = useState(false);
    const [selectedDept, setSelectedDept] = useState("");

    useEffect(() => {
        if (dept) {
            setSelectedDept(dept === 'export' ? 'Export Department' : dept === 'local' ? 'Local Representatives' : "");
        }
    }, [dept]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);
        setStatus({ type: null, message: '' });

        const formData = new FormData(e.currentTarget);
        try {
            const result = await submitInquiry(formData);
            if (result.success) {
                setStatus({ type: 'success', message: result.message });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
            }
        } catch {
            setStatus({ type: 'error', message: 'Failed to send message.' });
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {status.type && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    backgroundColor: status.type === 'success' ? '#ecfdf5' : '#fff1f2',
                    color: status.type === 'success' ? '#059669' : '#e11d48',
                    fontWeight: '600',
                    marginBottom: '1rem'
                }}>
                    {status.message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Full Name</label>
                    <input name="name" required type="text" style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Email Address</label>
                    <input name="email" required type="email" style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }} />
                </div>
            </div>

            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Department</label>
                <select
                    name="department"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }}
                >
                    <option value="">General Inquiry</option>
                    <option value="Export Department">Export Department</option>
                    <option value="Local Representatives">Local Representatives</option>
                    <option value="Technical Support">Technical Support</option>
                </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Phone Number</label>
                    <input name="phone" type="tel" style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Subject</label>
                    <input name="subject" type="text" style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem' }} />
                </div>
            </div>
            <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Message</label>
                <textarea name="message" required rows={5} style={{ width: '100%', padding: '0.9rem', border: '1px solid var(--border)', borderRadius: '0.5rem', fontFamily: 'inherit' }}></textarea>
            </div>
            <button type="submit" disabled={isPending} className="btn btn-primary" style={{ padding: '1.1rem', fontSize: '1rem' }}>
                {isPending ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
}
