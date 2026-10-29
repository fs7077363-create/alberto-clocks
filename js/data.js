/* Alberto — watch data (shared by all pages) */
var IMG = [
  "8401620", "29627442", "26793386", "9200228", "20818925", "190819",
  "32239080", "6804457", "17351227", "36723945", "4601006", "39620421",
  "4600998", "3766111", "12581691", "11607481", "15266871", "5895639",
  "28157826", "8968349", "28135838", "3656125", "15671805", "9203638"
];
function imgUrl(id, w, h) {
  return "https://images.pexels.com/photos/" + id + "/pexels-photo-" + id +
    ".jpeg?auto=compress&cs=tinysrgb&w=" + (w || 600) + "&h=" + (h || 750) + "&fit=crop";
}
var NAMES = [
  "Alberto Imperator", "Alberto Nocturne", "Alberto Sovereign", "Alberto Meridian",
  "Alberto Regalia", "Alberto Oceanis", "Alberto Aurum", "Alberto Celestia",
  "Alberto Tourbillon", "Alberto Monarch", "Alberto Chrono X", "Alberto Royale",
  "Alberto Vesper", "Alberto Equinox", "Alberto Obsidian", "Alberto Saphir",
  "Alberto Heritage", "Alberto Voyager", "Alberto Eclipse", "Alberto Phantom",
  "Alberto Grand Lune", "Alberto Titan", "Alberto Dynasty", "Alberto Infinity"
];
var MATERIALS = ["18k Rose Gold", "Platinum 950", "Yellow Gold", "Black Ceramic", "Titanium", "Steel & Gold"];
var BADGES = ["New", "Limited", "Bestseller", "", "Exclusive", ""];

var WATCHES = NAMES.map(function (name, i) {
  return {
    id: i + 1,
    name: name,
    img: imgUrl(IMG[i]),
    material: MATERIALS[i % MATERIALS.length],
    size: (38 + (i % 5) * 2) + "mm",
    price: 8900 + ((i * 3713) % 42000),
    badge: BADGES[i % BADGES.length],
    rating: 4 + ((i * 7) % 10) / 10
  };
});

var SAMPLE_REVIEWS = [
  { name: "Arjun Mehta", city: "Dubai", rating: 5, text: "The finishing on the Alberto Imperator blew me away. Every bit as good as a Rolex — and even classier." },
  { name: "Sofia Laurent", city: "Paris", rating: 5, text: "The Celestia is breathtaking. The packaging, the weight, the dial — pure art on my wrist." },
  { name: "Hamza Khan", city: "Lahore", rating: 5, text: "I gifted one to my father and he was moved to tears. Premium quality, fast delivery." },
  { name: "James Whitford", city: "London", rating: 5, text: "Tourbillon movement is flawless. Collector-grade craftsmanship at an honest price." }
];

function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
function esc(s) { return $("<div>").text(s == null ? "" : String(s)).html(); }
