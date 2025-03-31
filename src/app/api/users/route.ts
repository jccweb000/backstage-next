import { NextResponse } from "next/server";

import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/users/model";

export async function GET () {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ code: 0, data: users });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { code: 1, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}