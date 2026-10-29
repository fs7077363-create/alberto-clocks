"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => { setLight(document.documentElement.classList.contains("light")); }, []);
  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    localStorage.setItem("alberto_theme", next ? "light" : "dark");
  };
  return (
    <button onClick={toggle} aria-label="Toggle theme"
      className="relative flex h-9 w-16 items-center rounded-full border border-[var(--line)] bg-[var(--card)] px-1 transition">
      <span className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--gold2)] to-[var(--green)] text-sm shadow transition-transform duration-300 ${light ? "translate-x-7" : ""}`}>
        {light ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
