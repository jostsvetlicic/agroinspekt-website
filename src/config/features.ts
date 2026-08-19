/**
 * Feature flags for content that depends on facts the client must confirm.
 * Everything here defaults to OFF so nothing unverified is shown. Flip a flag
 * to `true` once the real data has been collected and filled into the matching
 * config/dictionary entry.
 */
export const features = {
  /**
   * Show the real accreditation / certification logo grid on the
   * "Standards & method" section. Keep false until the client confirms which
   * certifications they hold and supplies logos + scopes; until then a
   * finished standards statement is shown instead of empty logo slots.
   */
  showAccreditationLogos: false,

  /**
   * Show the "Team" section on the About page. Keep false until the client
   * supplies names, roles, qualifications and photos of key people.
   */
  showTeam: false,

  /**
   * Homepage hero style. "classic" = a single full-bleed hero (Hero): the value
   * proposition and audience are stated immediately, the image is fully visible
   * (never hidden behind a scroll trigger), and motion is a restrained load
   * fade. This matches the serious inspection-firm benchmark (SGS, Bureau
   * Veritas). "sequence" = the pinned horizontal three-slide variant
   * (HeroSequence), kept in the codebase; flip this to use it.
   */
  heroVariant: "sequence" as "sequence" | "classic",
} as const;
