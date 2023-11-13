// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
    
    return NextResponse.json(currentUser);
  } catch (error: any) {
    console.log("ERR_GET_USER", error);
    console.log(error.message);
  }
}
