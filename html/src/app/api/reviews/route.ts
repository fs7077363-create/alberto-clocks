import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { reviews } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rows = await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(20);
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const name = String(b.name ?? "").trim().slice(0, 60);
  const city = String(b.city ?? "").trim().slice(0, 60);
  const text = String(b.text ?? "").trim().slice(0, 500);
  const rating = Math.min(5, Math.max(1, Number(b.rating) || 5));
  if (!name || text.length < 5) return NextResponse.json({ error: "Please enter your name and a review (min 5 characters)." }, { status: 400 });
  try {
    const [r] = await db.insert(reviews).values({ name, city, text, rating }).returning();
    return NextResponse.json(r);
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
