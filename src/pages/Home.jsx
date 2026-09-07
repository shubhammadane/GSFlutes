import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Volume2,
  Package,
  Award,
  Heart,
  Music,
  ShoppingBag,
  Star,
  Flame
} from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import RatingStars from '../components/RatingStars';
import { formatINR } from '../components/PriceDisplay';
import { PRODUCTS_DATA, getFeaturedProducts, getBestsellerProducts } from '../data/products';
import { CATEGORIES_DATA } from '../data/categories';
import { REVIEWS_DATA } from '../data/reviews';
import { FOUNDERS_DATA } from '../data/founders';
import { SITE_CONFIG } from '../data/config';
import heroBansuriImg from '../assets/images/hero_bansuri.jpg';
import craftsmanshipImg from '../assets/images/craftsmanship_studio.jpg';
import { useCart } from '../context/CartContext';

export default function Home({ onQuickView }) {
  const featuredFlutes = getFeaturedProducts().slice(0, 6);
  const bestsellers = getBestsellerProducts().slice(0, 4);
  const { addToCart } = useCart();

  const heroFeaturedProduct = PRODUCTS_DATA[0]; // C Natural Bansuri

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="hero-pill">
                <Sparkles size={14} />
                <span>Handcrafted Indian Bansuris</span>
              </div>

              <h1 className="hero-title">
                Let Your Music <span className="highlight">Speak.</span>
              </h1>

              <p className="hero-description">
                Discover handcrafted Indian Bansuris designed for soulful melodies, passionate learners, and concert stage musicians. Pure natural seasoned Assam bamboo calibrated to A=440Hz.
              </p>

              <div className="hero-cta-group">
                <Link to="/shop" className="btn btn-primary">
                  Explore All Flutes <ArrowRight size={17} />
                </Link>
                <Link to="/about" className="btn btn-outline">
                  Discover Our Story
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="hero-stats-row">
                <div className="hero-stat-item">
                  <span className="hero-stat-number">440Hz</span>
                  <span className="hero-stat-label">Concert Pitch</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">100%</span>
                  <span className="hero-stat-label">Natural Assam Cane</span>
                </div>
                <div className="hero-stat-item">
                  <span className="hero-stat-number">4.9 ★</span>
                  <span className="hero-stat-label">Musician Rating</span>
                </div>
              </div>
            </div>

            {/* Right Visual Image + Floating Cards */}
            <div className="hero-visual-wrapper">
              <div className="hero-image-frame">
                <img
                  src={heroBansuriImg}
                  alt="GSFlutes Handcrafted Bamboo Bansuri"
                  className="hero-main-img"
                />
              </div>

              {/* Floating Tone Badge */}
              <div className="floating-tone-badge">
                <Music size={15} color="var(--color-gold-light)" />
                <span>Indian Classical Tuning</span>
              </div>

              {/* Floating Product Card */}
              <div className="floating-hero-card">
                <div className="floating-card-icon">
                  <Music size={22} />
                </div>
                <div className="floating-card-info" style={{ flexGrow: 1 }}>
                  <h4>{heroFeaturedProduct.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '0.3rem' }}>
                    <RatingStars rating={heroFeaturedProduct.rating} size={12} showScore={false} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({heroFeaturedProduct.reviewsCount})</span>
                  </div>
                  <div className="floating-card-bottom">
                    <span className="floating-card-price">{formatINR(heroFeaturedProduct.price)}</span>
                    <button
                      className="floating-card-btn"
                      onClick={() => addToCart(heroFeaturedProduct, 1, true)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTS SECTION */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-tag">Curated Instruments</span>
          <h2 className="section-title">
            Featured <span className="gold-text">Flutes</span>
          </h2>
          <p className="section-subtitle">
            Handcrafted instruments for every musical journey — from foundational ragas to stage recitals.
          </p>
        </div>

        <ProductGrid products={featuredFlutes} onQuickView={onQuickView} />

        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <Link to="/shop" className="btn btn-secondary">
            View All Flutes &amp; Scales <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Find Your Range</span>
            <h2 className="section-title">
              Shop by <span className="gold-text">Category</span>
            </h2>
            <p className="section-subtitle">
              Choose the perfect bansuri designed for your specific playing experience and scale preference.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.id}
                to={`/shop?category=${encodeURIComponent(cat.name.replace(' Flutes', '').replace(' Bansuris', ''))}`}
                style={{
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all var(--transition-base)',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                className="category-card-item"
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden', background: '#EFEAE1' }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-slow)' }}
                  />
                  <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(30, 19, 12, 0.85)', color: '#FFFFFF', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '700' }}>
                    From {formatINR(cat.priceFrom)}
                  </div>
                </div>

                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '1.25rem', flexGrow: 1 }}>
                    {cat.tagline}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)', color: 'var(--color-amber)', fontWeight: '700', fontSize: '0.88rem' }}>
                    <span>Explore Collection</span>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE GSFLUTES (4 Feature Cards) */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-tag">The GSFlutes Standard</span>
          <h2 className="section-title">
            Why Choose <span className="gold-text">GSFlutes</span>
          </h2>
          <p className="section-subtitle">
            Every instrument represents our devotion to acoustic purity, master woodcraft, and musical resonance.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {/* Card 1 */}
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-full)', background: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', marginBottom: '1.25rem' }}>
              <Award size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Handcrafted Quality
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Carefully selected natural Assam bamboo, sun-cured over multiple seasons for flawless grain density and acoustic stability.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-full)', background: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', marginBottom: '1.25rem' }}>
              <Music size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Authentic Sound
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Precision-tuned to A=440Hz Hindustani classical standards. Deep, warm mandra tones and effortless high-octave meend.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-full)', background: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', marginBottom: '1.25rem' }}>
              <Sparkles size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              For Every Musician
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Tailored finger hole bevels for learners, versatile middle-octave keys for teachers, and master-grade sets for stage concertos.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ background: 'var(--bg-surface)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ width: '52px', height: '52px', borderRadius: 'var(--radius-full)', background: 'rgba(197, 160, 89, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', marginBottom: '1.25rem' }}>
              <Package size={26} />
            </div>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Carefully Packed
            </h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Every flute is encased in velvet and shipped in hard protective PVC tubes with 100% transit damage protection.
            </p>
          </div>
        </div>
      </section>

      {/* 5. ABOUT GSFLUTES TEASER & FOUNDERS */}
      <section className="section-padding" style={{ background: 'linear-gradient(180deg, #F8F4EC 0%, #F1E9DB 100%)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-tag">Our Heritage</span>
              <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
                Where Every Breath <br /><span className="gold-text">Becomes Music</span>
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
                Welcome to <strong>GSFlutes</strong>, your destination for premium Indian flutes and handcrafted Bansuris. We are dedicated to providing quality musical instruments crafted with care and precision for beginners, learners, and professional musicians.
              </p>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2rem' }}>
                Our goal is simple: <strong>To make authentic, beautiful, and accessible flutes available to every music lover.</strong>
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/about" className="btn btn-primary">
                  Meet the Founders &amp; Story <ArrowRight size={16} />
                </Link>
                <Link to="/contact" className="btn btn-outline">
                  Contact Us
                </Link>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.25rem' }}>
              {FOUNDERS_DATA.map((founder) => (
                <div key={founder.id} style={{ background: 'var(--bg-surface)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', border: '1px solid var(--border-subtle)', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <img
                    src={founder.image}
                    alt={founder.name}
                    style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-full)', objectFit: 'cover', objectPosition: 'center 15%', margin: '0 auto 1rem', border: '2px solid var(--color-gold)' }}
                  />
                  <h4 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-serif)', marginBottom: '0.2rem' }}>{founder.name}</h4>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-amber)', textTransform: 'uppercase' }}>{founder.role}</span>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    {founder.badge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BEST SELLERS SECTION */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-tag"><Flame size={14} /> Musician Favorites</span>
          <h2 className="section-title">
            Best Selling <span className="gold-text">Bansuris</span>
          </h2>
          <p className="section-subtitle">
            The most sought-after flutes celebrated for effortless embouchure and melodic richness.
          </p>
        </div>

        <ProductGrid products={bestsellers} onQuickView={onQuickView} />
      </section>

      {/* 7. CRAFTSMANSHIP BANNER */}
      <section style={{ position: 'relative', background: 'var(--bg-dark)', color: '#FFFFFF', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', minHeight: '480px' }}>
          <div style={{ padding: '5rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
            <span style={{ color: 'var(--color-gold-light)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              Atelier Craftsmanship
            </span>
            <h2 style={{ color: '#FFFFFF', fontSize: '2.5rem', fontFamily: 'var(--font-serif)', marginBottom: '1.25rem', lineHeight: '1.2' }}>
              Tuned by Master Ear. <br /><span style={{ color: 'var(--color-gold)' }}>Seasoned by Nature.</span>
            </h2>
            <p style={{ color: 'var(--text-light-muted)', fontSize: '1.05rem', lineHeight: '1.75', marginBottom: '2rem', maxWidth: '520px' }}>
              Unlike mass-manufactured flutes, every GSFlute undergoes 18+ individual acoustic tests. From the embouchure chimney depth to silk thread binding tensions, no detail is overlooked.
            </p>
            <div>
              <Link to="/shop" className="btn btn-primary">
                Browse Flute Atelier <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div style={{ position: 'relative', minHeight: '320px' }}>
            <img
              src={craftsmanshipImg}
              alt="GSFlutes Artisan Workshop"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, var(--bg-dark) 0%, transparent 40%)' }} />
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="section-tag">Verified Experiences</span>
          <h2 className="section-title">
            Words from <span className="gold-text">Musicians</span>
          </h2>
          <p className="section-subtitle">
            Read authentic feedback from learners, classical performers, and flute teachers across India.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {REVIEWS_DATA.slice(0, 3).map((review) => (
            <div
              key={review.id}
              style={{
                background: 'var(--bg-surface)',
                padding: '2rem',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <RatingStars rating={review.rating} size={15} showScore={false} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{review.date}</span>
              </div>

              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', marginBottom: '0.6rem' }}>
                "{review.title}"
              </h4>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: '1.65', marginBottom: '1.5rem', flexGrow: 1 }}>
                {review.comment}
              </p>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-main)' }}>
                    {review.name}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {review.city}
                  </div>
                </div>

                <span style={{ fontSize: '0.72rem', color: 'var(--color-success)', fontWeight: '700', background: 'rgba(42, 123, 76, 0.1)', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                  ✓ Verified Buyer
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TRUST BANNER */}
      <section style={{ background: 'var(--bg-secondary)', padding: '3rem 0', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShieldCheck size={28} color="var(--color-amber)" style={{ marginBottom: '0.6rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem' }}>100% Quality Checked</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Individually pitch-tested before shipping</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Package size={28} color="var(--color-amber)" style={{ marginBottom: '0.6rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem' }}>Secure Packaging</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Heavy-duty hard PVC tube casing</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CheckCircle2 size={28} color="var(--color-amber)" style={{ marginBottom: '0.6rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem' }}>Fast Delivery</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Free express shipping above ₹999</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Award size={28} color="var(--color-amber)" style={{ marginBottom: '0.6rem' }} />
              <h4 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '0.2rem' }}>Founder Support</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Direct guidance on flute key &amp; scale</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
