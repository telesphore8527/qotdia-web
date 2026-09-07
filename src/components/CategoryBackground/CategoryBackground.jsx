/**
 * src/components/quote/CategoryBackground.jsx
 * ------------------------------------------------------------------
 * Composant "bête" (dumb component) : il ne connaît que le slug de
 * catégorie et une date. Il ne sait rien de la citation elle-même,
 * ce qui le rend réutilisable partout où on affiche un fond de
 * catégorie : Accueil, cartes Explorer, cartes Favoris, etc.
 *
 * Flux de données (résumé) :
 *   categorySlug + date
 *        ↓
 *   getCategoryVisual(slug)   → { shape, gradient }   [categoryVisuals.js]
 *        ↓
 *   buildSeed(date, slug)     → "2026-08-14__motivation"
 *        ↓
 *   generateBackground(...)   → { gradientFrom, gradientTo, layers }
 *        ↓
 *   <svg> avec dégradé + paths des silhouettes, rendu ici
 */
import './CategoryBackground.css'
import { useMemo } from 'react';
import { getCategoryVisual } from '../../config/categoryVisuals';
// import { generateBackground, buildSeed } from '../../lib/backgroundGenerator';
import { generateBackground, buildSeed } from '../../lib/backgroundGenerator';

/**
 * @param {string} categorySlug - ex: "motivation", "self-confidence"
 * @param {string} [date]       - format "YYYY-MM-DD". Par défaut : aujourd'hui.
 *                                 Permet de forcer une date précise (utile
 *                                 pour tester ou pour l'écran Explorer qui
 *                                 affiche des citations d'autres jours).
 * @param {React.ReactNode} [children] - le contenu à afficher PAR-DESSUS
 *                                 le fond (texte de citation, badge, etc.)
 */
export default function CategoryBackground({ categorySlug, date, children }) {
  // today calculé une seule fois par rendu, pas besoin d'un state pour ça.
  const isoDate = date ?? new Date().toISOString().slice(0, 10);

  // useMemo : on ne veut RECALCULER le SVG que si le slug ou la date
  // changent. Sans ça, chaque re-render du parent (ex: un clic sur le
  // cœur "favoris" à côté) régénérerait inutilement toute la silhouette.
  const background = useMemo(() => {
    const { shape, gradient } = getCategoryVisual(categorySlug);
    const seed = buildSeed(isoDate, categorySlug);
    return generateBackground(shape, gradient, seed);
  }, [categorySlug, isoDate]);

  const gradientId = `bg-gradient-${categorySlug}`;

  return (
    <div className="category-background">
      <svg
        viewBox={`0 0 ${background.width} ${background.height}`}
        preserveAspectRatio="xMidYMid slice"
        className="category-background__svg"
      >
        <defs>
          {/* Le dégradé de ciel, propre à cette catégorie */}
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={background.gradientFrom} />
            <stop offset="100%" stopColor={background.gradientTo} />
          </linearGradient>
        </defs>

        <rect width={background.width} height={background.height} fill={`url(#${gradientId})`} />

        {/* Les couches de silhouette, de la plus lointaine à la plus proche */}
        {background.layers.map((layer, index) => (
          <path
            key={index}
            d={layer.path}
            fill="#000000"
            fillOpacity={layer.fillOpacity}
          />
        ))}
      </svg>

      {/* Le scrim : voile sombre en bas pour garder le texte lisible,
          quelle que soit la catégorie ou la luminosité du dégradé. */}
      <div className="category-background__scrim" />

      {/* Le contenu (citation, badge catégorie, bouton favoris...)
          passé par le composant parent (DailyQuoteCard). */}
      <div className="category-background__content">{children}</div>
    </div>
  );
}
