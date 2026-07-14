import { auth } from "../src/lib/auth";
import prisma from "../src/lib/prisma";

// Usage: npx tsx --env-file=.env scripts/create-admin.ts <email> <password> [name]
async function main() {
  const email = process.argv[2];
  const password = process.argv[3];
  const name = process.argv[4] || "Admin";

  if (!email || !password) {
    console.error(
      "Usage: npx tsx --env-file=.env scripts/create-admin.ts <email> <password> [name]"
    );
    process.exit(1);
  }

  // Create the user + credential account with proper password hashing via Better Auth.
  try {
    await auth.api.signUpEmail({ body: { name, email, password } });
    console.log("User created via signUpEmail.");
  } catch (err: any) {
    // If the user already exists we still proceed to promote + verify below.
    console.warn("signUpEmail note:", err?.message || err);
  }

  // Mark email as verified (bypass OTP) and promote to ADMIN.
  const user = await prisma.user.update({
    where: { email },
    data: { emailVerified: true, role: "ADMIN" },
    select: { email: true, name: true, role: true, emailVerified: true },
  });

  console.log("Admin ready:", user);
}

main()
  .catch((err) => {
    console.error("Failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
