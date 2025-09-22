export type Hotspot = {
  id: string;
  position: [number, number, number];
  title: string;
  description: string;
};

export type Product = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  modelUrl?: string;
  fallbackShape: "bottle" | "capsule" | "cube" | "pitcher" | "pouch";
  price: number;
  priceId: string;
  highlights: string[];
  hotspots: Hotspot[];
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "hydro-sport-h2",
    title: "HydroSport H2",
    tagline: "Hydrogen power, gym ready",
    description:
      "Portable hydrogen bottle delivering 2.4ppm infusion in 3 minutes. Built for performance and recovery.",
    modelUrl: undefined,
    fallbackShape: "bottle",
    price: 199,
    priceId: "price_hydrosport",
    highlights: ["2.4ppm H₂ infusion", "USB-C fast charge", "3-year warranty"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Hydrogen charge in 3 min.",
        position: [0.25, 0.35, 0.2]
      },
      {
        id: "specs",
        title: "Specs",
        description: "600ml Tritan, dual chamber",
        position: [-0.32, 0.15, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Bundle with electrolyte pack",
        position: [0, -0.4, 0.25]
      }
    ],
    featured: true
  },
  {
    slug: "glass-balance",
    title: "Glass Balance",
    tagline: "Minimal glass hydration",
    description:
      "Hand-blown borosilicate glass with silicone sleeve. Keeps infusion crisp at home or studio.",
    modelUrl: undefined,
    fallbackShape: "capsule",
    price: 64,
    priceId: "price_glassbalance",
    highlights: ["Dishwasher safe", "600ml capacity", "Thermal sleeve"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Infuse citrus + herbs.",
        position: [0.2, 0.25, 0.3]
      },
      {
        id: "specs",
        title: "Specs",
        description: "Borosilicate, BPA free",
        position: [-0.28, 0.1, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Pairs with mineral filter",
        position: [0, -0.35, 0.2]
      }
    ],
    featured: true
  },
  {
    slug: "ro-ultra",
    title: "RO Ultra",
    tagline: "Countertop RO ritual",
    description:
      "Five-stage reverse osmosis in a countertop format. Mineral-balanced water ready on demand.",
    modelUrl: undefined,
    fallbackShape: "cube",
    price: 529,
    priceId: "price_roultra",
    highlights: ["5-stage filtration", "2.2L internal tank", "Voice assistant ready"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Family hydration hub.",
        position: [0.35, 0.25, 0.25]
      },
      {
        id: "specs",
        title: "Specs",
        description: "Mineral cartridge + UV",
        position: [-0.3, 0.1, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Install in under 10 min",
        position: [0, -0.25, 0.3]
      }
    ],
    featured: true
  },
  {
    slug: "electrolyte-charge",
    title: "Electrolyte Charge",
    tagline: "Pocket fuel",
    description:
      "Travel-ready electrolyte sachets balanced for endurance and all-day hydration.",
    modelUrl: undefined,
    fallbackShape: "pouch",
    price: 28,
    priceId: "price_electrolyte",
    highlights: ["Magnesium + potassium", "Zero sugar", "14 sachets"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Add to 600ml water.",
        position: [0.25, 0.15, 0.2]
      },
      {
        id: "specs",
        title: "Specs",
        description: "Natural citrus flavor",
        position: [-0.25, 0.2, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Subscribe & save 15%",
        position: [0, -0.25, 0.2]
      }
    ]
  },
  {
    slug: "filter-flow",
    title: "Filter Flow",
    tagline: "Everyday clarity",
    description:
      "Under-sink filter kit with mineral boost. Install without tools in under 5 minutes.",
    modelUrl: undefined,
    fallbackShape: "pitcher",
    price: 189,
    priceId: "price_filterflow",
    highlights: ["Mineral boost", "DIY install", "Smart change alerts"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Instant mineral boost.",
        position: [0.2, 0.25, 0.2]
      },
      {
        id: "specs",
        title: "Specs",
        description: "NSF certified filters",
        position: [-0.25, 0.1, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Auto-ship refills",
        position: [0, -0.3, 0.25]
      }
    ]
  },
  {
    slug: "hydro-kettle",
    title: "Hydro Kettle",
    tagline: "Tea, tonics, hydration",
    description:
      "Precision electric kettle with mineral infusion mode and hydration reminders.",
    modelUrl: undefined,
    fallbackShape: "capsule",
    price: 159,
    priceId: "price_hydrokettle",
    highlights: ["Precision pour", "Infusion mode", "App connected"],
    hotspots: [
      {
        id: "use",
        title: "Use",
        description: "Mineral infusion mode.",
        position: [0.3, 0.3, 0.25]
      },
      {
        id: "specs",
        title: "Specs",
        description: "1.2L, 1200W",
        position: [-0.25, 0.1, 0]
      },
      {
        id: "buy",
        title: "Buy",
        description: "Bundle with glass bottle",
        position: [0, -0.35, 0.2]
      }
    ]
  }
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const featuredProducts = products.filter((product) => product.featured);
