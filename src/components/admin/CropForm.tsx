"use client";

import { useState } from "react";
import { createCrop, updateCrop } from "@/actions/cropActions";
import { useRouter } from "next/navigation";
import RichTextEditor from "./RichTextEditor";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";
import StagesEditor from "./StagesEditor";
import { generateSlug } from "@/lib/slugUtils";

interface CropProduct {
    id: string;
    name: string;
}

interface CropStageData {
    name: string;
    recommendation?: {
        products?: string[];
    };
}

interface CropRecommendedProduct {
    id: string;
}

interface CropInitialData {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    pdfUrl?: string | null;
    recommendedProducts?: CropRecommendedProduct[];
    stages?: CropStageData[];
}

interface StageFormData {
    name: string;
    products: string[];
}

interface CropFormProps {
    initialData?: CropInitialData;
    products?: CropProduct[];
}

export default function CropForm({ initialData, products = [] }: CropFormProps) {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [description, setDescription] = useState(initialData?.description || "");
    const [image, setImage] = useState(initialData?.image || "");
    const [pdfUrl, setPdfUrl] = useState(initialData?.pdfUrl || "");
    const [slug, setSlug] = useState(initialData?.slug || "");
    const [slugEdited, setSlugEdited] = useState(false);
    
    // Legacy simple product selection (might be redundant if stages are used, but good to keep for general recommendations)
    const [selectedProducts, setSelectedProducts] = useState<string[]>(
        initialData?.recommendedProducts?.map((p) => p.id) || []
    );

    // Stages
    const [stages, setStages] = useState<StageFormData[]>(
        initialData?.stages?.map((s) => ({
            name: s.name,
            products: s.recommendation?.products || []
        })) || []
    );

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
        formData.set("image", image);
        formData.set("pdfUrl", pdfUrl);
        formData.set("slug", slug);
        formData.set("productIds", JSON.stringify(selectedProducts));
        formData.set("stages", JSON.stringify(stages));

        if (initialData?.id) {
            await updateCrop(initialData.id, formData);
        } else {
            await createCrop(formData);
        }

        setIsPending(false);
        router.push("/admin/crops");
    }

    const toggleProduct = (productId: string) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    return (
        <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem', maxWidth: '1000px', backgroundColor: 'white' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>CROP NAME</label>
                    <input name="name" defaultValue={initialData?.name} onChange={handleNameChange} required className="input" style={{ width: '100%' }} placeholder="e.g. Winter Wheat" />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem' }}>URL SLUG</label>
                    <input value={slug} onChange={handleSlugChange} required className="input" style={{ width: '100%' }} placeholder="url-friendly-slug" />
                    <input type="hidden" name="slug" value={slug} />
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <ImageUpload
                    label="CROP REPRESENTATIVE IMAGE"
                    value={image}
                    onChange={setImage}
                />
                <FileUpload
                    label="TECHNICAL PDF CATALOG"
                    value={pdfUrl}
                    onChange={setPdfUrl}
                />
            </div>

            <div style={{ marginBottom: '2rem' }}>
                <RichTextEditor
                    label="DETAILED DESCRIPTION"
                    value={description}
                    onChange={setDescription}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <StagesEditor 
                    initialData={stages}
                    products={products}
                    onChange={setStages}
                />
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ display: 'block', marginBottom: '1rem', fontWeight: '700', fontSize: '0.9rem' }}>GENERAL RECOMMENDED PRODUCTS</label>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1rem',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '1.5rem',
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.75rem',
                    border: '1px solid var(--border)'
                }}>
                    {products.map(product => (
                        <label key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedProducts.includes(product.id)}
                                onChange={() => toggleProduct(product.id)}
                                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }}
                            />
                            {product.name}
                        </label>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '2.5rem' }}>
                <button type="submit" disabled={isPending} className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
                    {isPending ? 'PROCESSING...' : initialData ? 'UPDATE CROP GUIDE' : 'CREATE CROP GUIDE'}
                </button>
                <button type="button" onClick={() => router.back()} className="btn btn-outline" style={{ padding: '1rem 2rem' }}>CANCEL</button>
            </div>
        </form>
    );
}
