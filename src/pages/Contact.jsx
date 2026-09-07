import React, { useState } from 'react';
import { Phone, MessageSquare, Send, Mail, MapPin, ChevronDown, CheckCircle2, Clock } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { FOUNDERS_DATA } from '../data/founders';
import { SITE_CONFIG } from '../data/config';
import { useToast } from '../context/ToastContext';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const { addToast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Please enter a valid email';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject';
    if (!formData.message.trim() || formData.message.length < 10) errs.message = 'Please enter a message (min 10 characters)';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      addToast('Please complete all required fields.', 'warning');
      return;
    }

    setIsSent(true);
    addToast('Your message has been sent to GSFlutes team! We will get back to you shortly.', 'success');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const faqs = [
    {
      q: "Which bansuri key is best for a beginner?",
      a: "For beginners, we recommend starting with a C Natural Medium (19 inches) or G Base (25 inches). The C Natural has comfortable finger spacing and lightweight breath resistance, making sound production easy on the first day."
    },
    {
      q: "How are GSFlutes tuned and tested?",
      a: "Every single flute at GSFlutes is hand-voiced and tested against a digital chromatic strobe tuner calibrated to A=440Hz standard pitch. We test all 12 swaras across 2.5 octaves to ensure accurate microtonal intervals (Shruti)."
    },
    {
      q: "How is the flute packed for shipping?",
      a: "Each flute is wrapped in a soft velvet sleeve and secured inside a heavy-duty, crush-proof PVC protective tube with shock-absorbent bubble cushioning. We provide 100% transit insurance."
    },
    {
      q: "How should I maintain and oil my bamboo flute?",
      a: "Store your flute in a temperate environment away from direct sunlight and sudden AC air drafts. We recommend applying 2–3 drops of pure mustard or sweet almond oil inside the bore every 3 to 4 months to nourish the seasoned bamboo."
    }
  ];

  return (
    <div className="contact-page">
      {/* Header Banner */}
      <div className="contact-hero-section">
        <div className="container">
          <Breadcrumb items={[{ label: 'Contact Us' }]} />
          <h1 style={{ fontSize: '2.8rem', marginTop: '0.8rem', marginBottom: '0.5rem' }}>
            Get in <span style={{ color: 'var(--color-amber)' }}>Touch</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Have questions regarding key selection, custom tuning, or wholesale orders? Speak directly with our founders and craft experts.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout-grid">
          {/* LEFT: FOUNDER CONTACT CARDS */}
          <div className="contact-info-column">
            <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-serif)', marginBottom: '0.5rem' }}>
              Direct Founder Contacts
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              Feel free to call or WhatsApp us for personalized guidance on choosing the right scale.
            </p>

            {FOUNDERS_DATA.map((founder) => (
              <div key={founder.id} className="contact-founder-card">
                <div className="contact-founder-header">
                  <div className="contact-founder-avatar">
                    <img src={founder.image} alt={founder.name} />
                  </div>
                  <div className="contact-founder-title">
                    <h3>{founder.name}</h3>
                    <span>{founder.role}</span>
                  </div>
                </div>

                <div className="contact-edu-note">
                  <strong>Education:</strong> {founder.education} — {founder.college}
                </div>

                <div className="contact-action-buttons">
                  <a
                    href={`tel:${founder.phone}`}
                    className="contact-btn-phone"
                  >
                    <Phone size={14} />
                    <span>Call {founder.phone}</span>
                  </a>

                  <a
                    href={founder.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-btn-whatsapp"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}

            {/* General Info Card */}
            <div style={{ background: 'var(--bg-surface)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Mail size={18} color="var(--color-amber)" />
                <span style={{ fontSize: '0.92rem', fontWeight: '600' }}>{SITE_CONFIG.email}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <Clock size={18} color="var(--color-amber)" />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>Mon - Sat: 9:00 AM – 8:00 PM IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <MapPin size={18} color="var(--color-amber)" />
                <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{SITE_CONFIG.address}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Fill out the form below and our acoustic team will respond within 24 hours.
            </p>

            {isSent ? (
              <div style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
                <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
                <h4 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Message Sent Successfully!</h4>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Thank you for reaching out. We will get back to your inquiry promptly.
                </p>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setIsSent(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  {errors.name && <span className="form-error-msg">{errors.name}</span>}
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Address <span className="req">*</span></label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. you@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <span className="form-error-msg">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number <span className="req">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject <span className="req">*</span></label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Flute Scale Inquiry, Custom Order, Bulk Purchase"
                    value={formData.subject}
                    onChange={handleInputChange}
                  />
                  {errors.subject && <span className="form-error-msg">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Message / Requirement <span className="req">*</span></label>
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Tell us what you are looking for..."
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                  {errors.message && <span className="form-error-msg">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem' }}
                >
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ ACCORDION */}
      <section id="faq" className="faq-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Got Questions?</span>
            <h2 className="section-title">
              Frequently Asked <span className="gold-text">Questions</span>
            </h2>
            <p className="section-subtitle">
              Quick answers about our bamboo seasoning, acoustic tuning calibration, and shipping.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openFaq === i ? 'rotate(180deg)' : 'none',
                      transition: 'transform var(--transition-fast)'
                    }}
                  />
                </div>
                {openFaq === i && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
