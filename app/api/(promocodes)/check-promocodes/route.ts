// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
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
    const userPromocodes = currentUser.promocodes;
    console.log(userPromocodes)
    if (!userPromocodes || userPromocodes.length === 0) {
      return NextResponse.json(false);
    }
    // Respond with the updated users codes list
    return NextResponse.json(true);
  } catch (error:any) {
    console.log("ERR_PROMOS", error);
    console.log(error.message)
  }
}
