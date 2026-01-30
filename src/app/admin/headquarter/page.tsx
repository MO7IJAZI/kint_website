'use client';

import { useState, useEffect } from 'react';

export default function HeadquarterAdminPage() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    address: '',
    latitude: '',
    longitude: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHeadquarter();
  }, []);

  const fetchHeadquarter = async () => {
    try {
      const res = await fetch('/api/headquarter');
      const data = await res.json();
      if (data && !data.error && Object.keys(data).length > 0) {
        setFormData({
          title: data.title || 'Company Headquarter',
          content: data.content || '',
          address: data.address || '',
          latitude: data.latitude === null || data.latitude === undefined ? '' : String(data.latitude),
          longitude: data.longitude === null || data.longitude === undefined ? '' : String(data.longitude),
        });
      }
    } catch (error) {
      console.error('Error fetching headquarter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/headquarter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert('Headquarter information saved successfully');
      } else {
        alert('Failed to save information');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving information');
    } finally {
      setSaving(false);
    }
  };

  const getEmbedUrl = () => {
    let q = '';
    if (formData.latitude && formData.longitude) {
      q = `${formData.latitude},${formData.longitude}`;
    } else if (formData.address) {
      q = formData.address;
    }
    
    if (!q) return '';
    return `https://maps.google.com/maps?q=${encodeURIComponent(q)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  if (loading) return <div>Loading...</div>;

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--border)',
    borderRadius: '0.5rem',
    fontFamily: 'inherit'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Company Headquarter</h1>
        <p style={{ color: 'var(--muted-foreground)' }}>Manage content and map location for the headquarter page.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start' }}>
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem' }}>
          <div>
            <label style={labelStyle}>Page Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={inputStyle}
              placeholder="Company Headquarter"
            />
          </div>

          <div>
            <label style={labelStyle}>Content / Description</label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              style={{ ...inputStyle, minHeight: '150px' }}
              placeholder="Enter details about the headquarter..."
            />
          </div>

          <div>
            <label style={labelStyle}>Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={inputStyle}
              placeholder="e.g. 123 Farming Lane, Crop City"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                style={inputStyle}
                placeholder="e.g. 40.7128"
              />
            </div>
            <div>
              <label style={labelStyle}>Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                style={inputStyle}
                placeholder="e.g. -74.0060"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', opacity: saving ? 0.7 : 1 }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Map Preview</h2>
          <div className="card" style={{ overflow: 'hidden', height: '400px', position: 'relative' }}>
            {getEmbedUrl() ? (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={getEmbedUrl()}
                allowFullScreen
                title="Company Headquarter Location"
              ></iframe>
            ) : (
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--muted-foreground)' 
              }}>
                Enter address or coordinates to see map
              </div>
            )}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>
            Note: The map updates automatically when you enter an address or coordinates.
            Coordinates take precedence over address.
          </p>
        </div>
      </div>
    </div>
  );
}
