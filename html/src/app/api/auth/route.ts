import { NextResponse } from "next/server";
import { scryptSync, randomBytes, timingSafeEqual } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { users } from "@/db/schema";

function hash(pw: string) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(pw, salt, 64).toString("hex")}`;
}
function verify(pw: string, stored: string) {
  const [salt, h] = stored.split(":");
  const a = Buffer.from(h, "hex");
  const b = scryptSync(pw, salt, 64);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const mode = body.mode as string;
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");
  const name = String(body.name ?? "").trim();

  if (!email.includes("@") || password.length < 6)
    return NextResponse.json({ error: "A valid email and a password of at least 6 characters are required." }, { status: 400 });

  try {
    const [existing] = await db.select().from(users).where(eq(users.email, email));
    if (mode === "signup") {
      if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
      if (existing) return NextResponse.json({ error: "This email is already registered." }, { status: 409 });
      await db.insert(users).values({ name, email, passwordHash: hash(password) });
      return NextResponse.json({ ok: true, name });
    }
    if (!existing || !verify(password, existing.passwordHash))
      return NextResponse.json({ error: "Incorrect email or password." }, { status: 401 });
    return NextResponse.json({ ok: true, name: existing.name });
  } catch {
    return NextResponse.json({ error: "Server error, please try again." }, { status: 500 });
  }
}
