import { NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/get-session";

export const maxDuration = 60;

export async function GET(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user || session.user.role !== "ADMIN") {
    return new Response("Forbidden", { status: 403 });
  }

  const latest = await prisma.order.findFirst({
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  let lastId = latest?.id ?? null;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(": connected\n\n"));

      const interval = setInterval(async () => {
        try {
          const order = await prisma.order.findFirst({
            orderBy: { createdAt: "desc" },
            select: { id: true, orderNumber: true, beneficiaryName: true },
          });

          if (order && order.id !== lastId) {
            lastId = order.id;
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify(order)}\n\n`)
            );
          }
        } catch {
          clearInterval(interval);
          controller.close();
        }
      }, 2000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
