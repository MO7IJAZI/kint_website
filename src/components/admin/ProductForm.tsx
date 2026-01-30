"use client";

import { useState } from "react";
import { createProduct, updateProduct } from "@/actions/productActions";
import { useRouter } from "next/navigation";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";
import DynamicTableEditor from "./DynamicTableEditor";
import DownloadsManager from "./DownloadsManager";
import { generateSlug } from "@/lib/slugUtils";

interface Category {
    id: string;
    name: string;
}

interface TableRow {
    [key: string]: string;
}

interface DownloadItem {
    id?: string;
    title: string;
    type: string;
    fileUrl: string;
}

interface ProductData {
    id: string;
    name: string;
    slug: string;
    categoryId?: string | null;
    sku?: string | null;
    shortDesc?: string | null;
    description?: string | null;
    benefits?: string | null;
    usage?: string | null;
    image?: string | null;
    compTable?: TableRow[];
    usageTable?: TableRow[];
    downloads?: DownloadItem[];
    metaTitle?: string | null;
    metaDesc?: string | null;
    isFeatured?: boolean;
    isOrganic?: boolean;
}

export default function ProductForm({ categories, initialData }: { categories: Category[], initialData?: Partial<ProductData> }) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    
    // Rich Text State
    const [description, setDescription] = useState(initialData?.description || "");
    const [benefits, setBenefits] = useState(initialData?.benefits || "");
    const [usage, setUsage] = useState(initialData?.usage || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [slugEdited, setSlugEdited] = useState(false);

    // Complex Data State
    const [compTable, setCompTable] = useState<TableRow[]>(initialData?.compTable || []);
    const [usageTable, setUsageTable] = useState<TableRow[]>(initialData?.usageTable || []);
    const [downloads, setDownloads] = useState<DownloadItem[]>(initialData?.downloads || []);

    // Auto-generate slug from name when name changes and slug hasn't been manually edited
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!slugEdited && !initialData?.id) {
            setSlug(generateSlug(e.target.value));
        }
    };

    // Allow manual slug editing
    const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSlugEdited(true);
        setSlug(generateSlug(e.target.value));
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        formData.set("description", description);
        formData.set("benefits", benefits);
        formData.set("usage", usage);
        formData.set("image", image);
        formData.set("slug", slug);
        
        // Serialize complex data
        formData.set("compTable", JSON.stringify(compTable));
        formData.set("usageTable", JSON.stringify(usageTable));
        formData.set("downloads", JSON.stringify(downloads));

        if (initialData?.id) {
            await updateProduct(initialData.id, formData);
        } else {
            await createProduct(formData);
        }

        setIsPending(false);
        router.push("/admin/products");
    }

    return (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem', maxWidth: '1000px', backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>PRODUCT NAME</label>
                    <input name="name" defaultValue={initialData?.name} onChange={handleNameChange} required className="input" style={{ width: '100%' }} />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>URL SLUG</label>
                    <input value={slug} onChange={handleSlugChange} required className="input" style={{ width: '100%' }} placeholder="url-friendly-slug" />
                    <input type="hidden" name="slug" value={slug} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', marginBottom: '2.5rem' }}>
                <ImageUpload
                    label="PRODUCT IMAGE"
                    value={image}
                    onChange={setImage}
                />
                
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>CATEGORY</label>
                    <select name="categoryId" defaultValue={initialData?.categoryId || ""} required className="input" style={{ width: '100%' }}>
                        <option value="">Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                    
                    <div style={{ marginTop: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.85rem' }}>SKU / CODE</label>
                        <input name="sku" defaultValue={initialData?.sku || ""} className="input" style={{ width: '100%' }} />
                    </div>
                </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '700', fontSize: '0.85rem' }}>MISSION / SUMMARY</label>
                <textarea
                    name="shortDesc"
                    defaultValue={initialData?.shortDesc || ""}
                    rows={3}
                    className="input"
                    style={{ width: '100%', fontFamily: 'inherit' }}
                    placeholder="Briefly describe the product's primary purpose..."
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <RichTextEditor
                    label="BENEFITS (BULLETED LIST)"
                    value={benefits}
                    onChange={setBenefits}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <RichTextEditor
                    label="HOW IT WORKS / MECHANISM"
                    value={description}
                    onChange={setDescription}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <DynamicTableEditor
                    label="COMPOSITION (NUTRIENTS)"
                    columns={[
                        { key: "name", label: "Ingredient / Nutrient", width: "60%" },
                        { key: "value", label: "Value (e.g. 10% w/w)", width: "40%" }
                    ]}
                    initialData={compTable}
                    onChange={setCompTable}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <RichTextEditor
                    label="APPLICATION INSTRUCTIONS"
                    value={usage}
                    onChange={setUsage}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <DynamicTableEditor
                    label="DOSAGE TABLE (CROP SPECIFIC)"
                    columns={[
                        { key: "crop", label: "Crop", width: "40%" },
                        { key: "stage", label: "Application Stage", width: "40%" },
                        { key: "dosage", label: "Dosage", width: "20%" }
                    ]}
                    initialData={usageTable}
                    onChange={setUsageTable}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <DownloadsManager 
                    initialData={downloads}
                    onChange={setDownloads}
                />
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', marginBottom: '2.5rem' }}>
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

            <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '2.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" name="isFeatured" value="true" defaultChecked={initialData?.isFeatured} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                    FEATURE ON HOMEPAGE
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input type="checkbox" name="isOrganic" value="true" defaultChecked={initialData?.isOrganic} style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                    ORGANIC CERTIFIED
                </label>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
                <button type="submit" disabled={isPending} className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                    {isPending ? 'PROCESSING...' : initialData ? 'UPDATE PRODUCT' : 'CREATE PRODUCT'}
                </button>
                <button type="button" onClick={() => router.back()} className="btn btn-outline" style={{ padding: '1rem 2rem' }}>CANCEL</button>
            </div>
        </form>
    );
}
