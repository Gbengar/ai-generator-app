import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { User } from "@/utils/schema";

export async function GET() {
  try {
    const [user] = await db.select().from(User).limit(1);
    return NextResponse.json(user || null);
  } catch (error) {
    console.error("Error fetching current user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
