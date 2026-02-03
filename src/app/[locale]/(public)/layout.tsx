import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";

export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const productCategories = await prisma.category.findMany({
        where: { isActive: true, parentId: null },
        orderBy: [{ order: 'asc' }, { name: 'asc' }],
        select: {
            id: true,
            name: true,
            name_ar: true,
            slug: true,
            description: true,
            description_ar: true,
            children: {
                where: { isActive: true },
                orderBy: [{ order: 'asc' }, { name: 'asc' }],
                select: {
                    id: true,
                    name: true,
                    name_ar: true,
                    slug: true,
                }
            }
        }
    });

    return (
        <>
            <Header productCategories={productCategories} />
            <main style={{ minHeight: 'calc(100vh - 350px)', paddingTop: '80px' }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
