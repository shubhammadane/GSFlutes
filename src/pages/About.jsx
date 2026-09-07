import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Award, Music, BookOpen, Heart, ShieldCheck } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import FounderCard from '../components/FounderCard';
import { FOUNDERS_DATA } from '../data/founders';
import { SITE_CONFIG } from '../data/config';
import craftsmanshipImg from '../assets/images/craftsmanship_studio.jpg';
import bambooDetailImg from '../assets/images/bamboo_detail.jpg';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Header */}
      <div className="about-hero-section">
        <div className="container">
          <Breadcrumb items={[{ label: 'About Us' }]} />
          <span className="section-tag" style={{ marginTop: '1rem' }}>Our Heritage &amp; Vision</span>
          <h1 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1rem' }}>
            About <span style={{ color: 'var(--color-amber)' }}>GSFlutes</span>
          </h1>
          <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-serif)', fontStyle: 'italic', color: 'var(--color-gold-dark)', maxWidth: '650px', margin: '0 auto' }}>
            “Where Every Breath Becomes Music.”
          </p>
        </div>
      </div>

      {/* Brand Intro & Core Statement */}
      <div className="container">
        <div className="story-split-section">
          <div className="story-content">
            <span className="section-tag">Devotion to Melody</span>
            <h2>Crafted for Melody. <br /><span style={{ color: 'var(--color-amber)' }}>Made for You.</span></h2>

            <p>
              Welcome to <strong>GSFlutes</strong>, your destination for premium Indian flutes and handcrafted Bansuris. We are dedicated to providing quality musical instruments crafted with care and precision for beginners, learners, and professional musicians.
            </p>

            <p>
              Our goal is simple: <strong>To make authentic, beautiful, and accessible flutes available to every music lover.</strong>
            </p>

            <p>
              Rooted in centuries-old Indian classical traditions and perfected with meticulous acoustic physics, our instruments bridge the sacred sound of the guru-shishya parampara with modern concert-grade reliability.
            </p>

            <div style={{ marginTop: '2rem' }}>
              <Link to="/shop" className="btn btn-primary">
                Explore Flute Collection <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="story-image-wrap">
            <img
              src={craftsmanshipImg}
              alt="GSFlutes Bamboo Flute Atelier"
            />
          </div>
        </div>
      </div>

      {/* OUR STORY TIMELINE */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">The Timeline</span>
            <h2 className="section-title">
              Our <span className="gold-text">Story</span>
            </h2>
            <p className="section-subtitle">
              How a shared reverence for classical sound transformed into India's dedicated flute atelier.
            </p>
          </div>

          <div className="story-timeline">
            {/* Timeline 1 */}
            <div className="timeline-item">
              <div className="timeline-dot" />
              <h4>The Idea</h4>
              <p>
                GSFlutes began with a simple vision — to connect people with the timeless beauty of the Indian Bansuri. We noticed that aspiring musicians often struggled with poorly tuned, fragile instruments that hindered their learning. We set out to change that.
              </p>
            </div>

            {/* Timeline 2 */}
            <div className="timeline-item">
              <div className="timeline-dot" />
              <h4>The Craft</h4>
              <p>
                We focus on quality, craftsmanship, tuning, and musical experience. Sourcing only matured Assam bamboo (Bambusa Tulda), sun-seasoned for over 18 to 36 months, our team developed calibrated burnishing methods ensuring zero micro-pitch drift.
              </p>
            </div>

            {/* Timeline 3 */}
            <div className="timeline-item">
              <div className="timeline-dot" />
              <h4>The Journey</h4>
              <p>
                From first-time learners picking up their very first C Natural to experienced performers commanding the concert stage, GSFlutes aims to serve every flute enthusiast across India and the global diaspora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR FOUNDERS */}
      <section className="founders-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Leadership &amp; Direction</span>
            <h2 className="section-title">
              Our <span className="gold-text">Founders</span>
            </h2>
            <p className="section-subtitle">
              Meet the visionary minds driving technological precision and acoustic authenticity at GSFlutes.
            </p>
          </div>

          <div className="founders-grid">
            {FOUNDERS_DATA.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </div>
        </div>
      </section>

      {/* BAMBOO CRAFT PHILOSOPHY */}
      <section className="section-padding container">
        <div className="story-split-section" style={{ padding: 0 }}>
          <div className="story-image-wrap">
            <img
              src={bambooDetailImg}
              alt="Assam Bamboo Texture and Fine Threading"
            />
          </div>

          <div className="story-content">
            <span className="section-tag">Acoustic Purity</span>
            <h2>Why Assam Bamboo <br /><span style={{ color: 'var(--color-amber)' }}>Makes the Difference</span></h2>

            <p>
              In Indian classical music, the timber of the bansuri depends entirely on bamboo density, moisture equilibrium, and wall consistency.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <ShieldCheck size={22} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Aged Seasoning:</strong> We cure bamboo for years in controlled shade to neutralize organic sap and eliminate cracking.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Music size={22} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Precision Burnishing:</strong> Every finger hole is hand-burnished to eliminate turbulent air noise, creating a crystal-clear swara.
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Award size={22} color="var(--color-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <strong>Silk Thread Binding:</strong> High-tensile silk thread reinforces nodal points against changes in humidity and temperature.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
