import { getInquiries } from "@/actions/inquiryActions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminInquiries() {
    const inquiries = await getInquiries();

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Contact Inquiries</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Review customer messages and inquiries.</p>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Date</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Sender</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Subject</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Status</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.map((iq) => (
                            <tr key={iq.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>
                                    {new Date(iq.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{iq.name}</div>
                                    <div style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>{iq.email}</div>
                                </td>
                                <td style={{ padding: '1rem 1.5rem' }}>{iq.subject || "No Subject"}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        fontSize: '0.75rem',
                                        fontWeight: '700',
                                        backgroundColor: iq.isRead ? '#f3f4f6' : '#eff6ff',
                                        color: iq.isRead ? '#6b7280' : '#2563eb'
                                    }}>
                                        {iq.isRead ? "Read" : "New"}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <button style={{ color: 'var(--primary)', fontWeight: '600', marginRight: '1rem' }}>View</button>
                                    <DeleteButton id={iq.id} type="inquiry" />
                                </td>
                            </tr>
                        ))}
                        {inquiries.length === 0 && (
                            <tr>
                                <td colSpan={5} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No messages received yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
