import React from 'react';
import { Link } from 'react-router-dom';
import { Music, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container section-padding" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '88px', height: '88px', borderRadius: 'var(--radius-full)', background: 'var(--bg-secondary)', border: '2px solid var(--color-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-amber)', margin: '0 auto 1.5rem' }}>
        <Music size={44} />
      </div>

      <span className="badge badge-gold" style={{ marginBottom: '1rem' }}>404 Not Found</span>
      <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>
        This Melody Cannot Be Found
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
        The page or flute you were looking for doesn't exist or has traveled to another frequency.
      </p>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/" className="btn btn-primary">
          Return Home <ArrowRight size={16} />
        </Link>
        <Link to="/shop" className="btn btn-outline">
          Explore Flutes
        </Link>
      </div>
    </div>
  );
}
