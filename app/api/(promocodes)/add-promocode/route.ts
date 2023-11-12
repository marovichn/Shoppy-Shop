// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log(data.promocode);
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data) {
      return new NextResponse("Invalid payload", { status: 400 });
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
      await db.userPromocodes.deleteMany({
        where: {
          userId: currentUser.id,
        },
      });
    }

    const { endDate } = data.promocode;
    // Validate expiration date
    if (endDate && new Date(endDate) < new Date()) {
      return new NextResponse("Promocode has expired", { status: 403 });
    }

    await db.userPromocodes.create({
      data: {
        ...data.promocode,
        userId: currentUser.id,
      },
    });
    // Respond with the updated users codes list
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("ERR_PROMOS_ADD", error);
  }
}
