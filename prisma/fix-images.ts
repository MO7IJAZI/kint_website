import { PrismaClient, Prisma } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Replacing dead image links with high-reliability URLs...');

    // We update crops by slug to fix the 404/Timeout errors
    const fixes = [
        // Arable
        { slug: 'wheat-spring-wheat', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=800' },
        { slug: 'wheat-winter-wheat', image: 'https://images.unsplash.com/photo-1495107336281-19910aff6cc7?auto=format&fit=crop&q=80&w=800' },
        { slug: 'oilseed-rape-spring', image: 'https://images.unsplash.com/photo-1543881647-7988352614a9?auto=format&fit=crop&q=80&w=800' },
        { slug: 'oilseed-rape-winter', image: 'https://images.unsplash.com/photo-1543881647-7988352614a9?auto=format&fit=crop&q=80&w=800' },
        { slug: 'maize', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=800' },
        { slug: 'soybean', image: 'https://images.unsplash.com/photo-1549413247-4959db6358c5?auto=format&fit=crop&q=80&w=800' },
        { slug: 'rye-spring-rye', image: 'https://images.unsplash.com/photo-1530514151206-81cf90df9909?auto=format&fit=crop&q=80&w=800' },
        { slug: 'rye-winter-rye', image: 'https://images.unsplash.com/photo-1530514151206-81cf90df9909?auto=format&fit=crop&q=80&w=800' },

        // Vegetables
        { slug: 'broccoli', image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a05?auto=format&fit=crop&q=80&w=800' },
        { slug: 'cauliflower', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ec1?auto=format&fit=crop&q=80&w=800' },
        { slug: 'cucumber-field', image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=800' },
        { slug: 'cucumber-fertigated', image: 'https://images.unsplash.com/photo-1590165482129-1b8b27698780?auto=format&fit=crop&q=80&w=800' },
        { slug: 'pea', image: 'https://images.unsplash.com/photo-1515471204579-f30b050d0611?auto=format&fit=crop&q=80&w=800' },
        { slug: 'bean', image: 'https://images.unsplash.com/photo-1444858291040-58f753a8def9?auto=format&fit=crop&q=80&w=800' },
        { slug: 'brussels-sprouts', image: 'https://images.unsplash.com/photo-1506466010722-395ee2befaf0?auto=format&fit=crop&q=80&w=800' },

        // Fruits
        { slug: 'pear', image: 'https://images.unsplash.com/photo-1514756331096-242f390efe22?auto=format&fit=crop&q=80&w=800' },
        { slug: 'peach', image: 'https://images.unsplash.com/photo-1594236052185-1d6eb7504629?auto=format&fit=crop&q=80&w=800' },
        { slug: 'currant', image: 'https://images.unsplash.com/photo-1524185962737-ca7cd028a12c?auto=format&fit=crop&q=80&w=800' },
    ];

    for (const fix of fixes) {
        await prisma.crop.updateMany({
            where: { slug: fix.slug },
            data: { image: fix.image }
        });
    }

    // Comprehensive fallback for any remaining issues: ensure no nulls in required viewing
    await prisma.crop.updateMany({
        where: { image: null },
        data: { image: 'https://images.unsplash.com/photo-1495107336281-19910aff6cc7?auto=format&fit=crop&q=80&w=800' }
    });

    console.log('Image links fixed successfully!');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
