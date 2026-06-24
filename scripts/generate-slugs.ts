import prismaClient from "../src/lib/prisma";

function generateSlug(name: string): string {
  return name
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^؀-ۿݐ-ݿ‌‍\-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const products = await prismaClient.product.findMany({ where: { slug: null } });

  for (const product of products) {
    const baseSlug = generateSlug(product.name);
    let slug = baseSlug;
    let suffix = 1;

    while (slug && await prismaClient.product.findFirst({ where: { slug, NOT: { id: product.id } } })) {
      slug = `${baseSlug}-${suffix++}`;
    }

    await prismaClient.product.update({
      where: { id: product.id },
      data: { slug: slug || null },
    });

    console.log(`✓ ${product.name} → /product/${slug}`);
  }

  console.log(`\nDone! ${products.length} products updated.`);
}

main().finally(() => prismaClient.$disconnect());
