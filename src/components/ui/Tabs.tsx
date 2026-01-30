"use client";

import { useState } from "react";

interface Tab {
    label: string;
    content: React.ReactNode;
}

export default function Tabs({ tabs }: { tabs: Tab[] }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div style={{ width: '100%', marginTop: '3rem' }}>
            <div style={{
                display: 'flex',
                borderBottom: '1px solid var(--border)',
                marginBottom: '2rem',
                gap: '2rem'
            }}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        style={{
                            padding: '1rem 0.5rem',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            borderBottom: activeTab === index ? '3px solid var(--primary)' : '3px solid transparent',
                            color: activeTab === index ? 'var(--primary)' : 'var(--muted-foreground)',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer'
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="animate-fade-in">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}
