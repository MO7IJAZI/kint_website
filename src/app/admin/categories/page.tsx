"use client";

import { useState, useEffect, useCallback } from 'react';
import { getCategories, createCategory, deleteCategory } from '@/actions/categoryActions';
import { generateSlug } from '@/lib/slugUtils';

interface CategoryCount {
    products?: number;
}

interface Category {
    id: string;
    name: string;
    slug: string;
    parent?: { name: string } | null;
    _count?: CategoryCount;
}

export default function AdminCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [newCategorySlug, setNewCategorySlug] = useState("");
    const [slugEdited, setSlugEdited] = useState(false);

    const fetchCategories = useCallback(async () => {
        const data = await getCategories();
        setCategories(data);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const load = async () => {
            await fetchCategories();
        };
        load();
    }, [fetchCategories]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.set("slug", newCategorySlug);
        await createCategory(formData);
        setIsModalOpen(false);
        setSlugEdited(false);
        setNewCategorySlug("");
        void fetchCategories();
    }

    async function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this category?")) {
            setIsLoading(true);
            await deleteCategory(id);
            void fetchCategories();
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!slugEdited) {
            setNewCategorySlug(generateSlug(e.target.value));
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugEdited(true);
        setNewCategorySlug(generateSlug(e.target.value));
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Categories Management</h1>
                    <p style={{ color: 'var(--muted-foreground)' }}>Organize your products by managing categories.</p>
                </div>
                <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
                    Add New Category
                </button>
            </div>

            <div className="card" style={{ overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem 1.5rem' }}>Name</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Slug</th>
                            <th style={{ padding: '1rem 1.5rem' }}>Products</th>
                            <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <div style={{ fontWeight: '600' }}>{cat.name}</div>
                                    {cat.parent && <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Parent: {cat.parent.name}</div>}
                                </td>
                                <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem' }}>{cat.slug}</td>
                                <td style={{ padding: '1rem 1.5rem' }}>
                                    <span style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.75rem' }}>
                                    {cat._count?.products || 0} Products
                                    </span>
                                </td>
                                <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                    <button style={{ color: 'var(--primary)', fontWeight: '600', marginRight: '1rem' }}>Edit</button>
                                    <button onClick={() => handleDelete(cat.id)} style={{ color: '#ef4444', fontWeight: '600' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {!isLoading && categories.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--muted-foreground)' }}>
                                    No categories found. Click &quot;Add New Category&quot; to get started.
                                </td>
                            </tr>
                        )}
                        {isLoading && (
                            <tr>
                                <td colSpan={4} style={{ padding: '4rem', textAlign: 'center' }}>Loading...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
                }}>
                    <form onSubmit={handleSubmit} className="card" style={{ width: '500px', padding: '2.5rem', backgroundColor: 'white' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Add New Category</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category Name</label>
                                <input
                                    name="name" required type="text" placeholder="e.g. Biostimulants"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                    onChange={handleNameChange}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Slug (URL path)</label>
                                <input
                                    name="slug" required type="text" placeholder="e.g. biostimulants"
                                    value={newCategorySlug}
                                    onChange={handleSlugChange}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Parent Category (Optional)</label>
                                <select name="parentId" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}>
                                    <option value="">None</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                                <textarea
                                    name="description" rows={3}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Category</button>
                                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => {
                                    setIsModalOpen(false);
                                    setSlugEdited(false);
                                    setNewCategorySlug("");
                                }}>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
