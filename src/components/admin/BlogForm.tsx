"use client";

import { useState } from "react";
import { createBlogPost, updateBlogPost } from "@/actions/blogActions";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import { generateSlug } from "@/lib/slugUtils";

interface BlogPostFormData {
    id: string;
    title: string;
    slug: string;
    author: string;
    tags?: string | null;
    excerpt?: string | null;
    content?: string | null;
    image?: string | null;
    metaTitle?: string | null;
    metaDesc?: string | null;
    isPublished?: boolean;
}

export default function BlogForm({ initialData }: { initialData?: Partial<BlogPostFormData> }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [content, setContent] = useState(initialData?.content || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [slugEdited, setSlugEdited] = useState(false);

    // Parse initial tags if they exist
    const defaultTags = initialData?.tags 
        ? (() => {
            try {
                return JSON.parse(initialData.tags).join(', ');
            } catch {
                return initialData.tags;
            }
        })()
        : "";

    // Auto-generate slug from title when title changes and slug hasn't been manually edited
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!slugEdited && !initialData?.id) {
            setSlug(generateSlug(e.target.value));
        }
    };

    // Allow manual slug editing
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugEdited(true);
        setSlug(generateSlug(e.target.value));
    };

    async function action(formData: FormData) {
        setIsPending(true);
        try {
            if (initialData?.id) {
                await updateBlogPost(initialData.id, formData);
            } else {
                await createBlogPost(formData);
            }
            router.push("/admin/blog");
        } catch (error) {
            console.error("Failed to save blog post:", error);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <form action={action} className="card" style={{ padding: '2rem', maxWidth: '900px' }}>
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
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Author</label>
                    <input name="author" defaultValue={initialData?.author} required className="input" style={{ width: '100%' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Tags</label>
                    <input name="tags" defaultValue={defaultTags} className="input" style={{ width: '100%' }} placeholder="Agriculture, Wheat, Tips (comma separated)" />
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
                    value={content}
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
