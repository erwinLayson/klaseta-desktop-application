import { useEffect, useRef, useState } from "react";

/**
 * Observes an element's intersection with the viewport and marks it visible once.
 * Defaults to visible when `IntersectionObserver` is unavailable or reduced motion is preferred.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return prefersReduced || !("IntersectionObserver" in window);
  });

  useEffect(() => {
    if (isVisible) return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return { ref, isVisible };
}
