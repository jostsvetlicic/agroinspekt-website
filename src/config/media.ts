/**
 * ============================================================================
 *  IMAGERY MAP  -  every photo used on the site.
 * ----------------------------------------------------------------------------
 *  These are the client's OWN photographs, downloaded from agroinspekt.si and
 *  stored in /public/img. Swap any `src` for a higher-resolution original when
 *  the client supplies one; the `swap` note says what would improve the shot.
 * ============================================================================
 */

export interface MediaItem {
  src: string;
  alt: string;
  swap: string; // note: how the client could improve this image
}

export const media = {
  // Full-bleed homepage hero - the client's marine/vessel photograph.
  hero: {
    src: "/img/marine.jpg",
    alt: "Bulk vessel under inspection at the Port of Koper",
    swap: "Supply a high-resolution (≥2400px) version of this vessel/port shot for a crisper full-bleed hero.",
  } as MediaItem,

  // The three full-bleed slides of the pinned horizontal hero sequence, in order.
  // Slide 3 currently reuses the on-site inspection shot as a stand-in for Koper;
  // swap its `src` for a genuine Port of Koper quay photograph when supplied.
  heroSequence: [
    {
      src: "/img/marine.jpg",
      alt: "Bulk vessel under inspection at the Port of Koper",
      swap: "High-resolution (≥2400px) vessel/marine survey shot.",
    },
    {
      src: "/img/hero.jpg",
      alt: "Cargo operations at the Port of Koper",
      swap: "High-resolution cargo/port operations shot.",
    },
    {
      src: "/img/general.jpg",
      alt: "Agroinspekt inspector on the quay at the Port of Koper",
      swap: "A genuine Port of Koper quayside photo of inspectors at work (≥2400px).",
    },
  ] as MediaItem[],

  whatWeDo: {
    src: "/img/general.jpg",
    alt: "Agroinspekt inspector on site verifying a consignment",
    swap: "Higher-resolution on-site inspection photo (hi-vis, sampling in progress).",
  } as MediaItem,

  capability: {
    src: "/img/grains.jpg",
    alt: "Bulk grain sampling during discharge",
    swap: "Higher-resolution sampling/draft-survey photo.",
  } as MediaItem,

  coverage: {
    src: "/img/hero.jpg",
    alt: "Cargo operations at the Port of Koper",
    swap: "Aerial of the Port of Koper if available.",
  } as MediaItem,

  about: {
    src: "/img/general.jpg",
    alt: "Agroinspekt inspection work on site",
    swap: "About hero: the Agroinspekt team or a signature Koper operation, high resolution.",
  } as MediaItem,

  cta: {
    src: "/img/hero.jpg",
    alt: "Cargo operations at port",
    swap: "Any strong, high-contrast Agroinspekt operational photo (high resolution).",
  } as MediaItem,

  // Per-service header imagery, keyed by service slug - all client photos.
  service: {
    general: {
      src: "/img/general.jpg",
      alt: "General cargo inspection on site",
      swap: "Higher-resolution general cargo inspection photo.",
    } as MediaItem,
    "fruits-and-vegetables": {
      src: "/img/fruits.jpg",
      alt: "Inspection of fresh produce",
      swap: "Higher-resolution reefer / produce inspection photo.",
    } as MediaItem,
    "coffee-cocoa-rice": {
      src: "/img/coffee.jpg",
      alt: "Sampling of coffee, cocoa and rice",
      swap: "Higher-resolution coffee / cocoa / rice sampling photo.",
    } as MediaItem,
    "grains-and-feedstuff": {
      src: "/img/grains.jpg",
      alt: "Bulk grain sampling and draft survey",
      swap: "Higher-resolution grain sampling / draft survey photo.",
    } as MediaItem,
    "marine-surveys": {
      src: "/img/marine.jpg",
      alt: "Marine survey of a bulk vessel",
      swap: "Higher-resolution marine survey photo (hold, hatch or draft).",
    } as MediaItem,
    liquids: {
      src: "/img/liquids.jpg",
      alt: "Liquid cargo sampling",
      swap: "Higher-resolution shore-tank / tanker sampling photo.",
    } as MediaItem,
    "minerals-coal-coke-ores": {
      src: "/img/minerals.jpg",
      alt: "Dry bulk mineral survey and sampling",
      swap: "Higher-resolution mineral / phosphate rock stockpile photo.",
    } as MediaItem,
    "dangerous-goods": {
      src: "/img/dangerous.jpg",
      alt: "Dangerous goods handling and packing supervision",
      swap: "Higher-resolution IMDG / dangerous goods supervision photo.",
    } as MediaItem,
  } as Record<string, MediaItem>,

  // Per-project imagery, keyed by project slug - mapped to the client's photos.
  project: {
    "sampling-of-sunflower-oil": {
      src: "/img/liquids.jpg",
      alt: "Sampling of liquid cargo",
      swap: "Real sunflower oil sampling photo.",
    } as MediaItem,
    "inspection-of-bananas": {
      src: "/img/fruits.jpg",
      alt: "Inspection of fresh produce",
      swap: "Real banana reefer inspection photo.",
    } as MediaItem,
    "assessment-of-damages-and-reconditioning": {
      src: "/img/general.jpg",
      alt: "Cargo condition assessment",
      swap: "Real damage assessment / reconditioning photo.",
    } as MediaItem,
    "supervision-and-sampling-of-phosphate-rock": {
      src: "/img/minerals.jpg",
      alt: "Mineral bulk cargo survey",
      swap: "Real phosphate rock discharge / sampling photo.",
    } as MediaItem,
    "inspection-and-sampling-of-wheat": {
      src: "/img/grains.jpg",
      alt: "Wheat sampling and draft survey",
      swap: "Real wheat draft survey / sampling photo.",
    } as MediaItem,
  } as Record<string, MediaItem>,
};
