import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productId, value, description } = await req.json();
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!productId || !value || !description) {
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
    const store = process.env.NEXT_PUBLIC_API_URL!;
    const [storeId] = store.split("/").slice(-1);

    await db.review.create({
      data: {
        userId: currentUser.id,
        storeId: storeId,
        productId,
        value,
        description,
      },
    });

    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    console.log("ERR_REVIEW_ADD", error);
  }
}
