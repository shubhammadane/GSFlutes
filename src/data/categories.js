import cNaturalImg from '../assets/products/c-natural/main.jpg';
import dNaturalImg from '../assets/products/d-natural/main.jpg';
import concertImg from '../assets/products/concert/main.jpg';
import bassImg from '../assets/products/bass/main.jpg';

export const CATEGORIES_DATA = [
  {
    id: "beginner",
    name: "Beginner Flutes",
    slug: "beginner",
    title: "Beginner Bansuris",
    tagline: "Start your musical journey with effortless blowing & light fingering.",
    image: cNaturalImg,
    itemCount: 4,
    priceFrom: 1299,
    popularKeys: ["C Medium", "G Base", "A Natural"]
  },
  {
    id: "intermediate",
    name: "Intermediate Flutes",
    slug: "intermediate",
    title: "Intermediate Bansuris",
    tagline: "For developing musicians mastering classical ragas & meend.",
    image: dNaturalImg,
    itemCount: 4,
    priceFrom: 1599,
    popularKeys: ["E Natural", "F Natural", "D Natural"]
  },
  {
    id: "professional",
    name: "Professional Flutes",
    slug: "professional",
    title: "Professional Flutes",
    tagline: "Precision instruments tuned to 440Hz for studio & recording.",
    image: bassImg,
    itemCount: 3,
    priceFrom: 1999,
    popularKeys: ["E Bass", "C Natural", "D Natural"]
  },
  {
    id: "concert",
    name: "Concert Bansuris",
    slug: "concert",
    title: "Concert Master Series",
    tagline: "Stage-ready masterpieces crafted from aged Assam bamboo.",
    image: concertImg,
    itemCount: 2,
    priceFrom: 2499,
    popularKeys: ["Concert Set", "Base C#", "Base D"]
  }
];
