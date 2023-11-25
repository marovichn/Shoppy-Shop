import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const session = await getServerSession(authOptions);

    console.log(data.id)

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!data.id) {
      return new NextResponse("Invalid payload", { status: 400 });
    }

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.email !== currentUser.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.review.delete({
      where: {
        id: data.id,
      },
    });

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("ERR_REVIEW_ADD", error);
  }
}
