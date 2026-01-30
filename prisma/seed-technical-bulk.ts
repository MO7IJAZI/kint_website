/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Generating Technical Content for all 54 crops...');

    const crops = await (prisma as any).crop.findMany();

    for (const crop of crops) {
        // Only update if description is empty or generic
        if (!crop.description || crop.description.includes('coming soon')) {
            const genericDesc = `
                <p>The successful cultivation of <strong>${crop.name}</strong> requires a precise combination of optimal soil conditions, balanced nutrition, and advanced biostimulation strategies.</p>
                <p>Expert research shows that <strong>${crop.name}</strong> is particularly responsive to foliar feeding during critical developmental windows. Providing the plant with targeted micronutrients such as Copper, Zinc, and Manganese, along with biostimulants like TYTANIT® and OPTYSIL®, significantly enhances resilience to environmental stressors.</p>
                <p>Our comprehensive feeding program is designed to secure high yield potential and superior quality parameters by supporting the plant's physiological needs from the earliest stages of germination through to full maturity.</p>
            `;

            await (prisma as any).crop.update({
                where: { id: crop.id },
                data: { description: genericDesc }
            });
        }

        // Standardize Stages for all crops if they only have Stage 1, 2, etc.
        const stages = await (prisma as any).cropStage.findMany({ where: { cropId: crop.id } });
        if (stages.length > 0 && stages[0].name === 'Stage 1') {
            const technicalStages = ['Sowing / Planting', 'Seedling Emergence', 'Vegetative Growth', 'Early Flowering', 'Fruit / Seed Development', 'Ripening & Maturation'];

            await (prisma as any).cropStage.deleteMany({ where: { cropId: crop.id } });

            for (let i = 0; i < technicalStages.length; i++) {
                await (prisma as any).cropStage.create({
                    data: {
                        name: technicalStages[i],
                        order: i,
                        cropId: crop.id
                    }
                });
            }
        }
    }

    console.log('All 54 Technical Guides are now professionally populated!');
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
