import bcrypt from "bcryptjs";
import prisma from "../src/lib/prisma.js";

async function main() {
  const saltRounds = 10;

  // Hash password
  const adminPassword = await bcrypt.hash("Admin123@", saltRounds);
  const staffPassword = await bcrypt.hash("Staff123@", saltRounds);

  // Seed
  await prisma.users.createMany({
    data: [
      {
        username: "admin_user",
        full_name: "System Administrator",
        email: "admin@warehouse.com",
        phone: "0901111222",
        avatar_url: null,
        password: adminPassword,
        role_id: 1,
      },
      {
        username: "staff_user",
        full_name: "Staff Member",
        email: "staff@warehouse.com",
        phone: "0903333444",
        avatar_url: null,
        password: staffPassword,
        role_id: 2,
      },
    ],
    skipDuplicates: true,
  });

  console.log("Seed users completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
