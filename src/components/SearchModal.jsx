import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/products';
import { formatINR } from './PriceDisplay';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim() === ''
    ? []
    : PRODUCTS_DATA.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.key.toLowerCase() === q ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.skillLevel.toLowerCase().includes(q)
        );
      });

  const handleSelectProduct = (slug) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const quickTags = ["C Natural", "D Natural", "E Bass", "Concert Bansuri", "Beginner Flutes", "Assam Bamboo"];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="search-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSearchSubmit} className="search-modal-header">
          <Search size={22} color="var(--color-amber)" />
          <input
            ref={inputRef}
            type="text"
            className="search-modal-input"
            placeholder="Search by key (C, D, E), category, or name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            className="action-btn"
            style={{ width: '34px', height: '34px' }}
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </form>

        {/* Quick Tag suggestions */}
        {query.trim() === '' && (
          <div style={{ padding: '1.25rem 1.5rem', background: 'var(--bg-surface)' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '700' }}>
              Popular Searches
            </span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    color: 'var(--text-main)'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        {query.trim() !== '' && (
          <div className="search-results-list">
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
              Found {filtered.length} flutes matching "{query}"
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No flutes found matching your search.</p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => handleSelectProduct(item.slug)}
                >
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="search-result-thumb"
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                        {item.name}
                      </span>
                      <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem' }}>
                        Key {item.key}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.category} • {item.skillLevel}
                    </span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontWeight: '800', color: 'var(--text-main)' }}>
                      {formatINR(item.price)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {filtered.length > 0 && (
          <div style={{ padding: '0.85rem 1.5rem', background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '0.4rem 1rem', fontSize: '0.82rem' }}
              onClick={handleSearchSubmit}
            >
              View All Results in Shop <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
