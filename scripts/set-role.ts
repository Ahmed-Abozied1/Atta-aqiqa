import prisma from "../src/lib/prisma";

// Usage: npx tsx --env-file=.env scripts/set-role.ts <email> <ADMIN|STAFF|USER>
async function main() {
  const email = process.argv[2];
  const role = process.argv[3] as "ADMIN" | "STAFF" | "USER";

  if (!email || !["ADMIN", "STAFF", "USER"].includes(role)) {
    console.error("Usage: npx tsx --env-file=.env scripts/set-role.ts <email> <ADMIN|STAFF|USER>");
    process.exit(1);
  }

  const user = await prisma.user.update({
    where: { email },
    data: { role },
    select: { email: true, name: true, role: true },
  });
  console.log("Role updated:", user);
}

main()
  .catch((err) => { console.error("Failed:", err); process.exit(1); })
  .finally(() => prisma.$disconnect());
