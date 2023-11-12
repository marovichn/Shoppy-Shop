// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {promocode} = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        promocodes: true,
      },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (currentUser.promocodes.length === 1) {
      await db.promocodes.deleteMany({
        where: {
          userId: currentUser.id,
        },
      });
    }

    await db.promocodes.create({
      data: {
        ...promocode,
        userId: currentUser.id,
      },
    });
    // Respond with the updated users codes list
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("ERR_PROMOS", error);
  }
}
