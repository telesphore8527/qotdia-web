import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiCopy, FiExternalLink, FiMail } from 'react-icons/fi';
import { SITE } from '../../config/site';
import './LegalPages.css';

/* ---------- Page shell: sticky sub-header + scrollable content ---------- */
export function LegalLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    // If the page was opened directly (no history), fall back to Settings.
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/settings', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="legal-page">
      <header className="legal-header">
        <button type="button" className="legal-back" onClick={goBack} aria-label="Go back">
          <FiArrowLeft size={20} aria-hidden="true" />
        </button>
        <div className="legal-header__text">
          <h1 className="legal-header__title">{title}</h1>
          {subtitle && <p className="legal-header__subtitle">{subtitle}</p>}
        </div>
      </header>

      <main className="legal-content">{children}</main>
    </div>
  );
}

/* ---------- Card section ---------- */
export function LegalSection({ icon: Icon, title, children }) {
  return (
    <section className="legal-card">
      <h2 className="legal-card__title">
        {Icon && (
          <span className="legal-card__icon" aria-hidden="true">
            <Icon size={16} />
          </span>
        )}
        {title}
      </h2>
      <div className="legal-card__body">{children}</div>
    </section>
  );
}

/* ---------- Contact card (mailto + copy + Gmail web) ---------- */
export function ContactCard({ subject = 'Qotdia – Feedback', description }) {
  const [copied, setCopied] = useState(false);
  const email = SITE.contactEmail;
  const encodedSubject = encodeURIComponent(subject);

  const mailtoHref = `mailto:${email}?subject=${encodedSubject}`;
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodedSubject}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Fallback for older browsers / insecure contexts
      const input = document.createElement('input');
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="legal-contact">
      {description && <p className="legal-contact__text">{description}</p>}
      <p className="legal-contact__email">{email}</p>

      <div className="legal-contact__actions">
        <a className="legal-btn legal-btn--primary" href={mailtoHref}>
          <FiMail size={16} aria-hidden="true" />
          Send an email
        </a>
        <button type="button" className="legal-btn" onClick={copyEmail}>
          {copied ? <FiCheck size={16} aria-hidden="true" /> : <FiCopy size={16} aria-hidden="true" />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
        </button>
      </div>

      <a className="legal-link" href={gmailHref} target="_blank" rel="noopener noreferrer">
        Open in Gmail on the web
        <FiExternalLink size={13} aria-hidden="true" />
      </a>
    </div>
  );
}
