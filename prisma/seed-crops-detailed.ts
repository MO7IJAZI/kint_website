/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Finalizing Crop Catalog with local image mapping...');
    await (prisma as any).cropStage.deleteMany({});
    await (prisma as any).crop.deleteMany({});

    const cropGroups = [
        {
            name: 'ARABLE CROPS',
            crops: [
                { name: 'WHEAT – SPRING WHEAT', slug: 'wheat-spring-wheat', image: '/images/crops/1.jpg' },
                { name: 'WHEAT – WINTER WHEAT', slug: 'wheat-winter-wheat', image: '/images/crops/2.jpg' },
                { name: 'TRITICALE – SPRING TRITICALE', slug: 'triticale-spring-triticale', image: '/images/crops/3.jpg' },
                { name: 'TRITICALE – WINTER TRITICALE', slug: 'triticale-winter-triticale', image: '/images/crops/4.jpg' },
                { name: 'RYE – SPRING RYE', slug: 'rye-spring-rye', image: '/images/crops/5.jpg' },
                { name: 'RYE – WINTER RYE', slug: 'rye-winter-rye', image: '/images/crops/6.jpg' },
                { name: 'OAT', slug: 'oat', image: '/images/crops/7.jpg' },
                { name: 'BARLEY', slug: 'barley', image: '/images/crops/8.jpg' },
                { name: 'OILSEED RAPE – SPRING OILSEED RAPE', slug: 'oilseed-rape-spring', image: '/images/crops/9.jpg' },
                { name: 'OILSEED RAPE – WINTER OILSEED RAPE', slug: 'oilseed-rape-winter', image: '/images/crops/10.jpg' },
                { name: 'MAIZE', slug: 'maize', image: '/images/crops/11.jpg' },
                { name: 'SOYBEAN', slug: 'soybean', image: '/images/crops/12.jpg' },
                { name: 'POTATO', slug: 'potato-arable', image: '/images/crops/13.jpg' },
                { name: 'SUGAR BEET', slug: 'sugar-beet', image: '/images/crops/14.jpg' }
            ]
        },
        {
            name: 'VEGETABLE CROPS',
            crops: [
                { name: 'CARROT', slug: 'carrot', image: '/images/crops/16.jpg' },
                { name: 'PARSNIP', slug: 'parsnip', image: '/images/crops/17.jpg' },
                { name: 'PARSLEY', slug: 'parsley', image: '/images/crops/18.jpg' },
                { name: 'POTATO', slug: 'potato-veg', image: '/images/crops/19.jpg' },
                { name: 'BEETROOT', slug: 'beetroot', image: '/images/crops/20.jpg' },
                { name: 'RADISH', slug: 'radish', image: '/images/crops/21.jpg' },
                { name: 'KOHLRABI', slug: 'kohlrabi', image: '/images/crops/22.jpg' },
                { name: 'Green/white head cabbage', slug: 'cabbage-white', image: '/images/crops/23.jpg' },
                { name: 'Red head cabbage', slug: 'cabbage-red', image: '/images/crops/24.jpg' },
                { name: 'Savoy cabbage', slug: 'cabbage-savoy', image: '/images/crops/25.jpg' },
                { name: 'Chinese cabbage', slug: 'cabbage-chinese', image: '/images/crops/26.jpg' },
                { name: 'Brussels sprouts', slug: 'brussels-sprouts', image: '/images/crops/27.jpg' },
                { name: 'KALE', slug: 'kale', image: '/images/crops/28.jpg' },
                { name: 'BROCCOLI', slug: 'broccoli', image: '/images/crops/29.jpg' },
                { name: 'CAULIFLOWER', slug: 'cauliflower', image: '/images/crops/30.jpg' },
                { name: 'LEEK', slug: 'leek', image: '/images/crops/31.jpg' },
                { name: 'GARLIC', slug: 'garlic', image: '/images/crops/32.jpg' },
                { name: 'TOMATO FOR PROCESSING', slug: 'tomato-processing', image: '/images/crops/33.jpg' },
                { name: 'TOMATO FRESH MARKET', slug: 'tomato-fresh', image: '/images/crops/34.jpg' },
                { name: 'PEPPER', slug: 'pepper', image: '/images/crops/35.jpg' },
                { name: 'BEAN', slug: 'bean', image: '/images/crops/36.jpg' },
                { name: 'PEA', slug: 'pea', image: '/images/crops/37.jpg' },
                { name: 'Onion', slug: 'onion', image: '/images/crops/38.jpg' },
                { name: 'CUCUMBER – field', slug: 'cucumber-field', image: '/images/crops/39.jpg' },
                { name: 'CUCUMBER – FERTIGATED', slug: 'cucumber-fertigated', image: '/images/crops/40.jpg' }
            ]
        },
        {
            name: 'FRUIT CROPS',
            crops: [
                { name: 'APPLE', slug: 'apple', image: '/images/crops/41.jpg' },
                { name: 'STRAWBERRY', slug: 'strawberry', image: '/images/crops/42.jpg' },
                { name: 'PEAR', slug: 'pear', image: '/images/crops/43.jpg' },
                { name: 'PLUM TREE – ORCHARDS WITHOUT FERTIGATION', slug: 'plum-no-fert', image: '/images/crops/44.jpg' },
                { name: 'APRICOT TREE', slug: 'apricot', image: '/images/crops/45.jpg' },
                { name: 'PEACH TREE', slug: 'peach', image: '/images/crops/46.jpg' },
                { name: 'NECTARINE TREE', slug: 'nectarine', image: '/images/crops/47.jpg' },
                { name: 'Cherry (sweet cherry) - without fertigation', slug: 'cherry-sweet-no-fert', image: '/images/crops/48.jpg' },
                { name: 'Cherry (sweet cherry) - fertigated', slug: 'cherry-sweet-fert', image: '/images/crops/49.jpg' },
                { name: 'CHERRY (SOUR CHERRY TREE)', slug: 'cherry-sour', image: '/images/crops/50.jpg' },
                { name: 'BLUEBERRY', slug: 'blueberry', image: '/images/crops/51.jpg' },
                { name: 'CURRANT', slug: 'currant', image: '/images/crops/52.jpg' },
                { name: 'RASPBERRY ON ONE-YEAR-OLD CANES', slug: 'raspberry-1yr', image: '/images/crops/53.jpg' },
                { name: 'RASPBERRY ON TWO-YEAR-OLD CANES', slug: 'raspberry-2yr', image: '/images/crops/54.jpg' }
            ]
        }
    ];

    for (const group of cropGroups) {
        for (const cropData of group.crops) {
            const crop = await (prisma as any).crop.create({
                data: {
                    name: cropData.name,
                    slug: cropData.slug,
                    image: cropData.image,
                    description: `Professional fertilization and biostimulation protocol for high-yield ${cropData.name}. Optimized for modern agricultural standards.`,
                    metaTitle: group.name,
                    isActive: true
                },
            });

            // Add standard stages
            const stages = ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'];
            let order = 1;
            for (const stageName of stages) {
                await (prisma as any).cropStage.create({
                    data: {
                        name: stageName,
                        order: order++,
                        cropId: crop.id,
                        recommendation: {}
                    }
                });
            }
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
