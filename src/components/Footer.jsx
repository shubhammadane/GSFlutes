import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Music, MessageCircle, Send, CheckCircle2, Globe, Share2 } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';
import { useToast } from '../context/ToastContext';

// Clean SVG icons for social platforms
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    addToast('Thank you for subscribing to GSFlutes melodies & updates!', 'success');
    setEmail('');
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-brand-col">
            <div className="footer-brand-name">
              GS<span>Flutes</span>
            </div>
            <div className="footer-tagline">“{SITE_CONFIG.tagline}”</div>
            <p className="footer-desc">
              Dedicated to crafting authentic Indian bamboo Bansuris with traditional precision, seasoned Assam bamboo, and concert-grade 440Hz acoustic tuning.
            </p>

            <div className="footer-founders-note">
              <strong>Founded by:</strong> Shubham Savita Sanjay Madane (M.Tech CSE), Dr. Ghanshyam Jagtap (BAMS) &amp; Ajay Chandanshive (Disciple of Pt. Prashant Agnihotri Sir).
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="footer-title">Explore</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/">Home</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/shop">Shop All Flutes</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/about">About Our Atelier</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact">Founder Contacts</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/wishlist">Your Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="footer-title">Support &amp; Care</h4>
            <ul className="footer-links-list">
              <li className="footer-link-item">
                <Link to="/contact#faq">Bamboo Flute Care Guide</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact#faq">440Hz Acoustic Calibration</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact#faq">Shipping &amp; Transit Safety</Link>
              </li>
              <li className="footer-link-item">
                <Link to="/contact">Custom Scale Inquiries</Link>
              </li>
              <li className="footer-link-item">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20GSFlutes%2C%20I%20need%20help%20choosing%20a%20flute.`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Direct WhatsApp Help
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="footer-newsletter-col">
            <h4 className="footer-title">Stay in Tune</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-light-muted)' }}>
              Get updates about new seasoned bamboo batches, raga masterclasses, and exclusive festive discounts.
            </p>

            {subscribed ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold-light)', padding: '1rem 0', fontWeight: '600' }}>
                <CheckCircle2 size={18} />
                <span>You are subscribed to GSFlutes!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="newsletter-form">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            )}

            <div className="footer-social-row">
              <a
                href={SITE_CONFIG.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Follow GSFlutes on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GSFlutes YouTube channel"
              >
                <YoutubeIcon />
              </a>
              <a
                href={SITE_CONFIG.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="GSFlutes Facebook page"
              >
                <FacebookIcon />
              </a>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Chat with GSFlutes on WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div>
            &copy; {SITE_CONFIG.copyrightYear} {SITE_CONFIG.brandName}. All Rights Reserved. Crafted with reverence for Indian classical music.
          </div>
          <div className="footer-bottom-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Service</Link>
            <Link to="/contact">Transit Insurance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
