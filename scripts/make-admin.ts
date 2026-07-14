import prisma from "../src/lib/prisma";

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: npx tsx scripts/make-admin.ts <email>");
    process.exit(1);
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role: "ADMIN" },
    select: { email: true, name: true, role: true },
  });
  console.log("Promoted to ADMIN:", user);
}

main()
  .catch((err) => {
    console.error("Failed to promote user:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
