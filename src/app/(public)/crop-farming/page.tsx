import prisma from "@/lib/prisma";
import CropGuidesList from "@/components/CropGuidesList";

export const dynamic = 'force-dynamic';

export default async function CropFarmingPage() {
    // Fetch all active crops from DB
    const crops = await prisma.crop.findMany({
        where: { isActive: true },
        orderBy: { name: 'asc' },
        select: {
            id: true,
            name: true,
            slug: true,
            metaTitle: true,
            description: true,
            image: true
        }
    });

    return <CropGuidesList initialCrops={crops} />;
}
