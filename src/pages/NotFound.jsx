import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

/* Styles live in this file on purpose (single-file page).
   All selectors are prefixed with .nf so nothing leaks into the rest of the app. */
const css = `
.nf {
  --nf-primary: #6C5CE7;
  --nf-accent: #FD79A8;
  --nf-text: #2D2A4A;
  --nf-muted: #66628C;

  box-sizing: border-box;
  min-height: 75dvh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Poppins', system-ui, sans-serif;
  color: var(--nf-text);
}

[data-theme='dark'] .nf {
  --nf-primary: #A29BFE;
  --nf-text: #F4F3FF;
  --nf-muted: #B8B5D8;
}

.nf *,
.nf *::before,
.nf *::after {
  box-sizing: inherit;
}

/* 4 [logo] 4 */
.nf-code {
  display: inline-flex;
  align-items: center;
  gap: 0.02em;
  margin: 0 0 1.5rem;
  font-size: clamp(6.5rem, 28vw, 12rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--nf-primary);
  user-select: none;
}

.nf-mark {
  width: 0.78em;
  height: 0.78em;
  flex: none;
  overflow: visible;
}

.nf-ring {
  fill: none;
  stroke: currentColor;
  stroke-width: 12;
  stroke-linecap: round;
}

.nf-quotes {
  fill: currentColor;
}

.nf-dot {
  fill: var(--nf-accent);
}

.nf-title {
  margin: 0 0 0.75rem;
  font-size: clamp(1.5rem, 5vw, 2rem);
  font-weight: 600;
  line-height: 1.25;
}

.nf-text {
  max-width: 34ch;
  margin: 0 0 2rem;
  font-size: 1rem;
  line-height: 1.6;
  color: var(--nf-muted);
}

.nf-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.nf-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 1.5rem;
  border: 2px solid var(--nf-primary);
  border-radius: 999px;
  font: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.nf-btn--primary {
  background: #6C5CE7;
  border-color: #6C5CE7;
  color: #fff;
}

.nf-btn--primary:hover {
  background: #5B4BD5;
  border-color: #5B4BD5;
}

.nf-btn--ghost {
  background: transparent;
  color: var(--nf-primary);
}

.nf-btn--ghost:hover {
  background: color-mix(in srgb, var(--nf-primary) 12%, transparent);
}

.nf-btn:focus-visible {
  outline: 3px solid var(--nf-accent);
  outline-offset: 3px;
}

@media (max-width: 400px) {
  .nf-actions,
  .nf-btn {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nf-btn {
    transition: none;
  }
}
`;

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Qotdia"
        description="The page you are looking for does not exist."
        path="/404"
        noindex
      />
      <style>{css}</style>

      <main className="nf">
        <div className="nf-code" aria-hidden="true">
          <span>4</span>
          <svg className="nf-mark" viewBox="0 0 100 100" focusable="false">
            <circle className="nf-ring" cx="50" cy="50" r="40" strokeDasharray="216.4 34.9" transform="rotate(70 50 50)" />
            <g className="nf-quotes" transform="translate(4 -2)">
              <circle cx="34.2" cy="56" r="8" />
              <path d="M26.2 55 C26.2 45 31 38.5 40.5 35 L42.2 39.8 C37 42 34.5 45.5 34.5 50 Z" />
              <circle cx="56.2" cy="56" r="8" />
              <path d="M48.2 55 C48.2 45 53 38.5 62.5 35 L64.2 39.8 C59 42 56.5 45.5 56.5 50 Z" />
            </g>
            <circle className="nf-dot" cx="78.3" cy="78.3" r="10.5" />
          </svg>
          <span>4</span>
        </div>

        <h1 className="nf-title">Page not found</h1>
        <p className="nf-text">
          This page doesn&apos;t exist or has moved. Go back to today&apos;s quote or browse quotes by category.
        </p>

        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">Back to today&apos;s quote</Link>
          <Link to="/explore" className="nf-btn nf-btn--ghost">Explore quotes</Link>
        </div>
      </main>
    </>
  );
}

