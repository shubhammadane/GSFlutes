import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Music, Sparkles } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SITE_CONFIG } from '../data/config';

export default function Navbar({ onOpenSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItemsCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <AnnouncementBar />

      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="brand-logo" onClick={closeMobileMenu}>
            <div className="logo-icon-wrap">
              <Music size={20} color="var(--color-gold-light)" />
            </div>
            <div className="logo-text-group">
              <span className="brand-name">
                GS<span>Flutes</span>
              </span>
              <span className="brand-subtext">Acoustic Atelier</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav aria-label="Main Navigation">
            <ul className="nav-menu">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Shop Flutes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* Right Action Icons */}
          <div className="nav-actions">
            {/* Search Trigger */}
            <button
              type="button"
              className="action-btn"
              onClick={onOpenSearch}
              aria-label="Search Flutes"
              title="Search Flutes"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="action-btn"
              aria-label="View Wishlist"
              title="View Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="action-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              className="action-btn"
              onClick={openCart}
              aria-label="Open Shopping Cart"
              title="Shopping Cart"
            >
              <ShoppingBag size={19} />
              {totalItemsCount > 0 && (
                <span className="action-badge">{totalItemsCount}</span>
              )}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="action-btn hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`mobile-drawer-overlay ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      />

      <div className={`mobile-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="brand-logo">
            <div className="logo-icon-wrap" style={{ width: '36px', height: '36px' }}>
              <Music size={17} color="var(--color-gold-light)" />
            </div>
            <span className="brand-name" style={{ fontSize: '1.35rem' }}>
              GS<span>Flutes</span>
            </span>
          </div>
          <button
            className="action-btn"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <ul className="drawer-nav-list">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Shop All Flutes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              About Us & Founders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Contact & Support
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/wishlist"
              className={({ isActive }) => `drawer-nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Wishlist ({wishlistCount})
            </NavLink>
          </li>
        </ul>

        <div className="drawer-footer">
          <button
            className="btn btn-primary"
            style={{ width: '100%' }}
            onClick={() => {
              closeMobileMenu();
              openCart();
            }}
          >
            <ShoppingBag size={17} /> View Cart ({totalItemsCount})
          </button>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </div>
    </>
  );
}
