import { useState, useEffect, useRef } from "react";
export function useIntersectionObserver({
  rootMargin = "400px",
  threshold = 0,
  enabled = true,
} = {}) {
  const targetRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const node = targetRef.current;

    if (!node || !enabled) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      {
        rootMargin,
        threshold,
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [rootMargin, threshold, enabled]);

  return {targetRef, isIntersecting}
}
