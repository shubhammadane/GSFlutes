import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export default function FloatingWhatsApp() {
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp-btn"
      aria-label="Chat with GSFlutes on WhatsApp"
      title="Direct WhatsApp Support"
    >
      <div className="whatsapp-pulse-ring" />
      <MessageCircle size={28} />
    </a>
  );
}
