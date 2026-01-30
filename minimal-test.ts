import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// This should work according to the generated types
const test = async () => {
  // This line should not show a TypeScript error
  const articles = await prisma.expertArticle.findMany();
  console.log(articles);
};

test().catch(console.error);