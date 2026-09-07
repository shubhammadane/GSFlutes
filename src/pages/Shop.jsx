import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ArrowUpDown, Filter, RotateCcw, Search } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import Breadcrumb from '../components/Breadcrumb';
import { PRODUCTS_DATA } from '../data/products';

export default function Shop({ onQuickView }) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedKey, setSelectedKey] = useState(searchParams.get('key') || 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);

    const q = searchParams.get('search');
    if (q) setSearchQuery(q);

    const k = searchParams.get('key');
    if (k) setSelectedKey(k);
  }, [searchParams]);

  const categories = ['All', 'Beginner', 'Intermediate', 'Professional', 'Concert Flute'];
  const keys = ['All', 'C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const priceRanges = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under ₹1,500', value: 'under-1500', max: 1500 },
    { label: '₹1,500 – ₹2,000', value: '1500-2000', min: 1500, max: 2000 },
    { label: '₹2,000 – ₹3,000', value: '2000-3000', min: 2000, max: 3000 },
    { label: 'Above ₹3,000', value: 'above-3000', min: 3000 }
  ];
  const skillLevels = ['All', 'Beginner', 'Intermediate', 'Professional', 'Concert'];

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSelectedKey('All');
    setSelectedPriceRange('All');
    setSelectedSkill('All');
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  // Filter and Sort Pipeline
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      // 1. Search Query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          product.name.toLowerCase().includes(q) ||
          product.key.toLowerCase() === q ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.skillLevel.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // 2. Category filter
      if (selectedCategory !== 'All') {
        if (!product.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // 3. Key filter
      if (selectedKey !== 'All') {
        if (product.key !== selectedKey) {
          return false;
        }
      }

      // 4. Price range filter
      if (selectedPriceRange !== 'All') {
        const range = priceRanges.find((r) => r.value === selectedPriceRange);
        if (range) {
          if (range.min && product.price < range.min) return false;
          if (range.max && product.price > range.max) return false;
        }
      }

      // 5. Skill filter
      if (selectedSkill !== 'All') {
        if (!product.skillLevel.toLowerCase().includes(selectedSkill.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low-high') return a.price - b.price;
      if (sortBy === 'price-high-low') return b.price - a.price;
      if (sortBy === 'best-rated') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured default
    });
  }, [selectedCategory, selectedKey, selectedPriceRange, selectedSkill, sortBy, searchQuery]);

  const activeFiltersCount = [
    selectedCategory !== 'All',
    selectedKey !== 'All',
    selectedPriceRange !== 'All',
    selectedSkill !== 'All',
    searchQuery.trim() !== ''
  ].filter(Boolean).length;

  return (
    <div className="shop-page">
      {/* Header Banner */}
      <div className="shop-page-header">
        <div className="container">
          <Breadcrumb items={[{ label: 'Shop All Flutes' }]} />
          <h1 style={{ fontSize: '2.6rem', marginTop: '0.8rem', marginBottom: '0.5rem' }}>
            Explore Our <span style={{ color: 'var(--color-amber)' }}>Flutes</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Every flute is handcrafted from seasoned Assam bamboo, micro-tuned to A=440Hz, and acoustic-checked by our master artisans.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="shop-main-layout">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="filter-sidebar">
            <div className="filter-sidebar-header">
              <h3>
                <SlidersHorizontal size={18} color="var(--color-amber)" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="badge badge-gold" style={{ fontSize: '0.7rem' }}>
                    {activeFiltersCount}
                  </span>
                )}
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  className="clear-filters-btn"
                  onClick={handleClearFilters}
                >
                  Reset All
                </button>
              )}
            </div>

            {/* Filter 1: Category */}
            <div className="filter-group">
              <h4 className="filter-group-title">Category</h4>
              <div className="filter-options-list">
                {categories.map((cat) => (
                  <label key={cat} className="filter-checkbox-label">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 2: Key / Scale */}
            <div className="filter-group">
              <h4 className="filter-group-title">Key / Scale</h4>
              <div className="key-pills-grid">
                {keys.map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`key-pill-btn ${selectedKey === k ? 'active' : ''}`}
                    onClick={() => setSelectedKey(k)}
                  >
                    {k === 'All' ? 'All' : `Key ${k}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter 3: Price Range */}
            <div className="filter-group">
              <h4 className="filter-group-title">Price Range</h4>
              <div className="filter-options-list">
                {priceRanges.map((range) => (
                  <label key={range.value} className="filter-checkbox-label">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === range.value}
                      onChange={() => setSelectedPriceRange(range.value)}
                    />
                    <span>{range.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Filter 4: Skill Level */}
            <div className="filter-group">
              <h4 className="filter-group-title">Skill Level</h4>
              <div className="filter-options-list">
                {skillLevels.map((lvl) => (
                  <label key={lvl} className="filter-checkbox-label">
                    <input
                      type="radio"
                      name="skillLevel"
                      checked={selectedSkill === lvl}
                      onChange={() => setSelectedSkill(lvl)}
                    />
                    <span>{lvl}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN PRODUCT LISTING COLUMN */}
          <main>
            {/* Toolbar */}
            <div className="shop-toolbar">
              <div className="results-count">
                Showing <strong>{filteredProducts.length}</strong> of <strong>{PRODUCTS_DATA.length}</strong> bansuri flutes
                {searchQuery && <span> for "<strong>{searchQuery}</strong>"</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <button
                  type="button"
                  className="mobile-filter-trigger-btn"
                  onClick={() => setIsMobileFiltersOpen(true)}
                >
                  <Filter size={15} />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}</span>
                </button>

                <div className="shop-sort-controls">
                  <ArrowUpDown size={15} color="var(--text-muted)" />
                  <select
                    className="shop-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    aria-label="Sort products by"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="best-rated">Highest Customer Rating</option>
                    <option value="newest">New Releases</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFiltersCount > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Category: {selectedCategory}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('All')} />
                  </span>
                )}
                {selectedKey !== 'All' && (
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Key: {selectedKey}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedKey('All')} />
                  </span>
                )}
                {selectedPriceRange !== 'All' && (
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Price: {priceRanges.find(r => r.value === selectedPriceRange)?.label}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedPriceRange('All')} />
                  </span>
                )}
                {selectedSkill !== 'All' && (
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Skill: {selectedSkill}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSelectedSkill('All')} />
                  </span>
                )}
                {searchQuery && (
                  <span className="badge badge-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    Search: "{searchQuery}"
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} />
                  </span>
                )}
                <button
                  onClick={handleClearFilters}
                  style={{ fontSize: '0.8rem', color: 'var(--color-amber)', textDecoration: 'underline', marginLeft: '0.5rem' }}
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid
              products={filteredProducts}
              onQuickView={onQuickView}
              emptyMessage={`No flutes found matching your filter selections. Try clearing your filters.`}
            />
          </main>
        </div>
      </div>

      {/* MOBILE FILTER BOTTOM DRAWER */}
      <div
        className={`mobile-drawer-overlay ${isMobileFiltersOpen ? 'open' : ''}`}
        onClick={() => setIsMobileFiltersOpen(false)}
      />

      <div className={`mobile-filter-drawer ${isMobileFiltersOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <SlidersHorizontal size={18} color="var(--color-amber)" />
            <span>Filter Flutes</span>
          </h3>
          <button
            className="action-btn"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile Filter Category */}
        <div className="filter-group">
          <h4 className="filter-group-title">Category</h4>
          <div className="filter-options-list">
            {categories.map((cat) => (
              <label key={cat} className="filter-checkbox-label">
                <input
                  type="radio"
                  name="mob-cat"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Filter Key */}
        <div className="filter-group">
          <h4 className="filter-group-title">Key / Scale</h4>
          <div className="key-pills-grid">
            {keys.map((k) => (
              <button
                key={k}
                type="button"
                className={`key-pill-btn ${selectedKey === k ? 'active' : ''}`}
                onClick={() => setSelectedKey(k)}
              >
                {k === 'All' ? 'All' : `Key ${k}`}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Filter Price */}
        <div className="filter-group">
          <h4 className="filter-group-title">Price Range</h4>
          <div className="filter-options-list">
            {priceRanges.map((range) => (
              <label key={range.value} className="filter-checkbox-label">
                <input
                  type="radio"
                  name="mob-price"
                  checked={selectedPriceRange === range.value}
                  onChange={() => setSelectedPriceRange(range.value)}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            className="btn btn-outline"
            style={{ flex: 1 }}
            onClick={handleClearFilters}
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            style={{ flex: 1 }}
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            Apply Filters ({filteredProducts.length})
          </button>
        </div>
      </div>
    </div>
  );
}
