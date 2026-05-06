import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const productId = searchParams.get("productId");

//     if (!productId) {
//       return NextResponse.json(
//         { error: "productId is required" },
//         { status: 400 }
//       );
//     }

//     const product = await prisma.product.findUnique({
//       where: { id: productId },
//       // select: { hasParts: true },
//     });

//     // if (!product?.hasParts) {
//     //   return NextResponse.json([], { status: 200 });
//     // }

//     const parts = await prisma.productPart.findMany({
//       where: {
//         productId,
//       },
//       orderBy: {
//         partNumber: "asc",
//       },
//     });

//     const bookedParts = await prisma.productPart.findMany({
//       where: {
//         productId,
//         orderId: { not: null },
//         order: {
  
//         }
//       },
//       include: {
//         order: {
//           include: {
//             user: {
//               select: {
//                 name: true
//               }
//             }
//           }
//         }
//       }
//     });

//     const partsWithBookingStatus = parts.map(part => {
//       const bookedPart = bookedParts.find(bp => bp.partNumber === part.partNumber);
//       return {
//         ...part,
//         isBooked: !!bookedPart,
//         bookedBy: bookedPart?.order?.user?.name || null
//       };
//     });

//     return NextResponse.json(partsWithBookingStatus, { status: 200 });
//   } catch (error) {
//     console.error("GET product parts error:", error);

//     return NextResponse.json(
//       { error: "Failed to fetch product parts" },
//       { status: 500 }
//     );
//   }
}