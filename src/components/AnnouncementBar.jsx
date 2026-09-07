import React from 'react';
import { Sparkles, Truck } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

export default function AnnouncementBar() {
  return (
    <div className="announcement-bar">
      <Truck size={15} />
      <span>{SITE_CONFIG.announcementText}</span>
      <Sparkles size={14} />
    </div>
  );
}
