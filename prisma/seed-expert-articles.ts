import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();
const DATA_FILE_PATH = path.join(__dirname, 'data', 'expert-articles.json');

async function main() {
  console.log('Seeding Experts\' Forum articles...');

  const articles = [
    {
      title: 'Spring winter wheat fertilization',
      slug: 'spring-winter-wheat-fertilization',
      excerpt: 'Fertilization of winter wheat in spring is one of the most important fertilization periods, directly affecting the quality and quantity of yield. After the winter dormancy, winter wheat requires effective regeneration and the supply of essential nutrients.',
      content: `
Fertilization of winter wheat in spring is one of the most important fertilization periods, directly affecting the quality and quantity of yield. After the winter dormancy, winter wheat requires effective regeneration and the supply of essential nutrients. At this stage, it is crucial not only to apply nitrogen but also to address micronutrient deficiencies through foliar feeding.

## What should winter wheat be fertilized with in spring?

### The importance of foliar feeding in the spring fertilization of winter wheat

Effective spring fertilization of winter wheat should be based on precisely selected treatments that meet the plant's nutritional needs depending on their developmental stage. The goal of spring fertilization is not only to stimulate growth but also to enhance stress resistance and improve the uptake and utilization of mineral nutrients such as phosphorus, nitrogen, and potassium.

Foliar feeding of wheat is essential, especially during critical growth periods.

### Benefits of foliar fertilization of winter wheat:

- Very fast and efficient uptake and use of nutrients by the plants
- Balancing and equalizing the proportions of nutrients
- Enhanced uptake of nutrients from the soil
- Reduction of negative effects of stress on the plants
- Prevention and elimination of physiological disorders caused by deficiencies of essential elements
- Increased plant resistance to diseases
- Improved quality parameters of the yield

## Spring fertilization of winter wheat with micronutrients

In the case of winter wheat, micronutrients such as copper, manganese, and zinc are particularly important. Their adequate supply from the full tillering stage (BBCH 25–28) to the beginning of stem elongation (BBCH 30) allows the crop to reach a high yield potential.

### Copper — support for tillering and grain quality in wheat

Copper stimulates tillering, thereby improving the yield potential. Additionally, it enhances the efficiency of nitrogen fertilization, which leads to better grain filling and higher gluten content. The plant's highest demand for this element occurs from stem elongation to flowering, which is why it is advisable to start copper application at the beginning of spring vegetation.

A typical symptom of copper deficiency in winter wheat is the twisting and bleaching of leaf tips.

### Manganese – healthy plants and a strong root system

Manganese supports the uptake of mineral nutrients, including phosphorus, which promotes root system development. It also increases disease resistance and supports the production of flavonoids that protect against pathogens. Early application of manganese is especially important under cool weather conditions.

### Zinc – increased resistance and fertilization efficiency

Zinc improves wheat's resistance to drought, cold, and diseases. It influences sugar metabolism and auxin synthesis, which play a significant role in plant development.

In addition to the elements mentioned above, it is also worth considering foliar feeding with molybdenum and iron, especially during periods of intensive growth.

## Effectiveness of spring fertilization of wheat – what does it depend on?

The effectiveness of foliar fertilization of winter wheat with micronutrients depends on the timing of the treatment, the type of product used, and the form in which the micronutrients are complexed. It is crucial that they are readily available to plants even at lower temperatures. In this context, fertilizers containing glycine stand out in particular, as the combination of micronutrients with this amino acid ensures the highest efficacy in cereal cultivation in early spring.

### AMINO ULTRA® – use it in spring fertilization of wheat

The AMINO ULTRA® line of fertilizers based on the patented GCAA technology, is a response to the needs of modern agriculture. Products in this line contain a complex of micronutrients with the amino acid glycine, enabling ultra-fast penetration of nutrients through the leaves and their effective transport within the plant.

For wheat, the fertilizer AMINO ULTRA® CEREALS is especially recommended, as it contains optimal doses of copper, manganese, and zinc – key elements for high yield and grain quality. These fertilizers are not only effective but also environmentally friendly – thanks to low application rates and the use of natural complexing agents.
      `.trim(),
      image: '/images/articles/wheat-fertilization-hero.jpg',
      category: 'arable',
      order: 1,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'Adjuvant FASTER for use with plant protection products',
      slug: 'adjuvant-faster',
      excerpt: 'In every farm, the goal is to optimize the use of plant protection treatments. Therefore, the application of these treatments is accompanied by the preparation of spray mixtures.',
      content: `
In every farm, the goal is to optimize the use of plant protection treatments. Therefore, the application of these treatments is accompanied by the preparation of spray mixtures.

An adjuvant is a substance added to a pesticide formulation or spray mixture to enhance the effectiveness of the active ingredient. Adjuvants can improve various aspects of pesticide performance, including:

- Better coverage and retention on plant surfaces
- Enhanced penetration of active ingredients
- Reduced drift during application
- Improved mixing and compatibility of products
- Extended residual activity

FASTER is a specially designed adjuvant that works synergistically with plant protection products to maximize their efficacy while minimizing environmental impact.
      `.trim(),
      image: '/images/articles/adjuvant-faster.jpg',
      category: 'arable',
      order: 2,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'Nitrogen from the air – fixing process directly inside the plant?',
      slug: 'nitrogen-fixing-process',
      excerpt: 'Atmospheric nitrogen could be a valuable source of this nutrient. However, plants cannot absorb it or integrate it into biochemical processes on their own.',
      content: `
Atmospheric nitrogen could be a valuable source of this nutrient. However, plants cannot absorb it or integrate it into biochemical processes on their own.

Nitrogen is one of the most essential nutrients for plant growth, but atmospheric nitrogen (N₂) is relatively inert and unavailable to most plants. Traditional agriculture relies heavily on synthetic nitrogen fertilizers, which are energy-intensive to produce and can have environmental consequences.

The nitrogen fixing process typically occurs through:
- Symbiotic bacteria in legume root nodules
- Free-living soil microorganisms
- Industrial Haber-Bosch process for fertilizer production

Recent research is exploring innovative approaches to make atmospheric nitrogen more accessible to plants directly, potentially revolutionizing sustainable agriculture practices.
      `.trim(),
      image: '/images/articles/nitrogen-fixing.jpg',
      category: 'arable',
      order: 3,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'Prepare your seeds for sowing with seed fertiliser PRIMSEED MULTI!',
      slug: 'primseed-multi-seed-fertiliser',
      excerpt: 'Preparing seeds for sowing is a crucial step that can significantly impact the health of plants and the size of the yield. PRIMSEED MULTI seed fertiliser strengthens cereal seeds, providing them with the best conditions for growth and development.',
      content: `
Preparing seeds for sowing is a crucial step that can significantly impact the health of plants and the size of the yield. PRIMSEED MULTI seed fertiliser strengthens cereal seeds, providing them with the best conditions for growth and development.

Seed treatment with specialized fertilizers offers several advantages:
- Enhanced germination rates
- Stronger seedling establishment
- Improved early root development
- Better stress tolerance during critical growth phases
- Increased overall crop vigor

PRIMSEED MULTI is formulated specifically for cereal crops and provides essential nutrients directly to the developing seedling, ensuring optimal start and maximum yield potential.
      `.trim(),
      image: '/images/articles/primseed-multi.jpg',
      category: 'arable',
      order: 4,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'Post-harvest orchard fertilization – zinc and boron',
      slug: 'post-harvest-orchard-fertilization',
      excerpt: 'Every orchardist must remember that the end of the harvest does not mean the end of work in the orchard. On the contrary, this is the time for crucial actions that will prepare the fruit trees for winter dormancy and ensure they are in the best possible condition to begin the next growing season.',
      content: `
Every orchardist must remember that the end of the harvest does not mean the end of work in the orchard. On the contrary, this is the time for crucial actions that will prepare the fruit trees for winter dormancy and ensure they are in the best possible condition to begin the next growing season.

Post-harvest fertilization focuses on:
- Replenishing nutrient reserves depleted during fruit production
- Strengthening tree structure and root system
- Preparing for successful bud formation for next year's crop
- Improving overall tree health and longevity

Zinc and boron are particularly important micronutrients during this period, supporting wood maturation and preparing the tree for winter survival.
      `.trim(),
      image: '/images/articles/orchard-fertilization.jpg',
      category: 'fruit',
      order: 1,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'BACTIM® LEAVES – LIMITED SOURCE OF APPLE SCAB',
      slug: 'bactim-leaves-apple-scab',
      excerpt: 'Discover how BACTIM® LEAVES can help control apple scab in your orchard.',
      content: `
BACTIM® LEAVES is a biological control agent specifically developed to combat apple scab (Venturia inaequalis), one of the most common and damaging diseases affecting apple trees.

Apple scab can cause significant economic losses by:
- Reducing fruit quality and marketability
- Decreasing yield potential
- Increasing production costs due to repeated fungicide applications

BACTIM® LEAVES offers an environmentally friendly alternative that works by introducing beneficial microorganisms that compete with and suppress the scab pathogen, providing effective protection while supporting sustainable orchard management practices.
      `.trim(),
      image: '/images/articles/bactim-leaves.jpg',
      category: 'fruit',
      order: 2,
      isPublished: true,
      publishedAt: new Date()
    },
    {
      title: 'Choose mycorrhiza: how does it support agriculture?',
      slug: 'mycorrhiza-support-agriculture',
      excerpt: 'Modern agriculture faces numerous challenges. Climate change, increasing demand for food, and the need to protect the environment require innovative solutions.',
      content: `
Modern agriculture faces numerous challenges. Climate change, increasing demand for food, and the need to protect the environment require innovative solutions.

Mycorrhizal fungi form symbiotic relationships with plant roots, providing mutual benefits:
- Enhanced nutrient uptake, particularly phosphorus and micronutrients
- Improved water absorption and drought tolerance
- Increased resistance to soil-borne pathogens
- Better soil structure and aggregation
- Reduced need for chemical fertilizers

MYCOTIM VIGOR FB represents the latest advancement in mycorrhizal technology, offering farmers a natural way to boost crop productivity while promoting sustainable farming practices and reducing environmental impact.
      `.trim(),
      image: '/images/articles/mycotim-vigor.jpg',
      category: 'vegetable',
      order: 1,
      isPublished: true,
      publishedAt: new Date()
    }
  ];

  // Load articles from JSON file
  let jsonArticles: Array<Record<string, unknown>> = [];
  if (fs.existsSync(DATA_FILE_PATH)) {
    try {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      jsonArticles = JSON.parse(fileContent);
      console.log(`Loaded ${jsonArticles.length} articles from JSON file.`);
    } catch (error) {
      console.error('Error reading expert-articles.json:', error);
    }
  }

  // Merge articles (JSON takes precedence over hardcoded)
  const articleMap = new Map();
  
  // Add hardcoded first
  for (const article of articles) {
    articleMap.set(article.slug, article);
  }

  // Add/Overwrite with JSON articles
  for (const article of jsonArticles) {
    // Ensure date strings are converted to Date objects
    if (typeof article.publishedAt === 'string') {
      article.publishedAt = new Date(article.publishedAt);
    }
    articleMap.set(article.slug, article);
  }

  const finalArticles = Array.from(articleMap.values());

  // Create articles
  for (const article of finalArticles) {
    await prisma.expertArticle.upsert({
      where: { slug: article.slug },
      update: article,
      create: article
    });
    console.log(`✓ Created/Updated: ${article.title}`);
  }

  console.log('\n✅ Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
