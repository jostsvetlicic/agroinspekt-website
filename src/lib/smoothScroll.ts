import type Lenis from "lenis";

/**
 * Shared handle to the single Lenis instance created in <SmoothScroll>.
 * GSAP ScrollTrigger reads it to stay in sync with the smooth-scroll position
 * (see HeroSequence). Null when Lenis is disabled (reduced motion / unmounted).
 */
let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;
