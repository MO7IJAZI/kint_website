/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await prisma.admin.upsert({
        where: { email: 'admin@kint.com' },
        update: {},
        create: {
            email: 'admin@kint.com',
            password: hashedPassword,
            name: 'KINT Admin',
            role: 'super_admin',
        },
    });

    console.log({ admin });

    // 1. Create Categories from the plan
    const categories = [
        { name: 'Biostimulants', slug: 'biostimulants' },
        { name: 'Activators', slug: 'activators' },
        { name: 'Bioproducts', slug: 'bioproducts' },
        { name: 'Foliar Fertilizers', slug: 'foliar-fertilizers' },
        { name: 'Seed Fertilizers', slug: 'seed-fertilizers' },
        { name: 'Fertilizers for Fertigation', slug: 'fertigation' },
        { name: 'Tank Mix Additives', slug: 'tank-mix-additives' },
        { name: 'Organic Farming', slug: 'organic-farming' },
    ];

    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
        const createdCat = await prisma.category.upsert({
            where: { slug: cat.slug },
            update: {},
            create: {
                name: cat.name,
                slug: cat.slug,
                isActive: true,
            },
        });
        categoryMap[cat.slug] = createdCat.id;
    }

    // 2. Create Products from intermag.eu catalog
    const products = [
        {
            name: 'TYTANIT®',
            slug: 'tytanit',
            sku: 'KINT-BIO-001',
            shortDesc: 'Mineral growth and yield stimulant.',
            description: 'TYTANIT® is a unique mineral growth and yield stimulant that activates and reinforces natural physiological processes in plants. It significantly improves the efficiency of pollination and fertilization, enhances nutrient uptake, and strengthens plant resistance to stress.',
            benefits: 'Increases seed and fruit number, improves fruit weight, enhances photosynthesis intensity, and increases plant resistance to drought and cold.',
            composition: 'Titanium (Ti) content: 8.5 g/l (0.8%).',
            categoryId: categoryMap['biostimulants'],
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
            categoryId: categoryMap['biostimulants'],
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
            categoryId: categoryMap['biostimulants'],
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
            categoryId: categoryMap['foliar-fertilizers'],
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
            categoryId: categoryMap['bioproducts'],
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

    // 3. Create initial Crops
    const crops = [
        { name: 'Cereals', slug: 'cereals' },
        { name: 'Oilseed Rape', slug: 'oilseed-rape' },
        { name: 'Maize', slug: 'maize' },
        { name: 'Potatoes', slug: 'potatoes' },
    ];

    for (const cropData of crops) {
        const crop = await (prisma as any).crop.upsert({
            where: { slug: cropData.slug },
            update: {},
            create: {
                name: cropData.name,
                slug: cropData.slug,
                isActive: true,
            },
        });

        // Add dummy stages if not present
        const stages = ['Sowing', 'Vegetative Growth', 'Flowering', 'Ripening'];
        const existingStages = await (prisma as any).cropStage.findMany({ where: { cropId: crop.id } });

        if (existingStages.length === 0) {
            for (let i = 0; i < stages.length; i++) {
                await (prisma as any).cropStage.create({
                    data: {
                        name: stages[i],
                        order: i,
                        cropId: crop.id,
                    }
                });
            }
        }
    }

    // 4. Create Institutional Pages
    const pages = [
        {
            title: 'Company Profile',
            slug: 'company-profile',
            content: '<h2>Our Identity</h2><p>Founded in 1988, KINT Group has evolved from a local laboratory into a global powerhouse in agricultural biotechnology.</p>'
        },
        {
            title: 'Production Plants',
            slug: 'production-plants',
            content: '<h2>High-Tech Manufacturing</h2><p>Our state-of-the-art facilities in Poland feature fully automated production lines for both liquid and granular preparations.</p>'
        },
        {
            title: 'Logistics Centre',
            slug: 'logistics-centre',
            content: '<h2>Global Reach</h2><p>Our centralized logistics hub ensures that KINT solutions reach farmers in over 60 countries with precision and speed.</p>'
        },
        {
            title: 'Certificates & Quality',
            slug: 'certificates',
            content: '<h2>Quality Assurance</h2><p>KINT products are manufactured under strict ISO 9001 and ISO 14001 standards, ensuring maximum safety for crops and consumers.</p>'
        },
    ];

    for (const page of pages) {
        await (prisma as any).page.upsert({
            where: { slug: page.slug },
            update: {},
            create: page,
        });
    }

    // 5. Create Expert Articles
    const expertArticlesPath = path.join(__dirname, 'data', 'expert-articles.json');
    let expertArticles = [];
    
    if (fs.existsSync(expertArticlesPath)) {
        const data = fs.readFileSync(expertArticlesPath, 'utf-8');
        expertArticles = JSON.parse(data);
    }

    for (const article of expertArticles) {
        await (prisma as any).expertArticle.upsert({
            where: { slug: article.slug },
            update: {
                title: article.title,
                content: article.content,
                excerpt: article.excerpt,
                category: article.category,
                image: article.image,
                order: article.order || 0,
                isPublished: article.isPublished ?? true,
                publishedAt: article.isPublished ? (article.publishedAt ? new Date(article.publishedAt) : new Date()) : null,
            },
            create: {
                ...article,
                publishedAt: article.isPublished ? (article.publishedAt ? new Date(article.publishedAt) : new Date()) : null,
            },
        });
    }

    console.log(`Main seed completed successfully with ${expertArticles.length} expert articles!`);
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
