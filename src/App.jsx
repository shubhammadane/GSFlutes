import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import QuickViewModal from './components/QuickViewModal';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

// Styles
import './styles/global.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/product.css';
import './styles/shop.css';
import './styles/cart.css';
import './styles/checkout.css';
import './styles/about.css';
import './styles/contact.css';
import './styles/footer.css';
import './styles/modal.css';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainApp() {
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="app-root">
      <ScrollToTop />

      {/* Main Navigation */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Routes */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home onQuickView={setQuickViewProduct} />} />
          <Route path="/shop" element={<Shop onQuickView={setQuickViewProduct} />} />
          <Route path="/product/:slug" element={<ProductDetails onQuickView={setQuickViewProduct} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist onQuickView={setQuickViewProduct} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Global Slide-In Cart Drawer */}
      <CartDrawer />

      {/* Global Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Global Floating Toasts */}
      <Toast />

      {/* Floating Direct WhatsApp Widget */}
      <FloatingWhatsApp />

      {/* Main Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </Router>
  );
}
