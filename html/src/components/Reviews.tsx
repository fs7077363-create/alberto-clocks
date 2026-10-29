"use client";
import { useState } from "react";

export type Review = { id: number | string; name: string; city: string; rating: number; text: string };

export default function Reviews({ initial }: { initial: Review[] }) {
  const [list, setList] = useState(initial);
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setBusy(true); setMsg("");
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, rating }) });
    const j = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg(j.error);
    setList([j, ...list]); form.reset(); setRating(5); setMsg("Thank you! Your review has been added ✓");
  }

  const input = "w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm outline-none focus:border-[var(--gold)]";
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
      <form onSubmit={submit} className="h-fit space-y-3 rounded-3xl border border-[var(--line)] bg-[var(--card)] p-7 shadow-xl">
        <h3 className="font-serif text-2xl">Write a Review</h3>
        <div className="flex gap-1 text-2xl">
          {[1, 2, 3, 4, 5].map((n) => (
            <button type="button" key={n} onClick={() => setRating(n)} className={n <= rating ? "text-[var(--gold)]" : "text-[var(--muted)] opacity-40"}>★</button>
          ))}
        </div>
        <input name="name" required placeholder="Your name" className={input} />
        <input name="city" placeholder="City" className={input} />
        <textarea name="text" required rows={3} placeholder="How do you like your watch?" className={input} />
        {msg && <p className="text-xs text-[var(--green)]">{msg}</p>}
        <button disabled={busy} className="w-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--green)] py-3 text-sm font-bold uppercase tracking-wider text-white disabled:opacity-60">{busy ? "..." : "Submit Review"}</button>
      </form>
      <div className="grid gap-5 sm:grid-cols-2">
        {list.slice(0, 8).map((r) => (
          <div key={r.id} className="animate-fadeup rounded-3xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-lg transition hover:-translate-y-1 hover:border-[var(--gold)]">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold)] to-[var(--green)] font-bold text-white">{r.name[0]?.toUpperCase()}</div>
              <div><p className="font-serif">{r.name}</p><p className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{r.city || "Collector"}</p></div>
              <span className="ml-auto text-sm text-[var(--gold)]">{"★".repeat(r.rating)}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">“{r.text}”</p>
          </div>
        ))}
      </div>
    </div>
  );
}
