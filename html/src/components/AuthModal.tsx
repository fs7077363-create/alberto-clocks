"use client";
import { useEffect, useState } from "react";

export function AuthButton({ mode, className, children }: { mode: "login" | "signup"; className?: string; children: React.ReactNode }) {
  return (
    <button className={className} onClick={() => window.dispatchEvent(new CustomEvent("open-auth", { detail: mode }))}>
      {children}
    </button>
  );
}

const input = "w-full rounded-xl border border-[var(--gold)]/30 bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] placeholder-[var(--muted)] outline-none focus:border-[var(--gold)] focus:shadow-[0_0_0_3px_rgba(212,175,55,0.15)]";

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [flipped, setFlipped] = useState(false); // false = login, true = signup
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const h = (e: Event) => { setFlipped((e as CustomEvent).detail === "signup"); setMsg(null); setOpen(true); };
    window.addEventListener("open-auth", h);
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k);
    setUser(localStorage.getItem("alberto_user"));
    return () => { window.removeEventListener("open-auth", h); window.removeEventListener("keydown", k); };
  }, []);

  async function submit(e: React.FormEvent<HTMLFormElement>, mode: "login" | "signup") {
    e.preventDefault();
    setBusy(true); setMsg(null);
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, mode }) });
    const j = await res.json();
    setBusy(false);
    if (!res.ok) return setMsg({ ok: false, t: j.error });
    localStorage.setItem("alberto_user", j.name);
    setUser(j.name);
    setMsg({ ok: true, t: `Welcome, ${j.name}! ✦` });
    setTimeout(() => setOpen(false), 1200);
  }

  return (
    <>
      {user && (
        <div className="fixed bottom-5 left-5 z-40 flex items-center gap-3 rounded-full border border-[var(--gold)]/40 bg-[var(--card)] px-4 py-2 text-xs text-[var(--gold2)] backdrop-blur">
          ✦ {user}
          <button onClick={() => { localStorage.removeItem("alberto_user"); setUser(null); }} className="text-[var(--muted)] hover:text-white">Logout</button>
        </div>
      )}
      <div onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <div onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-md [perspective:1400px] transition-all duration-500 ${open ? "translate-y-0 scale-100" : "translate-y-10 scale-90"}`}>
          <div className={`relative h-[540px] w-full transition-transform duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
            {/* LOGIN FACE */}
            <Face>
              <Header sub="Returning Member" title="Welcome Back" onClose={() => setOpen(false)} />
              <form onSubmit={(e) => submit(e, "login")} className="mt-6 space-y-4">
                <input name="email" type="email" required placeholder="Email address" className={input} />
                <input name="password" type="password" required placeholder="Password" className={input} />
                <Msg m={!flipped ? msg : null} />
                <button disabled={busy} className="w-full rounded-full bg-gradient-to-r from-[var(--gold2)] via-[var(--gold)] to-[var(--green)] py-3.5 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition hover:brightness-110 disabled:opacity-60">
                  {busy ? "..." : "Login"}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-[var(--muted)]">New here? <button onClick={() => { setMsg(null); setFlipped(true); }} className="font-semibold text-[var(--gold2)] hover:underline">Sign Up →</button></p>
            </Face>
            {/* SIGNUP FACE */}
            <Face back>
              <Header sub="Join the Maison" title="Create Account" onClose={() => setOpen(false)} />
              <form onSubmit={(e) => submit(e, "signup")} className="mt-6 space-y-4">
                <input name="name" required placeholder="Full name" className={input} />
                <input name="email" type="email" required placeholder="Email address" className={input} />
                <input name="password" type="password" required minLength={6} placeholder="Password (min 6)" className={input} />
                <Msg m={flipped ? msg : null} />
                <button disabled={busy} className="w-full rounded-full bg-gradient-to-r from-[var(--gold2)] via-[var(--gold)] to-[var(--green)] py-3.5 text-sm font-bold uppercase tracking-[0.25em] text-black shadow-[0_10px_30px_rgba(212,175,55,0.35)] transition hover:brightness-110 disabled:opacity-60">
                  {busy ? "..." : "Sign Up"}
                </button>
              </form>
              <p className="mt-6 text-center text-sm text-[var(--muted)]">Already member? <button onClick={() => { setMsg(null); setFlipped(false); }} className="font-semibold text-[var(--gold2)] hover:underline">← Login</button></p>
            </Face>
          </div>
        </div>
      </div>
    </>
  );
}

function Face({ children, back }: { children: React.ReactNode; back?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-3xl border border-[var(--gold)]/40 bg-gradient-to-br from-[var(--card)] via-[var(--bg2)] to-[var(--bg)] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,220,150,0.15)] [backface-visibility:hidden] ${back ? "[transform:rotateY(180deg)]" : ""}`}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--gold)]/15 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}
function Header({ sub, title, onClose }: { sub: string; title: string; onClose: () => void }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)] font-serif text-xl text-[var(--gold2)]">A</div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gold)]">{sub}</p>
        <h3 className="mt-2 font-serif text-3xl text-[var(--text)]">{title}</h3>
      </div>
      <button onClick={onClose} className="text-2xl text-[var(--muted)] hover:text-white">×</button>
    </div>
  );
}
function Msg({ m }: { m: { ok: boolean; t: string } | null }) {
  if (!m) return null;
  return <p className={`rounded-lg px-3 py-2 text-xs ${m.ok ? "bg-emerald-500/10 text-emerald-300" : "bg-red-500/10 text-red-300"}`}>{m.t}</p>;
}
