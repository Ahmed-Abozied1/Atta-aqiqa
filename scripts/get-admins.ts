import prisma from "../src/lib/prisma";

async function main() {
  const admins = await prisma.user.findMany({
    where: { role: "ADMIN" },
    select: { email: true, name: true },
  });
  console.log("Admin users:", admins);
}

main().finally(() => prisma.$disconnect());
