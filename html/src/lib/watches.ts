const IMG = [
  "8401620", "29627442", "26793386", "9200228", "20818925", "190819",
  "32239080", "6804457", "17351227", "36723945", "4601006", "39620421",
  "4600998", "3766111", "12581691", "11607481", "15266871", "5895639",
  "28157826", "8968349", "28135838", "3656125", "15671805", "9203638",
];
const url = (id: string) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop`;

const NAMES = [
  "Alberto Imperator", "Alberto Nocturne", "Alberto Sovereign", "Alberto Meridian",
  "Alberto Regalia", "Alberto Oceanis", "Alberto Aurum", "Alberto Celestia",
  "Alberto Tourbillon", "Alberto Monarch", "Alberto Chrono X", "Alberto Royale",
  "Alberto Vesper", "Alberto Equinox", "Alberto Obsidian", "Alberto Saphir",
  "Alberto Heritage", "Alberto Voyager", "Alberto Eclipse", "Alberto Phantom",
  "Alberto Grand Lune", "Alberto Titan", "Alberto Dynasty", "Alberto Infinity",
];
const MATERIALS = ["18k Rose Gold", "Platinum 950", "Yellow Gold", "Black Ceramic", "Titanium", "Steel & Gold"];
const BADGES = ["New", "Limited", "Bestseller", "", "Exclusive", ""];

export type Watch = {
  id: number; name: string; img: string; material: string;
  size: string; price: number; badge: string; rating: number;
};

export const WATCHES: Watch[] = NAMES.map((name, i) => ({
  id: i + 1,
  name,
  img: url(IMG[i]),
  material: MATERIALS[i % MATERIALS.length],
  size: `${38 + (i % 5) * 2}mm`,
  price: 8900 + ((i * 3713) % 42000),
  badge: BADGES[i % BADGES.length],
  rating: 4 + ((i * 7) % 10) / 10,
}));

export const HERO_IMG = "https://images.pexels.com/photos/28135838/pexels-photo-28135838.jpeg?auto=compress&cs=tinysrgb&w=1920";
export const SHOW_IMG = url("9203638");

export const REVIEWS = [
  { name: "Arjun Mehta", city: "Dubai", text: "The finishing on the Alberto Imperator blew me away. Every bit as good as a Rolex — and even classier.", img: "https://i.pravatar.cc/150?img=12" },
  { name: "Sofia Laurent", city: "Paris", text: "The Celestia is breathtaking. The packaging, the weight, the dial — pure art on my wrist.", img: "https://i.pravatar.cc/150?img=47" },
  { name: "Hamza Khan", city: "Lahore", text: "I gifted one to my father and he was moved to tears. Premium quality, fast delivery.", img: "https://i.pravatar.cc/150?img=33" },
  { name: "James Whitford", city: "London", text: "Tourbillon movement is flawless. Collector-grade craftsmanship at an honest price.", img: "https://i.pravatar.cc/150?img=59" },
];

export const FAQS = [
  { q: "How was this website built?", a: "The Alberto website is built with Next.js (App Router), React and Tailwind CSS. Data is stored in a PostgreSQL database via Drizzle ORM — logins, orders and reviews are all saved to a real database." },
  { q: "What is Alberto Watch?", a: "Alberto is a luxury watch company crafting hand-finished timepieces with a signature gold-and-green design since 1887. Every watch is numbered and certified." },
  { q: "How do I Order or Buy Now?", a: "Click 'Buy Now' or 'Order' on any watch card, then enter your name, phone and address — your order is confirmed instantly, with Cash on Delivery available." },
  { q: "What is the warranty and return policy?", a: "Every watch comes with a 5-year international warranty and an easy 30-day return policy. Delivery is free and takes 3–7 days." },
];
