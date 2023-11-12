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
    const currentUserCurrentWishedItem = await db.wishlist.findUnique({
      where: {
        productId: data.id,
        userId: currentUser.id
      },
    });

    if (!currentUserCurrentWishedItem) {
      await db.wishlist.create({
        data: {
          productId: data.id,
          userId: currentUser.id,
        },
      });

      return new NextResponse("Added successfully", { status: 200 });
    }

    await db.wishlist.delete({
      where: {
        id: currentUserCurrentWishedItem.id,
        userId:currentUser.id
      },
    });
    // Respond with the updated favorites list
    return NextResponse.json("Successfully added", { status: 200 });
  } catch (error) {
    console.log("ERR_LIKE", error);
  }
}
