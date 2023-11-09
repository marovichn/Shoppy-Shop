import bcrypt from "bcrypt";

import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, name, password, lastname, age, gender } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 12);
  if (age < 18) {
    return new Response("You must be at least 18 years old", { status: 403 });
  }

  const user = await db.user.create({
    data: {
      email,
      name,
      hashedPassword,
      lastname,
      age,
      gender,
    },
  });

  return NextResponse.json(user);
}
