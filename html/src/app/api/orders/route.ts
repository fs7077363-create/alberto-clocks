import { NextResponse } from "next/server";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { WATCHES } from "@/lib/watches";

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({}));
  const watch = WATCHES.find((w) => w.id === Number(b.watchId));
  const name = String(b.name ?? "").trim();
  const phone = String(b.phone ?? "").trim();
  const address = String(b.address ?? "").trim();
  const qty = Math.min(10, Math.max(1, Number(b.qty) || 1));
  if (!watch || !name || phone.length < 7 || !address)
    return NextResponse.json({ error: "Please enter a valid name, phone and address." }, { status: 400 });
  try {
    const [o] = await db.insert(orders).values({ watchId: watch.id, watchName: watch.name, price: watch.price, qty, name, phone, address }).returning({ id: orders.id });
    return NextResponse.json({ ok: true, orderId: o.id, total: watch.price * qty });
  } catch {
    return NextResponse.json({ error: "Server error, please try again." }, { status: 500 });
  }
}
