import { getCategories } from "@/actions/categoryActions";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Add New Product</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Fill in the details to add a new product to the catalog.</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
