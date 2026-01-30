/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Adding detailed content for Spring Wheat...');

    const springWheatDesc = `
        <p>Spring cereal crops, compared to winter forms, are characterized by a shorter growing season, lower yield potential and greater sensitivity to unfavorable weather conditions.</p>
        <p>SPRING WHEAT (Triticum aestivum L.) is grown mostly for production of quality flour. It requires a good supply of not only with nitrogen, but also with phosphorus, potassium, magnesium, sulfur, copper and manganese. These elements improve use of nitrogen which results in increased yield and improvement of grain parameters quality. Well-fed plants are also more resistant to stress factors.</p>
        <p>One of the important elements of correct agricultural technology of spring wheat growing is sowing as early as possible. The main goal is to extend the period of vegetative growth until the plants switch to the generative phase, which takes place as the day gets longer.</p>
        <p>A well-developed root system allows plants to efficiently uptake water and nutrients from the soil. For intensive development of the root system, it is necessary to provide plants with phosphorus (P) and activators like ROOTSTAR™.</p>
    `;

    const wheat = await (prisma as any).crop.findUnique({ where: { slug: 'wheat-spring-wheat' } });

    if (wheat) {
        await (prisma as any).crop.update({
            where: { id: wheat.id },
            data: { description: springWheatDesc }
        });

        // Update Stages with real names from intermag logic
        const stagesData = [
            { name: 'Seed Treatment', order: 0 },
            { name: 'Emergence', order: 1 },
            { name: 'Tillering', order: 2 },
            { name: 'Stem Elongation', order: 3 },
            { name: 'Flag Leaf', order: 4 },
            { name: 'Heading & Flowering', order: 5 }
        ];

        // Delete existing stages for this crop to clean up
        await (prisma as any).cropStage.deleteMany({ where: { cropId: wheat.id } });

        for (const s of stagesData) {
            await (prisma as any).cropStage.create({
                data: {
                    name: s.name,
                    order: s.order,
                    cropId: wheat.id
                }
            });
        }
    }

    console.log('Detailed Spring Wheat content added successfully!');
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
