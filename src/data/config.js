export const SITE_CONFIG = {
  brandName: "GSFlutes",
  tagline: "Where Every Breath Becomes Music",
  subTagline: "Crafted for Melody. Made for You.",
  announcementText: "✨ Free Express Delivery Across India on Orders Above ₹999 | 100% Tuned Bamboo Flutes",
  freeShippingThreshold: 999,
  shippingFlatRate: 99,
  
  // Official Contact Information
  contacts: [
    {
      name: "Dr. Ghanshyam Jagtap",
      role: "Co-Founder",
      phone: "+91 92090 69350",
      rawPhone: "919209069350",
      education: "BAMS — B. R. Harne Ayurvedic Medical College, Karav-Vangani, Mumbai",
      college: "B. R. Harne Ayurvedic Medical College, Karav-Vangani, Mumbai",
      degree: "BAMS",
      isPrimaryWhatsApp: true
    },
    {
      name: "Shubham Savita Sanjay Madane",
      role: "Co-Founder",
      phone: "+91 80551 13546",
      rawPhone: "918055113546",
      education: "M.Tech in Computer Science & Engineering — Government College of Engineering, Chhatrapati Sambhajinagar",
      college: "Government College of Engineering, Chhatrapati Sambhajinagar",
      degree: "M.Tech CSE",
      isPrimaryWhatsApp: false
    }
  ],

  // Primary WhatsApp number for direct chat widget
  whatsappNumber: "919209069350",
  whatsappDefaultMessage: "Hello GSFlutes! I am interested in purchasing a handcrafted bansuri flute.",

  // Store Location & Social
  email: "support@gsflutes.com",
  address: "GSFlutes Studio & Atelier, Maharashtra, India",
  copyrightYear: 2026,
  
  socialLinks: {
    instagram: "https://instagram.com/gsflutes",
    youtube: "https://youtube.com/@gsflutes",
    facebook: "https://facebook.com/gsflutes",
    whatsapp: "https://wa.me/919209069350"
  },

  // Promo / Discount Codes
  coupons: [
    {
      code: "FIRST10",
      discountPercentage: 10,
      description: "10% off for first-time buyers",
      minOrder: 500
    },
    {
      code: "GSFLUTE200",
      flatDiscount: 200,
      description: "Flat ₹200 off on orders above ₹1,499",
      minOrder: 1499
    },
    {
      code: "CONCERT500",
      flatDiscount: 500,
      description: "Flat ₹500 off on concert flutes above ₹2,499",
      minOrder: 2499
    }
  ]
};
