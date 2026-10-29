"use client";
import { useEffect, useState } from "react";
import { WATCHES, type Watch } from "@/lib/watches";

type Mode = "buy" | "order";

export function OrderButton({ watchId, mode, className, children }: { watchId: number; mode: Mode; className?: string; children: React.ReactNode }) {
  return (
    <button className={className} onClick={() => window.dispatchEvent(new CustomEvent("open-order", { detail: { watchId, mode } }))}>
      {children}
    </button>
  );
}

const input = "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)]";

export default function OrderModal() {
  const [watch, setWatch] = useState<Watch | null>(null);
  const [mode, setMode] = useState<Mode>("buy");
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState<{ id: number; total: number } | null>(null);

  useEffect(() => {
    const h = (e: Event) => {
      const d = (e as CustomEvent<{ watchId: number; mode: Mode }>).detail;
      setWatch(WATCHES.find((w) => w.id === d.watchId) ?? null);
      setMode(d.mode); setQty(1); setErr(""); setDone(null);
    };
    window.addEventListener("open-order", h);
    return () => window.removeEventListener("open-order", h);
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!watch) return;
    setBusy(true); setErr("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, qty, watchId: watch.id }) });
    const j = await res.json();
    setBusy(false);
    if (!res.ok) return setErr(j.error);
    setDone({ id: j.orderId, total: j.total });
  }

  const open = !!watch;
  return (
    <div onClick={() => setWatch(null)} className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
      {watch && (
        <div onClick={(e) => e.stopPropagation()} className="animate-fadeup grid w-full max-w-3xl overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] shadow-2xl md:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={watch.img} alt={watch.name} className="h-56 w-full object-cover md:h-full" />
          <div className="relative p-7">
            <button onClick={() => setWatch(null)} className="absolute right-5 top-4 text-2xl text-[var(--muted)]">×</button>
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--green)]">{mode === "buy" ? "⚡ Buy Now" : "🛒 Place Order"}</p>
            <h3 className="mt-1 font-serif text-2xl">{watch.name}</h3>
            <p className="text-xs text-[var(--muted)]">{watch.material} · {watch.size}</p>
            {done ? (
              <div className="mt-8 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--green)] text-3xl text-white">✓</div>
                <p className="mt-4 font-serif text-2xl">Order Confirmed!</p>
                <p className="mt-2 text-sm text-[var(--muted)]">Order #{done.id} · Total ${done.total.toLocaleString("en-US")}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Cash on Delivery · Delivery in 3–7 days</p>
                <button onClick={() => setWatch(null)} className="mt-6 rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--green)] px-8 py-3 text-sm font-bold text-white">Done</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-[var(--bg2)] px-4 py-3">
                  <span className="text-sm">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={() => setQty(Math.max(1, qty - 1))} className="h-7 w-7 rounded-full border border-[var(--line)]">−</button>
                    <span className="w-4 text-center">{qty}</span>
                    <button type="button" onClick={() => setQty(Math.min(10, qty + 1))} className="h-7 w-7 rounded-full border border-[var(--line)]">+</button>
                  </div>
                </div>
                <input name="name" required placeholder="Full name" className={input} />
                <input name="phone" required placeholder="Phone number" className={input} />
                <textarea name="address" required rows={2} placeholder="Delivery address" className={input} />
                {err && <p className="text-xs text-red-500">{err}</p>}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-serif text-2xl text-[var(--gold)]">${(watch.price * qty).toLocaleString("en-US")}</span>
                  <button disabled={busy} className="rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--green)] px-7 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-lg disabled:opacity-60">
                    {busy ? "..." : mode === "buy" ? "Buy Now" : "Confirm Order"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
