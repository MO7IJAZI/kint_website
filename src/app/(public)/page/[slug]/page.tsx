import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const page = await prisma.page.findUnique({
        where: { slug }
    });

    if (!page) {
        notFound();
    }

    return (
        <div>
            {/* Page Header */}
            <section style={{
                backgroundColor: 'var(--foreground)',
                padding: '6rem 0',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{page.title}</h1>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: '900px' }}>
                    <div
                        style={{
                            fontSize: '1.2rem',
                            lineHeight: '1.8',
                            color: 'var(--foreground)',
                            whiteSpace: 'pre-wrap'
                        }}
                        dangerouslySetInnerHTML={{ __html: page.content }}
                    />
                </div>
            </section>
        </div>
    );
}
