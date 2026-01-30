import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let stats = {
        products: 0,
        categories: 0,
        blogs: 0,
        inquiries: 0,
        crops: 0,
        expertArticles: 0,
        jobOffers: 0,
        jobApplications: 0,
        certificates: 0,
        awards: 0,
        headquarter: 0,
    };

    try {
        const [pCount, cCount, bCount, iCount, crCount, eaCount, joCount, jaCount, certCount, awardCount, hqCount] = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.blogPost.count(),
            prisma.contactSubmission.count(),
            prisma.crop.count(),
            prisma.expertArticle.count(),
            prisma.jobOffer.count(),
            prisma.jobApplication.count(),
            prisma.certificate.count(),
            prisma.award.count(),
            prisma.headquarter.count(),
        ]);
        stats = { 
            products: pCount, 
            categories: cCount, 
            blogs: bCount, 
            inquiries: iCount,
            crops: crCount,
            expertArticles: eaCount,
            jobOffers: joCount,
            jobApplications: jaCount,
            certificates: certCount,
            awards: awardCount,
            headquarter: hqCount,
        };
    } catch {
        console.log("Database not connected yet, showing empty stats");
    }

    const statCards = [
        { label: 'Total Products', value: stats.products, icon: '📦', color: '#10b981', href: '/admin/products' },
        { label: 'Categories', value: stats.categories, icon: '📁', color: '#3b82f6', href: '/admin/categories' },
        { label: 'Crop Guides', value: stats.crops, icon: '🌾', color: '#22c55e', href: '/admin/crops' },
        { label: 'Expert Articles', value: stats.expertArticles, icon: '🎓', color: '#8b5cf6', href: '/admin/expert-articles' },
        { label: 'Blog Posts', value: stats.blogs, icon: '📝', color: '#f59e0b', href: '/admin/blog' },
        { label: 'Job Offers', value: stats.jobOffers, icon: '💼', color: '#ec4899', href: '/admin/career' },
        { label: 'New Applications', value: stats.jobApplications, icon: '📬', color: '#ef4444', href: '/admin/applications' },
        { label: 'Certificates', value: stats.certificates, icon: '🏆', color: '#f97316', href: '/admin/certificates' },
        { label: 'Awards', value: stats.awards, icon: '🎖️', color: '#eab308', href: '/admin/awards' },
        { label: 'Company Headquarter', value: stats.headquarter, icon: '🏢', color: '#14b8a6', href: '/admin/headquarter' },
        { label: 'Contact Inquiries', value: stats.inquiries, icon: '📧', color: '#06b6d4', href: '/admin/inquiries' },
    ];

    return (
        <div className="admin-dashboard">
            <div className="page-header">
                <div>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back to the KINT Management Portal</p>
                </div>
                <div className="header-actions">
                    <Link href="/" target="_blank" className="btn-view-site">
                        🌐 View Website
                    </Link>
                </div>
            </div>

            <div className="stats-grid">
                {statCards.map((stat, index) => (
                    <Link key={index} href={stat.href} className="stat-card">
                        <div className="stat-icon" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <p>{stat.label}</p>
                            <h3>{stat.value}</h3>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="dashboard-grid">
                <div className="card quick-actions">
                    <h3>Quick Actions</h3>
                    <div className="actions-grid">
                        <Link href="/admin/products/new" className="action-btn">
                            <span className="action-icon">📦</span>
                            <span>Add Product</span>
                        </Link>
                        <Link href="/admin/crops/new" className="action-btn">
                            <span className="action-icon">🌾</span>
                            <span>Add Crop Guide</span>
                        </Link>
                        <Link href="/admin/expert-articles/new" className="action-btn">
                            <span className="action-icon">🎓</span>
                            <span>Add Article</span>
                        </Link>
                        <Link href="/admin/blog/new" className="action-btn">
                            <span className="action-icon">📝</span>
                            <span>Write Blog Post</span>
                        </Link>
                        <Link href="/admin/career" className="action-btn">
                            <span className="action-icon">💼</span>
                            <span>Manage Jobs</span>
                        </Link>
                        <Link href="/admin/pages/new" className="action-btn">
                            <span className="action-icon">📄</span>
                            <span>Create Page</span>
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <h3>Recent Inquiries</h3>
                    <div className="inquiries-list">
                        {stats.inquiries > 0 ? (
                            <Link href="/admin/inquiries" className="inquiry-item">
                                <span className="inquiry-count">{stats.inquiries}</span>
                                <span>unread inquiries</span>
                                <span className="arrow">→</span>
                            </Link>
                        ) : (
                            <p className="empty-message">No new inquiries</p>
                        )}
                    </div>
                </div>

                <div className="card">
                    <h3>Job Applications</h3>
                    <div className="inquiries-list">
                        {stats.jobApplications > 0 ? (
                            <Link href="/admin/applications" className="inquiry-item">
                                <span className="inquiry-count">{stats.jobApplications}</span>
                                <span>new applications</span>
                                <span className="arrow">→</span>
                            </Link>
                        ) : (
                            <p className="empty-message">No applications yet</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
