// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
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
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const currentUserCurrentFavorite = await db.favorite.findUnique({
      where: {
        productId: data.id,
      },
    });

    if (!currentUserCurrentFavorite) {
      await db.favorite.create({
        data: {
          productId: data.id,
          userId: currentUser.id,
        },
      });

      return new NextResponse("Added successfully", { status: 200 });
    }

    await db.favorite.delete({
      where: {
        id: currentUserCurrentFavorite.id,
      },
    });
    // Respond with the updated favorites list
    return NextResponse.json("Successfully added", { status: 200 });
  } catch (error) {
    console.log("ERR_LIKE", error);
  }
}
