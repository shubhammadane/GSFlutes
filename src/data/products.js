import cNaturalImg from '../assets/products/c-natural/main.jpg';
import dNaturalImg from '../assets/products/d-natural/main.jpg';
import eNaturalImg from '../assets/products/e-natural/main.jpg';
import fNaturalImg from '../assets/products/f-natural/main.jpg';
import gNaturalImg from '../assets/products/g-natural/main.jpg';
import concertImg from '../assets/products/concert/main.jpg';
import bassImg from '../assets/products/bass/main.jpg';
import detailImg from '../assets/images/bamboo_detail.jpg';
import heroImg from '../assets/images/hero_bansuri.jpg';

export const PRODUCTS_DATA = [
  {
    id: 1,
    name: "C Natural Medium Bansuri",
    slug: "c-natural-bansuri",
    shortTitle: "C Natural (19\")",
    price: 1499,
    oldPrice: 1799,
    discount: 17,
    category: "Beginner",
    key: "C",
    pitch: "C Natural Medium",
    audioFreq: 523.25, // C5 frequency for tone generator
    material: "Natural Seasoned Assam Bamboo",
    finish: "Hand-polished Natural Oil Wax",
    skillLevel: "Beginner / Intermediate",
    approxLength: "19 inches",
    tuning: "Indian Classical (A=440Hz)",
    threadColor: "Maroon & Golden Zari",
    rating: 4.9,
    reviewsCount: 38,
    stock: 14,
    featured: true,
    bestseller: true,
    isNew: false,
    description: "A beautifully balanced natural bamboo bansuri designed to produce warm, soulful tones with effortless airflow. Perfect for beginners and devotional raga learners.",
    longDescription: "Handcrafted from matured, aged Assam bamboo with consistent internal bore diameter. Each finger hole is precision-burnished by master artisans to deliver accurate microtonal intonation (Shruti). Comes with protective velvet and hard-shell flute carry cover.",
    specifications: [
      { label: "Key / Scale", value: "C Natural (Middle Octave)" },
      { label: "Length", value: "Approx. 19 inches (48 cm)" },
      { label: "Diameter", value: "Approx. 20 mm" },
      { label: "Material", value: "Grade-A Assam Bamboo (Bambusa Tulda)" },
      { label: "Blowing Hole", value: "Oval precision chamfered" },
      { label: "Tuning Calibration", value: "A=440Hz Hindustani Classical" },
      { label: "Includes", value: "Waterproof Padded Cover + Certificate" }
    ],
    images: [cNaturalImg, detailImg, heroImg]
  },
  {
    id: 2,
    name: "D Natural Medium Bansuri",
    slug: "d-natural-bansuri",
    shortTitle: "D Natural (17.5\")",
    price: 1599,
    oldPrice: 1899,
    discount: 16,
    category: "Intermediate",
    key: "D",
    pitch: "D Natural Medium",
    audioFreq: 587.33,
    material: "Selected Straight-Grain Bamboo",
    finish: "Hand-polished Shellac & Linseed",
    skillLevel: "Intermediate",
    approxLength: "17.5 inches",
    tuning: "A=440Hz Concert Standard",
    threadColor: "Saffron Orange & Gold",
    rating: 4.8,
    reviewsCount: 29,
    stock: 11,
    featured: true,
    bestseller: false,
    isNew: false,
    description: "Crisp, sweet, and melodious D Natural Bansuri tailored for fast taans, folk melodies, and light classical renditions.",
    longDescription: "The D Natural flute offers a brighter resonance and comfortable finger spacing that makes ornamentations like Murki, Khatka, and Gamak exceedingly fluid. Crafted from seasoned bamboo sun-cured over 18 months.",
    specifications: [
      { label: "Key / Scale", value: "D Natural" },
      { label: "Length", value: "Approx. 17.5 inches (44.5 cm)" },
      { label: "Material", value: "Seasoned Assam Bamboo" },
      { label: "Tuning Standard", value: "440Hz / 432Hz option" },
      { label: "Includes", value: "Padded Case & Fingering Chart" }
    ],
    images: [dNaturalImg, detailImg, heroImg]
  },
  {
    id: 3,
    name: "E Natural Medium Bansuri",
    slug: "e-natural-bansuri",
    shortTitle: "E Natural (15.5\")",
    price: 1699,
    oldPrice: 1999,
    discount: 15,
    category: "Intermediate",
    key: "E",
    pitch: "E Natural Medium",
    audioFreq: 659.25,
    material: "Hand-picked Bamboo Cane",
    finish: "Natural Satin Luster",
    skillLevel: "Intermediate / Professional",
    approxLength: "15.5 inches",
    tuning: "Indian Classical A=440Hz",
    threadColor: "Emerald Green & Gold",
    rating: 4.9,
    reviewsCount: 42,
    stock: 9,
    featured: true,
    bestseller: true,
    isNew: false,
    description: "Rich harmonic balance with exceptional high-register clarity. Ideal for classical performances, accompaniment, and studio recording.",
    longDescription: "Known as one of the most versatile flutes in Indian semiclassical music, this E Natural instrument responds instantaneously to subtle changes in embouchure and breath pressure.",
    specifications: [
      { label: "Key / Scale", value: "E Natural (Safed 3)" },
      { label: "Length", value: "Approx. 15.5 inches (39.5 cm)" },
      { label: "Material", value: "High-density Forest Bamboo" },
      { label: "Tuning", value: "A=440Hz Pitch Master Calibrated" },
      { label: "Includes", value: "Velvet Sleeve + Hard Travel Tube" }
    ],
    images: [eNaturalImg, detailImg, heroImg]
  },
  {
    id: 4,
    name: "F Natural Medium Bansuri",
    slug: "f-natural-bansuri",
    shortTitle: "F Natural (14.5\")",
    price: 1799,
    oldPrice: 2099,
    discount: 14,
    category: "Intermediate",
    key: "F",
    pitch: "F Natural Medium",
    audioFreq: 698.46,
    material: "Dense Wall Assam Bamboo",
    finish: "Silken Hand-rubbed Finish",
    skillLevel: "Intermediate",
    approxLength: "14.5 inches",
    tuning: "A=440Hz Strict Calibration",
    threadColor: "Royal Blue & Gold Zari",
    rating: 4.8,
    reviewsCount: 21,
    stock: 8,
    featured: true,
    bestseller: false,
    isNew: true,
    description: "Vibrant high-frequency projection with velvet warmth in the lower mandra saptak notes. Tuned for fusion, bhajan, and classical music.",
    longDescription: "Featuring unique royal blue silk thread reinforcement to prevent hairline bamboo expansion across varying humidity conditions. Meticulously voiced for sharp intonation.",
    specifications: [
      { label: "Key / Scale", value: "F Natural" },
      { label: "Length", value: "Approx. 14.5 inches (37 cm)" },
      { label: "Material", value: "Natural Seasoned Bamboo" },
      { label: "Includes", value: "Protective Flute Cover" }
    ],
    images: [fNaturalImg, detailImg, heroImg]
  },
  {
    id: 5,
    name: "G Natural Base / Medium Bansuri",
    slug: "g-natural-bansuri",
    shortTitle: "G Natural (25\")",
    price: 1899,
    oldPrice: 2299,
    discount: 17,
    category: "Beginner",
    key: "G",
    pitch: "G Natural Base",
    audioFreq: 392.00,
    material: "Selected Thick-Wall Bamboo",
    finish: "Smooth Matt Bamboo Finish",
    skillLevel: "Beginner / Intermediate",
    approxLength: "25 inches",
    tuning: "A=440Hz Pure Tone",
    threadColor: "Deep Maroon & Gold",
    rating: 4.9,
    reviewsCount: 35,
    stock: 15,
    featured: true,
    bestseller: true,
    isNew: false,
    description: "The classic guru-shishya training flute. Wide, soothing acoustic sound column that opens up meditative breathing and raga elaboration.",
    longDescription: "Favored by teachers across India for beginner foundation due to its deeply resonant, unhurried frequency and grounding low notes. Generates rich undertones.",
    specifications: [
      { label: "Key / Scale", value: "G Natural Base (Safed 5)" },
      { label: "Length", value: "Approx. 25 inches (63.5 cm)" },
      { label: "Material", value: "Aged Assam Bamboo" },
      { label: "Includes", value: "Flute Cover + Tuning Report" }
    ],
    images: [gNaturalImg, detailImg, heroImg]
  },
  {
    id: 6,
    name: "Professional Concert Bansuri (Master Series)",
    slug: "professional-concert-bansuri",
    shortTitle: "Concert Master Bansuri",
    price: 2499,
    oldPrice: 2999,
    discount: 17,
    category: "Concert Flute",
    key: "C",
    pitch: "C Natural Concert Grade",
    audioFreq: 523.25,
    material: "3-Year Sun-Aged Wild Bamboo",
    finish: "Master Lacquer & Crimson Threadwork",
    skillLevel: "Professional / Concert",
    approxLength: "19.5 inches",
    tuning: "440Hz Micro-tuned for Classical Stage",
    threadColor: "Crimson Red & Heavy Gold Zari",
    rating: 5.0,
    reviewsCount: 47,
    stock: 5,
    featured: true,
    bestseller: true,
    isNew: true,
    description: "Our flagship concert flute crafted for stage maestros. Flawless harmonic projection, rich volume, and surgical intonation accuracy across 2.5 octaves.",
    longDescription: "Each Concert Master Series flute is hand-voiced by our senior master craftsman with individual pitch testing across all 12 swaras. Comes inside an authentic deluxe wooden collector's box with velvet cushioning.",
    specifications: [
      { label: "Grade", value: "Concert Stage Master Series" },
      { label: "Key / Scale", value: "C Natural Concert Edition" },
      { label: "Curing Time", value: "Over 36 months seasoned bamboo" },
      { label: "Box", value: "Premium Walnut Finish Wooden Box included" },
      { label: "Tuning Guarantee", value: "Zero Deviation 440Hz calibrated" }
    ],
    images: [concertImg, detailImg, heroImg]
  },
  {
    id: 7,
    name: "Deep E Bass Concert Bansuri",
    slug: "deep-e-bass-bansuri",
    shortTitle: "E Bass (30\")",
    price: 2799,
    oldPrice: 3499,
    discount: 20,
    category: "Professional",
    key: "E",
    pitch: "E Bass (Mandra)",
    audioFreq: 329.63,
    material: "Rare Large-Bore Assam Bamboo",
    finish: "Dark Antique Torched Finish",
    skillLevel: "Professional",
    approxLength: "30 inches",
    tuning: "A=440Hz Deep Meditative",
    threadColor: "Crimson & Antique Brass Thread",
    rating: 4.9,
    reviewsCount: 19,
    stock: 4,
    featured: false,
    bestseller: false,
    isNew: true,
    description: "Deep, cavernous bass frequencies that reverberate with meditative tranquility. Designed for Dhrupad, Alaap, and cinematic scores.",
    longDescription: "Crafted from rare wide-bore aged bamboo trees harvested in the valleys of Assam. Requires seasoned finger reach and produces unparalleled low sound resonance.",
    specifications: [
      { label: "Key / Scale", value: "E Bass (Low Octave)" },
      { label: "Length", value: "Approx. 30 inches (76 cm)" },
      { label: "Bore Diameter", value: "Approx. 26 mm" },
      { label: "Skill Requirement", value: "Large finger stretch recommended" },
      { label: "Includes", value: "Heavy Duty Padded Bag" }
    ],
    images: [bassImg, detailImg, heroImg]
  },
  {
    id: 8,
    name: "A Natural Medium Bansuri",
    slug: "a-natural-bansuri",
    shortTitle: "A Natural (22.5\")",
    price: 1649,
    oldPrice: 1999,
    discount: 18,
    category: "Beginner",
    key: "A",
    pitch: "A Natural Medium",
    audioFreq: 440.00,
    material: "Natural Assam Bamboo",
    finish: "Natural Herbal Oil Treatment",
    skillLevel: "Beginner / Intermediate",
    approxLength: "22.5 inches",
    tuning: "Standard A=440Hz",
    threadColor: "Maroon & Gold",
    rating: 4.8,
    reviewsCount: 26,
    stock: 12,
    featured: false,
    bestseller: false,
    isNew: false,
    description: "Universal tuning standard (A440). Highly popular among students and cross-genre fusion musicians looking for sweet resonance.",
    longDescription: "The A Natural bansuri aligns directly with western orchestra concert pitch A440 while retaining the authentic Indian microtonal character. Very smooth embouchure response.",
    specifications: [
      { label: "Key / Scale", value: "A Natural (Kali 4 / 440Hz Base)" },
      { label: "Length", value: "Approx. 22.5 inches (57 cm)" },
      { label: "Includes", value: "Soft Velvet Carrying Case" }
    ],
    images: [cNaturalImg, detailImg, heroImg]
  },
  {
    id: 9,
    name: "B Natural Medium Bansuri",
    slug: "b-natural-bansuri",
    shortTitle: "B Natural (21\")",
    price: 1549,
    oldPrice: 1849,
    discount: 16,
    category: "Intermediate",
    key: "B",
    pitch: "B Natural Medium",
    audioFreq: 493.88,
    material: "Assam Golden Bamboo",
    finish: "Hand-buffed Wax",
    skillLevel: "Intermediate",
    approxLength: "21 inches",
    tuning: "A=440Hz",
    threadColor: "Olive Green & Gold",
    rating: 4.7,
    reviewsCount: 16,
    stock: 7,
    featured: false,
    bestseller: false,
    isNew: false,
    description: "Intimate, warm acoustic timbre that transitions beautifully between classical thumri and contemporary instrumental solos.",
    longDescription: "Built with tight tolerances to prevent temperature-induced pitch drift. Tested across all swaras for smooth transition from lower to higher octave.",
    specifications: [
      { label: "Key / Scale", value: "B Natural" },
      { label: "Length", value: "Approx. 21 inches (53 cm)" },
      { label: "Includes", value: "Padded Travel Sleeve" }
    ],
    images: [eNaturalImg, detailImg, heroImg]
  },
  {
    id: 10,
    name: "Master Concert Set (Set of 3 Flutes: C, E, G)",
    slug: "master-concert-set-3-flutes",
    shortTitle: "Concert Trio Set",
    price: 4999,
    oldPrice: 6299,
    discount: 21,
    category: "Concert Flute",
    key: "C",
    pitch: "C, E & G Natural Concert Set",
    audioFreq: 523.25,
    material: "Matched Aging Assam Bamboo Set",
    finish: "Deluxe Red Velvet Boxed Set",
    skillLevel: "Professional / Concert",
    approxLength: "15.5\" to 25\"",
    tuning: "A=440Hz Perfectly Timbre-Matched",
    threadColor: "Imperial Gold & Crimson Red",
    rating: 5.0,
    reviewsCount: 15,
    stock: 3,
    featured: true,
    bestseller: true,
    isNew: true,
    description: "The ultimate performer's kit containing 3 master-grade concert flutes (C Natural, E Natural, and G Base) housed in a handcrafted velvet wooden casket.",
    longDescription: "All three flutes are harvested from the same seasoned bamboo batch to ensure harmonious tonal color and identical acoustic warmth when switching flutes during a recital.",
    specifications: [
      { label: "Set Contents", value: "C Natural (19\"), E Natural (15.5\"), G Base (25\")" },
      { label: "Casing", value: "Handcrafted Velvet Lined Wooden Chest" },
      { label: "Tuning Report", value: "Hand-signed master acoustic calibration sheet" },
      { label: "Warranty", value: "Lifetime bamboo seasoning guarantee" }
    ],
    images: [concertImg, detailImg, heroImg]
  }
];

// Helper functions for data queries
export function getAllProducts() {
  return PRODUCTS_DATA;
}

export function getProductBySlug(slug) {
  return PRODUCTS_DATA.find((p) => p.slug === slug);
}

export function getProductById(id) {
  return PRODUCTS_DATA.find((p) => p.id === Number(id));
}

export function getFeaturedProducts() {
  return PRODUCTS_DATA.filter((p) => p.featured);
}

export function getBestsellerProducts() {
  return PRODUCTS_DATA.filter((p) => p.bestseller);
}

export function getRelatedProducts(currentId, category, limit = 4) {
  return PRODUCTS_DATA.filter((p) => p.id !== currentId && p.category === category)
    .slice(0, limit);
}
