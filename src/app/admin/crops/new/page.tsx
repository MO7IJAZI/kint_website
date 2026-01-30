import { getProducts } from "@/actions/productActions";
import CropForm from "@/components/admin/CropForm";

export default async function NewCropPage() {
    const products = await getProducts();

    return (
        <div style={{ padding: '0 2rem' }}>
            <div style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create New <span style={{ color: 'var(--primary)' }}>Crop Guide</span></h1>
                <nav style={{ fontSize: '0.875rem', opacity: 0.6 }}>
                    ADMIN / CROPS / CREATE NEW
                </nav>
            </div>

            <CropForm products={products} />
        </div>
    );
}
