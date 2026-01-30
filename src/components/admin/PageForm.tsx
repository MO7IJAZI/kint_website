"use client";

import { useState } from "react";
import { createPage, updatePage } from "@/actions/pageActions";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";

interface PageFormData {
    id: string;
    title: string;
    slug: string;
    content?: string | null;
    template?: string | null;
    isActive?: boolean;
}

export default function PageForm({ initialData }: { initialData?: Partial<PageFormData> }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [content, setContent] = useState(initialData?.content || "");
    const [slug, setSlug] = useState(initialData?.slug || "");

    // Auto-generate slug from title when title changes
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialData?.id || !initialData?.slug) {
            setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""));
        }
    };

    async function action(formData: FormData) {
        setIsPending(true);
        try {
            if (initialData?.id) {
                await updatePage(initialData.id, formData);
            } else {
                await createPage(formData);
            }
            router.push("/admin/pages");
        } catch (error) {
            console.error("Failed to save page:", error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={action} className="card" style={{ padding: '2rem', maxWidth: '900px' }}>
            {/* Hidden input for controlled component */}
            <input type="hidden" name="content" value={content} />

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Page Title</label>
                <input 
                    name="title" 
                    defaultValue={initialData?.title} 
                    onChange={handleTitleChange} 
                    required 
                    className="input" 
                    style={{ width: '100%' }} 
                    placeholder="Company Profile"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>URL Slug</label>
                    <input 
                        name="slug" 
                        value={slug} 
                        onChange={(e) => setSlug(e.target.value)} 
                        required 
                        className="input" 
                        style={{ width: '100%' }} 
                        placeholder="company-profile"
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Template</label>
                    <select name="template" defaultValue={initialData?.template || "default"} className="input" style={{ width: '100%' }}>
                        <option value="default">Default</option>
                        <option value="full-width">Full Width</option>
                        <option value="sidebar">With Sidebar</option>
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <RichTextEditor 
                    label="Page Content"
                    value={content}
                    onChange={setContent}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
                    <input type="checkbox" name="isActive" value="true" defaultChecked={initialData?.isActive !== false} />
                    Page is Active
                </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" disabled={isPending} className="btn btn-primary">
                    {isPending ? 'Saving...' : initialData ? 'Update Page' : 'Create Page'}
                </button>
                <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
            </div>
        </form>
    );
}
