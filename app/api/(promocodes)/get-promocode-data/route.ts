// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userAccessCode } = await req.json();
    console.log("USERACCCODE", userAccessCode);
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const promocode = await db.promocodes.findUnique({
      where: {
        userAccessCode: userAccessCode,
      },
    });

    if (!promocode) {
      return new NextResponse("Invalid code", { status: 400 });
    }
    // Respond with the updated favorites list
    return NextResponse.json(promocode);
  } catch (error) {
    console.log("ERR_PROMO_DATA", error);
  }
}
