/**
 * src/config/categoryVisuals.js
 * ------------------------------------------------------------------
 * SOURCE DE VÉRITÉ UNIQUE pour l'identité visuelle de chaque catégorie.
 *
 * Pourquoi ce fichier existe séparément :
 * - Si demain tu changes une couleur, tu touches UNE ligne ici,
 *   jamais un composant React.
 * - Ce fichier ne contient AUCUNE logique, que des données statiques.
 *   Ça le rend trivial à tester, à faire relire, ou même à générer
 *   plus tard depuis ta table `categories` en base si tu automatises.
 *
 * Structure de chaque entrée :
 * - shape    : la famille de silhouette à utiliser (doit correspondre
 *              à une des fonctions génératrices dans backgroundGenerator.js)
 * - gradient : [couleur du haut du ciel, couleur du bas / horizon]
 *              toujours donné dans cet ordre (haut → bas)
 */


export const CATEGORY_VISUALS = {
  motivation: {
    shape: 'peaks',
    gradient: ['#6C5CE7', '#2D3436'],
  },
  success: {
    shape: 'peaks',
    gradient: ['#FDCB6E', '#7A3B1E'],
  },
  perseverance: {
    shape: 'peaks',
    gradient: ['#4834D4', '#1E272E'],
  },
  career: {
    shape: 'peaks',
    gradient: ['#34495E', '#1B2631'],
  },

  wisdom: {
    shape: 'waves',
    gradient: ['#00B894', '#1B2A2E'],
  },
  philosophy: {
    shape: 'waves',
    gradient: ['#4B6584', '#1E2A38'],
  },
  learning: {
    shape: 'waves',
    gradient: ['#00CEC9', '#23414A'],
  },
  hope: {
    shape: 'waves',
    gradient: ['#74B9FF', '#2C3E66'],
  },

  love: {
    shape: 'dunes',
    gradient: ['#FD79A8', '#4A2040'],
  },
  relationships: {
    shape: 'dunes',
    gradient: ['#FAB1A0', '#6B3226'],
  },
  happiness: {
    shape: 'dunes',
    gradient: ['#FFD93D', '#B8621B'],
  },

  'self-confidence': {
    shape: 'mountains',
    gradient: ['#A29BFE', '#2D3436'],
  },
};

/**
 * Valeurs de secours (fallback), utilisées si jamais une catégorie
 * n'est pas encore référencée dans la map ci-dessus (ex : tu ajoutes
 * une 13e catégorie côté backend et tu oublies de mettre à jour ce
 * fichier). Ça évite un crash ou un fond blanc en prod.
 */
export const DEFAULT_VISUAL = {
  shape: 'waves',
  gradient: ['#636E72', '#2D3436'],
};

/**
 * Petit accesseur pratique : évite de dupliquer la logique de fallback
 * partout où on a besoin de lire cette config.
 *
 * @param {string} slug - le slug de catégorie (ex: "motivation")
 * @returns {{shape: string, gradient: [string, string]}}
 */
export function getCategoryVisual(slug) {
  return CATEGORY_VISUALS[slug] ?? DEFAULT_VISUAL;
}















export const CATEGORY_COLORS = {
  motivation: {
    bg: 'rgba(108, 92, 231, 0.5)',
    text: '#6C5CE7',
    icon: 'LuBook'
  },
  success: {
    bg: 'rgba(253, 203, 110, 0.5)',
    text: '#FDCB6E',
    icon: 'LuBook'
  },
  perseverance: {
    bg: 'rgba(72, 52, 212, 0.5)',
    text: '#4834D4',
    icon: 'LuBook'
  },
  career: {
    bg: 'rgba(52, 73, 94, 0.5)',
    text: '#34495E',
    icon: 'LuBook'
  },

  wisdom: {
    bg: 'rgba(0, 184, 148, 0.5)',
    text: '#00B894',
    icon: 'LuBook'
  },
  philosophy: {
    bg: 'rgba(75, 101, 132, 0.5)',
    text: '#4B6584',
    icon: 'LuBook'
  },
  learning: {
    bg: 'rgba(0, 206, 201, 0.5)',
    text: '#00CEC9',
    icon: 'LuBook'
  },
  hope: {
    bg: 'rgba(116, 185, 255, 0.5)',
    text: '#74B9FF',
    icon: 'LuBook'
  },

  love: {
    bg: 'rgba(253, 121, 168, 0.5)',
    text: '#FD79A8',
    icon: 'LuBook'
  },
  relationships: {
    bg: 'rgba(250, 177, 160, 0.5)',
    text: '#FAB1A0',
    icon: 'LuBook'
  },
  happiness: {
    bg: 'rgba(255, 217, 61, 0.5)',
    text: '#FFD93D',
    icon: 'LuBook'
  },

  'self-confidence': {
    bg: 'rgba(162, 155, 254, 0.5)',
    text: '#A29BFE',
    icon: 'LuBook'
  },
};

export const DEFAULT_COLORS = {
  bg: 'rgba(45, 52, 54, 0.5)',
  text: '#2D3436',
  icon: 'LuBook'
};


export function getCategoryColors(slug) {
  return CATEGORY_COLORS[slug] ?? DEFAULT_COLORS;
}
