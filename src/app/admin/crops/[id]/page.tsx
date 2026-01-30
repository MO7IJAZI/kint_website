import { getCropById } from "@/actions/cropActions";
import { getProducts } from "@/actions/productActions";
import CropForm from "@/components/admin/CropForm";
import { notFound } from "next/navigation";

interface CropStage {
    id: string;
    name: string;
    recommendation?: Record<string, unknown>;
}

export default async function EditCropPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Parallel fetching for better performance
    const [crop, products] = await Promise.all([
        getCropById(id),
        getProducts()
    ]);

    if (!crop) {
        notFound();
    }

    // Transform crop data to match CropInitialData type
    const transformedCrop = {
        ...crop,
        stages: (crop.stages as CropStage[] | undefined)?.map((s) => ({
            name: s.name,
            recommendation: s.recommendation && typeof s.recommendation === 'object' 
                ? s.recommendation 
                : undefined
        })) || []
    };

    return (
        <div style={{ padding: '0 2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Edit Crop <span style={{ color: 'var(--primary)' }}>Guide</span></h1>
                <nav style={{ fontSize: '0.875rem', opacity: 0.6 }}>
                    ADMIN / CROPS / {crop.name.toUpperCase()}
                </nav>
            </div>

            <CropForm initialData={transformedCrop} products={products} />
        </div>
    );
}
