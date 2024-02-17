import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ code: -1, message: "没有id" });
  }
  await prisma.$transaction(async (prisma) => {
    // 删除关联的消息
    await prisma.message.deleteMany({
      where: {
        chatId: id,
      },
    });
    await prisma.chat.delete({
      where: {
        id,
      },
    });
  });
  return NextResponse.json({ code: 0 });
}
