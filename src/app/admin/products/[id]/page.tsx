import { getCategories } from "@/actions/categoryActions";
import { getProductById } from "@/actions/productActions";
import ProductForm from "@/components/admin/ProductForm";
import { notFound } from "next/navigation";

interface TableRow {
    [key: string]: string;
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const [categories, product] = await Promise.all([
        getCategories(),
        getProductById(id)
    ]);

    if (!product) {
        notFound();
    }

    // Transform product data to handle JsonValue types
    const transformedProduct = {
        ...product,
        compTable: Array.isArray(product.compTable) ? (product.compTable as TableRow[]) : undefined,
        usageTable: Array.isArray(product.usageTable) ? (product.usageTable as TableRow[]) : undefined,
    };

    return (
        <div>
            <div style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Edit Product</h1>
                <p style={{ color: 'var(--muted-foreground)' }}>Update the product details below.</p>
            </div>

            <ProductForm categories={categories} initialData={transformedProduct} />
        </div>
    );
}
