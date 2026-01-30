export default function AdminSettings() {
    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Global Settings</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Manage site-wide configurations and institutional contact info.</p>
            </div>

            <div className="card" style={{ padding: '2rem', maxWidth: '800px' }}>
                <form style={{ display: 'grid', gap: '1.5rem' }}>
                    <div>
                        <h3 style={{ marginBottom: '1.5rem' }}>General Information</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Site Name</label>
                                <input className="input" defaultValue="KINT Group" style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Contact Email</label>
                                <input className="input" defaultValue="info@kint-group.com" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                        <h3 style={{ marginBottom: '1.5rem' }}>Social Media</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>LinkedIn</label>
                                <input className="input" placeholder="https://linkedin.com/company/..." style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>YouTube</label>
                                <input className="input" placeholder="https://youtube.com/c/..." style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <button type="button" className="btn btn-primary">Save Settings</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
