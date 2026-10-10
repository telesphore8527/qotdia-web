import { useCallback, useEffect, useRef, useState } from 'react';

function downloadBlob(blob, filename) {
  const href = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = href;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(href), 1000);
}

async function fetchImageFile(imageUrl, filename, signal) {
  const res = await fetch(imageUrl, { signal });
  if (!res.ok) throw new Error(`Image request failed (${res.status})`);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || 'image/jpeg' });
}

/**
 * Partage une image via la feuille de partage native (WhatsApp, Facebook...),
 * avec téléchargement en secours.
 *
 * @param {string} imageUrl  URL complète de l'image (format jpg/png, pas webp)
 * @param {string} filename  Nom du fichier partagé
 */
export function useShareImage(imageUrl, filename = 'qotdia.jpg') {
  const [status, setStatus] = useState('idle'); // idle | loading | shared | downloaded | error
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  // Préchargement : le fichier est prêt avant le clic, ce qui préserve le
  // "geste utilisateur" exigé par navigator.share (strict sur Safari/iOS).
  useEffect(() => {
    if (!imageUrl) return undefined;
    const controller = new AbortController();
    fileRef.current = null;

    fetchImageFile(imageUrl, filename, controller.signal)
      .then((file) => {
        fileRef.current = file;
      })
      .catch(() => {
        /* silencieux : share() retentera au clic */
      });

    return () => controller.abort();
  }, [imageUrl, filename]);

  const share = useCallback(async () => {
    if (!imageUrl) return 'error';
    setError(null);

    try {
      let file = fileRef.current;
      if (!file) {
        setStatus('loading');
        file = await fetchImageFile(imageUrl, filename);
        fileRef.current = file;
      }

      if (navigator.canShare?.({ files: [file] })) {
        try {
          await navigator.share({ files: [file] });
          setStatus('shared');
          return 'shared';
        } catch (err) {
          if (err?.name === 'AbortError') {
            setStatus('idle'); // l'utilisateur a fermé la feuille de partage
            return 'cancelled';
          }
          if (err?.name !== 'NotAllowedError') throw err;
          // NotAllowedError : geste expiré, on bascule sur le téléchargement
        }
      }

      downloadBlob(file, filename);
      setStatus('downloaded');
      return 'downloaded';
    } catch (err) {
      setError(err);
      setStatus('error');
      return 'error';
    }
  }, [imageUrl, filename]);

  const canShareFiles =
    typeof navigator !== 'undefined' && typeof navigator.canShare === 'function';

  return { share, status, error, isLoading: status === 'loading', canShareFiles };
}