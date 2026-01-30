"use client";

import { useState } from "react";
import { createExpertArticle, updateExpertArticle } from "@/actions/expertArticleActions";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";

interface ExpertArticle {
    id: string;
    title: string;
    slug: string;
    category: string;
    order: number;
    image?: string | null;
    excerpt?: string | null;
    content: string | null;
    metaTitle?: string | null;
    metaDesc?: string | null;
    isPublished?: boolean;
}

export default function ExpertArticleForm({ initialData }: { initialData?: Partial<ExpertArticle> }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [content, setContent] = useState(initialData?.content || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [slug, setSlug] = useState(initialData?.slug || "");

    const generateSlug = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')        // Replace spaces with -
            .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
            .replace(/\-\-+/g, '-');     // Replace multiple - with single -
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!initialData) { // Only auto-generate for new articles or if desired
            const newSlug = generateSlug(e.target.value);
            setSlug(newSlug);
        }
    };

    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlug(generateSlug(e.target.value));
    };

    async function action(formData: FormData) {
        setIsPending(true);
        if (initialData?.id) {
            await updateExpertArticle(initialData.id, formData);
        } else {
            await createExpertArticle(formData);
        }
        setIsPending(false);
        router.push("/admin/expert-articles");
    }

    return (
        <form action={action} className="card" style={{ padding: '2rem', maxWidth: '1100px' }}>
            {/* Hidden inputs for controlled components */}
            <input type="hidden" name="content" value={content} />
            <input type="hidden" name="image" value={image} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Article Title</label>
                    <input name="title" defaultValue={initialData?.title} onChange={handleTitleChange} required className="input" style={{ width: '100%' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Slug</label>
                    <input name="slug" value={slug} onChange={handleSlugChange} required className="input" style={{ width: '100%' }} placeholder="url-friendly-slug" />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                    <select name="category" defaultValue={initialData?.category || 'arable'} className="input" style={{ width: '100%' }}>
                        <option value="arable">Arable crops</option>
                        <option value="fruit">Fruit crops</option>
                        <option value="vegetable">Vegetable crops</option>
                    </select>
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Display Order</label>
                    <input type="number" name="order" defaultValue={initialData?.order || 0} className="input" style={{ width: '100%' }} />
                </div>
            </div>

            <ImageUpload 
                label="Main Article Image"
                value={image}
                onChange={setImage}
            />

            <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Excerpt (Concise summary)</label>
                <textarea name="excerpt" defaultValue={initialData?.excerpt || ""} rows={3} className="input" style={{ width: '100%', fontFamily: 'inherit' }} />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <RichTextEditor 
                    label="Full Content"
                    value={content || ""}
                    onChange={setContent}
                />
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>SEO Settings</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Meta Title</label>
                        <input name="metaTitle" defaultValue={initialData?.metaTitle || ""} className="input" style={{ width: '100%' }} placeholder="SEO Title (optional)" />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>Meta Description</label>
                        <textarea name="metaDesc" defaultValue={initialData?.metaDesc || ""} rows={2} className="input" style={{ width: '100%', fontFamily: 'inherit' }} placeholder="SEO Description (optional)" />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', cursor: 'pointer' }}>
                    <input type="checkbox" name="isPublished" value="true" defaultChecked={initialData?.isPublished} />
                    Publish Immediately
                </label>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" disabled={isPending} className="btn btn-primary">
                    {isPending ? 'Saving...' : initialData ? 'Update Article' : 'Create Article'}
                </button>
                <button type="button" onClick={() => router.back()} className="btn btn-outline">Cancel</button>
            </div>
        </form>
    );
}
