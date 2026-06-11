import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const [families, people, reviews] = await Promise.all([
    prisma.family.count(),
    prisma.personProfile.count(),
    prisma.reviewItem.count(),
  ]);

  console.log(`Database connected: families=${families}, people=${people}, reviews=${reviews}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

