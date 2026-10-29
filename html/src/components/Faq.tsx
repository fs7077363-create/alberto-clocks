"use client";
import { useState } from "react";
import { FAQS } from "@/lib/watches";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-4">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={`rounded-2xl border transition-colors duration-200 ${isOpen ? "border-[var(--gold)] bg-[var(--card)]" : "border-[var(--gold)]/20 bg-[var(--bg2)]"}`}>
            <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
              <span className="font-serif text-lg text-[var(--text)]"><span className="mr-3 text-[var(--gold)]">0{i + 1}</span>{f.q}</span>
              <span className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-150 ${isOpen ? "bg-[var(--gold)]" : "bg-[var(--line)]"}`}>
                <span className={`absolute top-1 h-5 w-5 rounded-full bg-[var(--bg)] transition-all duration-150 ${isOpen ? "left-6" : "left-1"}`} />
              </span>
            </button>
            <div className={`grid transition-all duration-200 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="px-6 pb-6 text-sm leading-relaxed text-[var(--muted)]">{f.a}</p></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
