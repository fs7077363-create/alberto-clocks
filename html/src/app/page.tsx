import { desc } from "drizzle-orm";
import { db } from "@/db";
import { reviews } from "@/db/schema";
import Tilt from "@/components/Tilt";
import Faq from "@/components/Faq";
import ThemeToggle from "@/components/ThemeToggle";
import Reviews, { type Review } from "@/components/Reviews";
import AuthModal, { AuthButton } from "@/components/AuthModal";
import OrderModal, { OrderButton } from "@/components/OrderModal";
import { WATCHES, REVIEWS, HERO_IMG, SHOW_IMG } from "@/lib/watches";

export const dynamic = "force-dynamic";

const grad = "bg-gradient-to-r from-[var(--gold)] to-[var(--green)]";

export default async function HomePage() {
  let dbReviews: Review[] = [];
  try {
    dbReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(20);
  } catch {}
  const allReviews: Review[] = [...dbReviews, ...REVIEWS.map((r, i) => ({ id: `s${i}`, name: r.name, city: r.city, rating: 5, text: r.text }))];

  return (
    <main className="min-h-screen overflow-x-hidden">
      <AuthModal />
      <OrderModal />

      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <a href="#home" className="flex items-center gap-3">
            <span className={`${grad} flex h-10 w-10 items-center justify-center rounded-full font-serif text-lg font-bold text-white shadow-lg`}>A</span>
            <span className="font-serif text-xl tracking-[0.25em]">ALBERTO</span>
          </a>
          <nav className="hidden gap-7 text-xs uppercase tracking-[0.25em] text-[var(--muted)] md:flex">
            {["Home", "Collection", "Show", "Reviews", "FAQ"].map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-[var(--gold)]">{n}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuthButton mode="login" className="hidden rounded-full border border-[var(--gold)] px-5 py-2 text-xs uppercase tracking-[0.2em] text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-white sm:block">Login</AuthButton>
            <AuthButton mode="signup" className={`${grad} rounded-full px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white`}>Sign Up</AuthButton>
          </div>
        </div>
      </header>

      {/* HERO — watch background, animated */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt="" className="animate-kenburns absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[var(--overlay)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
        <div className="animate-spin-slow pointer-events-none absolute -right-40 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full border-2 border-dashed border-[var(--gold)]/30" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <p className="animate-fadeup inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/50 bg-[var(--card)]/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-[var(--gold)] backdrop-blur">✦ Alberto Company · Est. 1887</p>
          <h1 className="animate-fadeup mt-6 font-serif text-[clamp(3.2rem,9vw,8rem)] leading-[0.9] [animation-delay:.15s]">
            Alberto<br /><span className="text-shine italic">Timeless Gold</span>
          </h1>
          <p className="animate-fadeup mt-6 max-w-lg text-lg text-[var(--muted)] [animation-delay:.3s]">Real luxury watches crafted in gold &amp; emerald green. 24 masterpieces — order today, delivered to your door.</p>
          <div className="animate-fadeup mt-10 flex flex-wrap gap-4 [animation-delay:.45s]">
            <OrderButton watchId={1} mode="buy" className={`${grad} rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition hover:scale-105`}>⚡ Buy Now</OrderButton>
            <a href="#collection" className="rounded-full border border-[var(--gold)] bg-[var(--card)]/40 px-8 py-4 text-sm uppercase tracking-[0.2em] text-[var(--gold)] backdrop-blur transition hover:bg-[var(--gold)] hover:text-white">🛒 Order Now</a>
          </div>
          <div className="animate-fadeup mt-14 flex gap-10 [animation-delay:.6s]">
            {[["24", "Watches"], ["5 yr", "Warranty"], ["50k+", "Customers"]].map(([n, l]) => (
              <div key={l}><p className="font-serif text-4xl text-[var(--gold)]">{n}</p><p className="text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className={`${grad} overflow-hidden py-3 text-white`}>
        <div className="animate-marquee flex w-max gap-12 whitespace-nowrap text-sm uppercase tracking-[0.3em]">
          {Array.from({ length: 2 }).flatMap((_, k) => ["Free Delivery", "Cash on Delivery", "5 Year Warranty", "100% Original", "30 Day Return", "Swiss Movement"].map((t) => <span key={k + t}>✦ {t}</span>))}
        </div>
      </div>

      {/* COLLECTION — 24 */}
      <section id="collection" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--green)]">Alberto Collection</p>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {WATCHES.map((w) => (
            <Tilt key={w.id} className="rounded-3xl">
              <article className="group h-full overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--card)] shadow-xl transition-colors hover:border-[var(--gold)]">
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.img} alt={w.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110" />
                  <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f3d98a]">N° {String(w.id).padStart(2, "0")}</span>
                  {w.badge && <span className={`${grad} absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase text-white`}>{w.badge}</span>}
                </div>
                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">{w.material} · {w.size}</p>
                  <h3 className="mt-1 font-serif text-xl">{w.name}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-xs text-[var(--gold)]">{"★".repeat(Math.round(w.rating))} <span className="text-[var(--muted)]">{w.rating.toFixed(1)}</span></span>
                    <span className="font-serif text-lg text-[var(--gold)]">${w.price.toLocaleString("en-US")}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <OrderButton watchId={w.id} mode="order" className="rounded-full border border-[var(--green)] py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--green)] transition hover:bg-[var(--green)] hover:text-white">🛒 Order</OrderButton>
                    <OrderButton watchId={w.id} mode="buy" className={`${grad} rounded-full py-2 text-[11px] font-bold uppercase tracking-wider text-white transition hover:brightness-110`}>Buy Now</OrderButton>
                  </div>
                </div>
              </article>
            </Tilt>
          ))}
        </div>
      </section>

      {/* SHOW */}
      <section id="show" className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--bg2)] py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 md:grid-cols-2">
          <div className="relative mx-auto">
            <div className={`${grad} absolute -inset-6 rounded-full opacity-30 blur-3xl`} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SHOW_IMG} alt="Alberto showcase" className="animate-floaty relative aspect-square w-80 rounded-full border-4 border-[var(--gold)] object-cover shadow-2xl md:w-96" />
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--green)]">The Alberto Show</p>
            <h2 className="mt-3 font-serif text-5xl">Watch of the <span className="text-shine italic">Year</span></h2>
            <p className="mt-5 text-[var(--muted)]">Alberto Tourbillon — 18k gold case, emerald sunburst dial and a 72-hour power reserve. Only 100 pieces ever made.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["Swiss Automatic", "Sapphire Glass", "100m Water Resist", "Limited 100 pcs"].map((f) => (
                <li key={f} className="rounded-xl border border-[var(--line)] bg-[var(--card)] px-4 py-3">✦ {f}</li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <OrderButton watchId={9} mode="buy" className={`${grad} rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wider text-white`}>Buy Now</OrderButton>
              <OrderButton watchId={9} mode="order" className="rounded-full border border-[var(--gold)] px-8 py-3 text-sm uppercase tracking-wider text-[var(--gold)]">Order</OrderButton>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--green)]">Customer Reviews</p>
          <h2 className="mt-3 font-serif text-5xl">What Our <span className="text-shine italic">Customers Say</span></h2>
        </div>
        <Reviews initial={allReviews} />
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-[var(--line)] bg-[var(--bg2)] py-24">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--green)]">4 Questions</p>
            <h2 className="mt-3 font-serif text-5xl">Frequently Asked <span className="text-shine italic">Questions</span></h2>
          </div>
          <Faq />
        </div>
      </section>

      <footer className="border-t border-[var(--line)] py-10 text-center">
        <p className="font-serif text-2xl tracking-[0.3em]">ALBERTO</p>
        <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">© 2026 Alberto Company · Gold &amp; Green Luxury</p>
      </footer>
    </main>
  );
}
