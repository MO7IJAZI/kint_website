/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    // Categories should already exist, but let's make sure we have the IDs
    const getCategory = async (slug: string) => {
        return await (prisma as any).category.findUnique({ where: { slug } });
    };

    const biostimulants = await getCategory('biostimulants');
    const fertilizers = await getCategory('foliar-fertilizers');
    const bioproducts = await getCategory('bioproducts');
    // const organic = await getCategory('organic-farming');

    const products = [
        {
            name: 'TYTANIT®',
            slug: 'tytanit',
            sku: 'KINT-BIO-001',
            shortDesc: 'Mineral growth and yield stimulant.',
            description: 'TYTANIT® is a unique mineral growth and yield stimulant that activates and reinforces natural physiological processes in plants. It significantly improves the efficiency of pollination and fertilization, enhances nutrient uptake, and strengthens plant resistance to stress.',
            benefits: 'Increases seed and fruit number, improves fruit weight, enhances photosynthesis intensity, and increases plant resistance to drought and cold.',
            composition: 'Titanium (Ti) content: 8.5 g/l (0.8%).',
            categoryId: biostimulants?.id,
            isFeatured: true,
            isOrganic: true,
        },
        {
            name: 'OPTYSIL®',
            slug: 'optysil',
            sku: 'KINT-BIO-002',
            shortDesc: 'Immunity stimulant with silicon.',
            description: 'OPTYSIL® is an innovative immunity stimulant based on easily absorbable silicon. It activates natural defense mechanisms of plants, strengthens cell walls, and reduces the negative effects of drought, high temperatures, and pests.',
            benefits: 'Enhanced resistance to abiotic and biotic stress, reduced water transpiration during drought, improved mechanical strength of tissues.',
            composition: 'Silicon (SiO2): 200 g/l (16.5%).',
            categoryId: biostimulants?.id,
            isFeatured: true,
            isOrganic: true,
        },
        {
            name: 'AMINOPRIM®',
            slug: 'aminoprim',
            sku: 'KINT-BIO-003',
            shortDesc: 'Natural amino-acid growth stimulant.',
            description: 'AMINOPRIM® is a high-quality protein hydrolysate containing a high concentration of natural amino acids and peptides. It acts as a powerful recovery stimulant for plants after stress conditions like frost, drought, or chemical damage.',
            benefits: 'Fast recovery after stress, improved efficiency of fertilization treatments, enhanced synthesis of proteins and chlorophyll.',
            composition: 'Amino acids total: 50%. Free amino acids: 15%.',
            categoryId: biostimulants?.id,
            isFeatured: false,
            isOrganic: true,
        },
        {
            name: 'PLONVIT® CEREALS',
            slug: 'plonvit-cereals',
            sku: 'KINT-FERT-001',
            shortDesc: 'Specialized NPK foliar fertilizer for cereals.',
            description: 'PLONVIT® CEREALS is a highly effective NPK liquid fertilizer for foliar application, enriched with a balanced set of micronutrients specifically matched to the requirements of wheat, barley, rye, and oats.',
            benefits: 'Balanced nutrition for high-yield technology, contains the proprietary INT technology for faster nutrient absorption.',
            composition: 'NPK 15-10-10 + micronutrients (Cu, Fe, Mn, Mo, Zn).',
            categoryId: fertilizers?.id,
            isFeatured: true,
            isOrganic: false,
        },
        {
            name: 'BACTIM® SOIL',
            slug: 'bactim-soil',
            sku: 'KINT-BIO-004',
            shortDesc: 'Microbial bioproduct for soil regeneration.',
            description: 'BACTIM® SOIL is a biological product containing specialized bacteria and fungi that accelerate the decomposition of crop residues, improve soil structure, and increase the availability of nutrients in the soil.',
            benefits: 'Faster breakdown of post-harvest residues, reduction of pathogen pressure in the soil, increased humus content.',
            composition: 'Microbial consortium (Bacillus spp., fungi).',
            categoryId: bioproducts?.id,
            isFeatured: true,
            isOrganic: true,
        }
    ];

    for (const p of products) {
        if (!p.categoryId) continue;

        await (prisma as any).product.upsert({
            where: { slug: p.slug },
            update: {
                sku: p.sku,
                shortDesc: p.shortDesc,
                description: p.description,
                benefits: p.benefits,
                composition: p.composition,
                categoryId: p.categoryId,
                isFeatured: p.isFeatured,
                isOrganic: p.isOrganic,
            },
            create: p
        });
    }

    console.log('Intermag products seeded successfully!');
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
