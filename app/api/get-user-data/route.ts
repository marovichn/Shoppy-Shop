// pages/api/add-to-favorites.js

import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json", // Add Content-Type header
        },
      });
    }

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json", // Add Content-Type header
        },
      });
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
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "Content-Type": "application/json", // Add Content-Type header
        },
      });
    }

    return new NextResponse(JSON.stringify(currentUser), {
      headers: {
        "Content-Type": "application/json", // Add Content-Type header
      },
    });
  } catch (error:any) {
    console.error("ERR_GET_USER", error);
    console.error(error.message);
    return new NextResponse("Internal Server Error", {
      status: 500,
      headers: {
        "Content-Type": "application/json", // Add Content-Type header
      },
    });
  }
}
