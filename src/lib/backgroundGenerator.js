/**
 * src/lib/backgroundGenerator.js
 * ------------------------------------------------------------------
 * Toute la logique de génération procédurale, ISOLÉE de React.
 *
 * Pourquoi séparer ça dans lib/ et pas dans le composant :
 * - C'est du JS pur (pas de JSX, pas de hooks) → testable avec un
 *   simple `console.log`, sans monter de composant.
 * - Réutilisable ailleurs si un jour tu veux générer ces mêmes
 *   backgrounds côté backend (ex: pour les images de partage
 *   générées avec Intervention Image) en portant cette logique en PHP.
 * - Si tu changes de lib d'UI un jour (React → autre chose), ce
 *   fichier ne bouge pas d'un octet.
 */

// ------------------------------------------------------------------
// 1. GÉNÉRATEUR DE NOMBRES PSEUDO-ALÉATOIRES (PRNG) AVEC SEED
// ------------------------------------------------------------------
// Pourquoi on n'utilise PAS Math.random() :
// Math.random() donne un résultat différent à chaque appel, donc
// impossible de reproduire "la même image pour la même date".
// mulberry32 est un PRNG déterministe : avec la même seed (nombre
// de départ), il produit TOUJOURS la même suite de nombres.
// C'est ce qui permet "même background toute la journée, change le
// lendemain" sans jamais stocker l'image choisie en base.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296; // → nombre entre 0 et 1
  };
}

// mulberry32 attend un nombre en entrée, pas une chaîne de caractères.
// hashString transforme n'importe quelle chaîne (ex: "2026-08-14motivation")
// en un nombre stable : la même chaîne donne toujours le même nombre.
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

// ------------------------------------------------------------------
// 2. CONSTRUCTION D'UNE COURBE DE SILHOUETTE (une "crête")
// ------------------------------------------------------------------
/**
 * Construit un `path` SVG représentant une ligne de crête (montagne,
 * dune, vague...) qui part de la gauche, ondule vers la droite, puis
 * redescend fermer la forme en bas de l'image.
 *
 * @param {function} rng       - le générateur seedé (issu de mulberry32)
 * @param {number} width       - largeur du SVG
 * @param {number} baseY       - hauteur de départ de la crête
 * @param {number} amplitude   - à quel point les pics montent/descendent
 * @param {number} points      - nombre de sommets (plus = plus détaillé)
 * @param {boolean} smooth     - true = courbes douces (vagues),
 *                                false = angles nets (montagnes/pics)
 */
function ridgePath(rng, width, baseY, amplitude, points, smooth) {
  const pts = [[0, baseY]];
  const step = width / points;

  for (let i = 1; i <= points; i++) {
    const x = i * step;
    // Combine un peu de hasard (rng()) avec une oscillation régulière
    // (Math.sin) pour éviter des formes trop chaotiques.
    const y = baseY - rng() * amplitude - amplitude * 0.3 * Math.sin(i * 1.3);
    pts.push([x, y]);
  }
  // Ferme la forme : redescend tout en bas puis revient à gauche,
  // pour que le path délimite bien une zone remplissable.
  pts.push([width, baseY + 200], [0, baseY + 200]);

  if (!smooth) {
    // Ligne brisée classique : angles nets → look "montagne/pic"
    return 'M' + pts.map((p) => p.join(',')).join(' L') + ' Z';
  }

  // Courbe lissée (approximation Catmull-Rom simplifiée en Q Bézier)
  // → look "vague" avec des transitions douces entre les points.
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 2; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[i + 1];
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    d += ` Q${x1},${y1} ${cx},${cy}`;
  }
  d += ` L${width},${baseY + 200} L0,${baseY + 200} Z`;
  return d;
}

// ------------------------------------------------------------------
// 3. PROFILS DE FORME (une par valeur possible de `shape` dans
//    categoryVisuals.js). C'est ICI qu'on ajouterait une 5e forme
//    si tu en as besoin un jour.
// ------------------------------------------------------------------
const SHAPE_PROFILES = {
  peaks: { layers: 3, points: 8, smooth: false, amplitudeRange: [70, 130] },
  waves: { layers: 3, points: 6, smooth: true, amplitudeRange: [40, 90] },
  dunes: { layers: 3, points: 5, smooth: true, amplitudeRange: [50, 100] },
  mountains: { layers: 4, points: 9, smooth: false, amplitudeRange: [60, 140] },
};

// ------------------------------------------------------------------
// 4. FONCTION PRINCIPALE EXPORTÉE
// ------------------------------------------------------------------
/**
 * Génère les données nécessaires pour dessiner un background complet :
 * le dégradé de fond + les paths SVG de chaque couche de silhouette.
 *
 * Le composant React (CategoryBackground.jsx) appelle cette fonction
 * et se contente d'injecter le résultat dans du JSX. Aucune logique
 * de génération ne vit dans le composant lui-même.
 *
 * @param {string} shape      - 'peaks' | 'waves' | 'dunes' | 'mountains'
 * @param {[string,string]} gradient - [couleur haut, couleur bas]
 * @param {string} seed       - chaîne unique servant de graine
 *                               (typiquement `date + slug de catégorie`)
 * @param {number} width      - largeur du viewBox SVG (défaut 400)
 * @param {number} height     - hauteur du viewBox SVG (défaut 711, ratio 9:16)
 */
export function generateBackground(shape, gradient, seed, width = 400, height = 711) {
  const profile = SHAPE_PROFILES[shape] ?? SHAPE_PROFILES.waves;
  const rng = mulberry32(hashString(seed));

  const layers = [];
  for (let i = 0; i < profile.layers; i++) {
    // Chaque couche démarre un peu plus bas que la précédente,
    // pour créer un effet de profondeur (parallaxe visuelle statique).
    const baseY = height * (0.5 + i * (0.4 / profile.layers));

    const [minAmp, maxAmp] = profile.amplitudeRange;
    const amplitude = minAmp + rng() * (maxAmp - minAmp);

    const path = ridgePath(rng, width, baseY, amplitude, profile.points, profile.smooth);

    // Les couches les plus proches (index élevé) sont plus sombres,
    // pour renforcer l'illusion de profondeur, comme du vrai brouillard.
    const darkness = 0.35 + i * 0.18;

    layers.push({ path, fillOpacity: Math.min(darkness, 0.95) });
  }

  return {
    width,
    height,
    gradientFrom: gradient[0],
    gradientTo: gradient[1],
    layers,
  };
}

/**
 * Petit utilitaire pour construire la seed de façon cohérente partout
 * dans l'app. Centraliser ce format évite qu'un composant fasse
 * `date + slug` et un autre `slug + date` par erreur, ce qui
 * changerait le résultat généré.
 *
 * @param {string} isoDate - date au format "YYYY-MM-DD"
 * @param {string} categorySlug
 */
export function buildSeed(isoDate, categorySlug) {
  return `${isoDate}__${categorySlug}`;
}
