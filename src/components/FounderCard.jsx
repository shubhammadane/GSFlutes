import React from 'react';
import { Phone, MessageSquare, GraduationCap, Award } from 'lucide-react';

export default function FounderCard({ founder }) {
  return (
    <div className="founder-card">
      <div className="founder-img-frame">
        <img src={founder.image} alt={founder.name} loading="lazy" />
      </div>

      <div className="founder-card-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <h3 className="founder-name">{founder.name}</h3>
          <span className="badge badge-gold">{founder.badge}</span>
        </div>

        <span className="founder-role-badge">
          <Award size={13} /> {founder.shortRole || founder.role}
        </span>

        <div className="founder-education-box">
          <div className="edu-degree">
            <GraduationCap size={16} color="var(--color-amber)" />
            <span>{founder.education}</span>
          </div>
          <div className="edu-college">{founder.college}</div>
        </div>

        <p className="founder-bio">{founder.bio}</p>

        <div className="founder-connect-row">
          <a
            href={`tel:${founder.phone}`}
            className="founder-phone-link"
            title="Direct Phone Call"
          >
            <Phone size={15} color="var(--color-amber)" />
            <span>{founder.formattedPhone}</span>
          </a>

          <a
            href={founder.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem' }}
          >
            <MessageSquare size={13} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
