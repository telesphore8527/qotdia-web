import { Link } from 'react-router-dom';
import {
  FiChevronRight,
  FiCode,
  FiInfo,
  FiLock,
  FiMail,
  FiWifiOff,
  FiHeart,
} from 'react-icons/fi';
import { SITE } from '../../config/site';
import { ContactCard, LegalLayout, LegalSection } from './LegalLayout';
import Seo from '../../components/Seo';

export default function About() {
  const initials = SITE.creator
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    
    <LegalLayout title="About Qotdia" subtitle="Version, creator and contact">
      <Seo
  title="About Qotdia – Your Daily Quote App"
  description="Qotdia delivers one carefully chosen quote every day, organized by category. Learn about the project and the person behind it."
  path="/about"
/>

      <div className="legal-hero">
        <div className="legal-hero__logo" aria-hidden="true">
          <img src="/logo.png" alt={SITE.name} />
        </div>
        <h2 className="legal-hero__name">{SITE.name}</h2>
        <p className="legal-hero__tagline">One thoughtful quote a day, kept on your device.</p>
        <span className="legal-badge">v{SITE.version}</span>
      </div>

      <LegalSection icon={FiInfo} title="What is Qotdia?">
        <p>
          Qotdia is a daily quote app. Each day you get one quote to start with, and you can
          explore thousands more by theme, author or mood, then save the ones that matter to you.
        </p>
        <p>It installs like an app and keeps working when you have no connection.</p>
      </LegalSection>

      <LegalSection icon={FiHeart} title="What it stands for">
        <ul className="legal-features">
          <li>
            <span className="legal-features__icon" aria-hidden="true">
              <FiWifiOff size={18} />
            </span>
            <div>
              <strong>Works offline</strong>
              <span>Your favorites and cached quotes are available without a network.</span>
            </div>
          </li>
          <li>
            <span className="legal-features__icon" aria-hidden="true">
              <FiLock size={18} />
            </span>
            <div>
              <strong>Private by design</strong>
              <span>No account, no ads and no tracking. Your data stays on your device.</span>
            </div>
          </li>
          <li>
            <span className="legal-features__icon" aria-hidden="true">
              <FiCode size={18} />
            </span>
            <div>
              <strong>Independent</strong>
              <span>Designed and built by one developer, with care for the details.</span>
            </div>
          </li>
        </ul>
      </LegalSection>

      <LegalSection icon={FiCode} title="Creator">
        <div className="legal-creator">
          <div className="legal-creator__avatar" aria-hidden="true">
            {initials}
          </div>
          <div>
            <strong className="legal-creator__name">{SITE.creator}</strong>
            <span className="legal-creator__role">
              {SITE.creatorRole} · {SITE.country}
            </span>
          </div>
        </div>
      </LegalSection>

      <LegalSection icon={FiMail} title="Contact">
        <ContactCard
          subject="Qotdia – Feedback"
          description="Found a bug, have an idea or want to say hello? Write to the creator directly."
        />
      </LegalSection>

      <LegalSection title="Legal">
        <ul className="legal-links">
          <li>
            <Link to="/privacy">
              Privacy Policy <FiChevronRight size={18} aria-hidden="true" />
            </Link>
          </li>
          <li>
            <Link to="/terms">
              Terms of Service <FiChevronRight size={18} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </LegalSection>

      <p className="legal-footer">
        © {new Date().getFullYear()} {SITE.name} · {SITE.creator}
      </p>
    </LegalLayout>
  );
}
