import prisma from "../src/lib/prisma";

async function main() {
  const reviews = await prisma.review.findMany({
    select: { id: true, guestName: true, guestImage: true, userId: true, isApproved: true, rating: true },
  });
  console.log(JSON.stringify(reviews, null, 2));
}

main().finally(() => prisma.$disconnect());
