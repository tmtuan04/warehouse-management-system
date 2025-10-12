import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Xử lý graceful shutdown để không leak connection
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

export default prisma;
