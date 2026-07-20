/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HOMEPAGE METRICS BAND  —  ILLUSTRATIVE FIGURES
 * ─────────────────────────────────────────────────────────────────────────────
 *  The four counting figures shown on the navy band on the homepage.
 *
 *  These numbers are ILLUSTRATIVE placeholders. To go live with real data:
 *    1. Replace each `value` (and `suffix` if needed) with Agroinspekt's
 *       verified figures.
 *    2. Set `showCaption` to `false` to remove the "figures are illustrative"
 *       caption beneath the band.
 *
 *  Everything the band needs lives in this one block, so the swap is a single
 *  edit.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const metrics = {
  showCaption: true,

  items: [
    {
      value: 20,
      suffix: "+",
      label: { en: "Years of operation", si: "Let delovanja" },
    },
    {
      value: 10000,
      suffix: "+",
      label: { en: "Inspections completed", si: "Opravljenih nadzorov" },
    },
    {
      value: 15,
      suffix: "+",
      label: {
        en: "Ports and terminals covered",
        si: "Pokritih pristanišč in terminalov",
      },
    },
    {
      value: 40,
      suffix: "+",
      label: { en: "Commodity categories", si: "Kategorij blaga" },
    },
  ],

  caption: {
    en: "Figures shown are illustrative. They will be replaced with Agroinspekt's verified statistics.",
    si: "Prikazane številke so ilustrativne. Nadomeščene bodo s preverjenimi statistikami Agroinspekta.",
  },
} as const;
