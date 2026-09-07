import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)' }}>
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight size={13} color="var(--border-subtle)" />
          {item.path ? (
            <Link to={item.path} style={{ color: 'var(--text-secondary)' }}>
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--color-amber)', fontWeight: '600' }}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
