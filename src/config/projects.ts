/**
 * Case studies - five REAL project titles from the client.
 * Summaries, locations and outcomes are PLACEHOLDER narratives written to be
 * plausible. Every invented detail is flagged with TODO[CLIENT] so it can be
 * replaced with verified facts before this is shown externally.
 */

export interface ProjectContent {
  title: string;
  summary: string;
  outcome: string;
  challenge: string;
  approach: string[];
}

export interface Project {
  slug: string;
  serviceSlug: string; // links to a service area
  commodity: { en: string; si: string };
  location: { en: string; si: string }; // TODO[CLIENT]: confirm real locations
  year: string; // TODO[CLIENT]: confirm real dates
  en: ProjectContent;
  si: ProjectContent;
}

export const projects: Project[] = [
  {
    slug: "sampling-of-sunflower-oil",
    serviceSlug: "liquids",
    commodity: { en: "Crude sunflower oil", si: "Surovo sončnično olje" },
    location: { en: "Port of Koper, Slovenia", si: "Luka Koper, Slovenija" },
    year: "2023", // TODO[CLIENT]
    en: {
      title: "Sampling of Sunflower Oil",
      summary:
        "Representative sampling and quantity verification of a bulk crude sunflower oil parcel during shore-tank transfer, safeguarding both trade quantity and quality parameters for the parties.",
      challenge:
        "A high-value liquid parcel required custody-grade sampling and independent quantity figures acceptable to buyer, seller and insurer simultaneously. TODO[CLIENT]: confirm real scenario.",
      approach: [
        "Calibrated shore-tank gauging with temperature and density correction",
        "Top / middle / bottom and running samples drawn to ISO 3170",
        "Composite and retained samples sealed for laboratory and arbitration",
        "Independent quantity certificate issued to all parties",
      ],
      outcome:
        "TODO[CLIENT]: confirm outcome. Placeholder: quantity and quality certified within contract tolerance, no dispute raised on the certified figures.",
    },
    si: {
      title: "Vzorčenje sončničnega olja",
      summary:
        "Reprezentativno vzorčenje in verifikacija količine razsute pošiljke surovega sončničnega olja med pretokom v obalni tank, kar je zaščitilo trgovinsko količino in kakovostne parametre za vse strani.",
      challenge:
        "Dragocena tekoča pošiljka je zahtevala vzorčenje skrbniške ravni in neodvisne količinske podatke, sprejemljive za kupca, prodajalca in zavarovalnico hkrati. TODO[CLIENT]: potrditev scenarija.",
      approach: [
        "Umerjeno merjenje obalnega tanka s korekcijo temperature in gostote",
        "Vzorci zgoraj / sredina / spodaj in tekoči vzorci po ISO 3170",
        "Sestavljeni in hranjeni vzorci plombirani za laboratorij in arbitražo",
        "Neodvisen količinski certifikat izdan vsem stranem",
      ],
      outcome:
        "TODO[CLIENT]: potrditev izida. Nadomestno: količina in kakovost potrjeni znotraj pogodbene tolerance, brez sporov glede certificiranih podatkov.",
    },
  },
  {
    slug: "inspection-of-bananas",
    serviceSlug: "fruits-and-vegetables",
    commodity: { en: "Fresh bananas", si: "Sveže banane" },
    location: { en: "Port of Koper, Slovenia", si: "Luka Koper, Slovenija" },
    year: "2022", // TODO[CLIENT]
    en: {
      title: "Inspection of Bananas",
      summary:
        "Cold-chain and condition inspection of a reefer consignment of fresh bananas on discharge, documenting ripeness, temperature and any decay to support acceptance and any insurance claim.",
      challenge:
        "Perishable reefer cargo arriving with suspected temperature deviation needed rapid, defensible condition documentation. TODO[CLIENT]: confirm real scenario.",
      approach: [
        "Pulp temperature readings across the container population",
        "Ripeness, colour and firmness grading against buyer spec",
        "Defect and decay count with photographic evidence",
        "Condition report issued for acceptance and claim purposes",
      ],
      outcome:
        "TODO[CLIENT]: confirm outcome. Placeholder: condition independently documented, enabling a fair settlement between the parties.",
    },
    si: {
      title: "Pregled banan",
      summary:
        "Pregled hladne verige in stanja hlajene pošiljke svežih banan ob raztovarjanju, z dokumentiranjem zrelosti, temperature in morebitnega kvarjenja v podporo prevzemu in zavarovalniškemu zahtevku.",
      challenge:
        "Pokvarljiv hlajen tovor s sumom na temperaturno odstopanje je zahteval hitro in zagovorljivo dokumentiranje stanja. TODO[CLIENT]: potrditev scenarija.",
      approach: [
        "Meritve temperature mesa plodov po celotni populaciji kontejnerjev",
        "Razvrščanje zrelosti, barve in čvrstosti glede na specifikacijo kupca",
        "Štetje napak in kvarjenja s fotografskimi dokazi",
        "Izdano poročilo o stanju za prevzem in zahtevek",
      ],
      outcome:
        "TODO[CLIENT]: potrditev izida. Nadomestno: stanje neodvisno dokumentirano, kar je omogočilo pošteno poravnavo med stranmi.",
    },
  },
  {
    slug: "assessment-of-damages-and-reconditioning",
    serviceSlug: "general",
    commodity: {
      en: "Damaged general cargo",
      si: "Poškodovan splošni tovor",
    },
    location: { en: "Slovenia", si: "Slovenija" }, // TODO[CLIENT]
    year: "2021", // TODO[CLIENT]
    en: {
      title: "Assessment of Damages and Reconditioning of Damaged Goods",
      summary:
        "Independent survey of damaged goods to quantify loss, determine cause where possible, and supervise reconditioning and salvage to minimise the net claim.",
      challenge:
        "A consignment sustained damage in transit; the parties needed an impartial extent-and-cause assessment plus a route to recover residual value. TODO[CLIENT]: confirm real scenario.",
      approach: [
        "Extent-of-damage survey with itemised loss quantification",
        "Cause assessment from available evidence",
        "Supervision of sorting, reconditioning and salvage",
        "Documented mitigation to reduce the net claim",
      ],
      outcome:
        "TODO[CLIENT]: confirm outcome. Placeholder: recoverable goods reconditioned and returned to trade, reducing the overall loss.",
    },
    si: {
      title: "Ocena škode in obnova poškodovanega blaga",
      summary:
        "Neodvisen pregled poškodovanega blaga za količinsko opredelitev izgube, ugotavljanje vzroka, kjer je mogoče, ter nadzor obnove in reševanja za zmanjšanje neto zahtevka.",
      challenge:
        "Pošiljka je bila poškodovana med prevozom; strani so potrebovale nepristransko oceno obsega in vzroka ter pot za povrnitev preostale vrednosti. TODO[CLIENT]: potrditev scenarija.",
      approach: [
        "Pregled obsega škode s postavko po postavki opredeljeno izgubo",
        "Ocena vzroka iz razpoložljivih dokazov",
        "Nadzor sortiranja, obnove in reševanja",
        "Dokumentirano zmanjševanje za znižanje neto zahtevka",
      ],
      outcome:
        "TODO[CLIENT]: potrditev izida. Nadomestno: obnovljivo blago obnovljeno in vrnjeno v promet, kar je zmanjšalo skupno izgubo.",
    },
  },
  {
    slug: "supervision-and-sampling-of-phosphate-rock",
    serviceSlug: "minerals-coal-coke-ores",
    commodity: { en: "Phosphate rock", si: "Fosfatna kamnina" },
    location: { en: "Port of Koper, Slovenia", si: "Luka Koper, Slovenija" },
    year: "2023", // TODO[CLIENT]
    en: {
      title: "Supervision and Sampling of Phosphate Rock",
      summary:
        "Discharge supervision, draft survey and representative sampling of a bulk phosphate rock cargo, verifying quantity and quality for the receivers.",
      challenge:
        "A dry-bulk mineral cargo required verified tonnage and representative sampling for moisture and grade at discharge. TODO[CLIENT]: confirm real scenario.",
      approach: [
        "Draft survey on arrival and completion of discharge",
        "Representative sampling during grab / conveyor discharge",
        "Moisture and grade sample preparation and sealing",
        "Supervision of hold cleanliness and cargo handling",
      ],
      outcome:
        "TODO[CLIENT]: confirm outcome. Placeholder: tonnage and quality independently verified, supporting clean receipt of the cargo.",
    },
    si: {
      title: "Nadzor in vzorčenje fosfatne kamnine",
      summary:
        "Nadzor raztovarjanja, ugrezni pregled in reprezentativno vzorčenje razsute pošiljke fosfatne kamnine z verifikacijo količine in kakovosti za prejemnike.",
      challenge:
        "Suhi razsuti mineralni tovor je zahteval preverjeno tonažo in reprezentativno vzorčenje za vlago in razred ob raztovarjanju. TODO[CLIENT]: potrditev scenarija.",
      approach: [
        "Ugrezni pregled ob prihodu in po zaključku raztovarjanja",
        "Reprezentativno vzorčenje med raztovarjanjem",
        "Priprava in plombiranje vzorcev za vlago in razred",
        "Nadzor čistosti skladišč in ravnanja s tovorom",
      ],
      outcome:
        "TODO[CLIENT]: potrditev izida. Nadomestno: tonaža in kakovost neodvisno preverjeni, kar je podprlo čist prevzem tovora.",
    },
  },
  {
    slug: "inspection-and-sampling-of-wheat",
    serviceSlug: "grains-and-feedstuff",
    commodity: { en: "Milling wheat", si: "Mlevska pšenica" },
    location: { en: "Port of Koper, Slovenia", si: "Luka Koper, Slovenija" },
    year: "2024", // TODO[CLIENT]
    en: {
      title: "Inspection and Sampling of Wheat",
      summary:
        "Quantity and quality control of a bulk milling wheat cargo: draft survey, continuous sampling and laboratory analysis of moisture, protein and impurities.",
      challenge:
        "A bulk grain trade required GAFTA-style superintendence with defensible quantity and quality figures for both parties. TODO[CLIENT]: confirm real scenario.",
      approach: [
        "Draft survey for bulk quantity determination",
        "Continuous sampling throughout loading / discharge",
        "Moisture, protein, test weight and impurity analysis",
        "Composite and retained samples sealed for arbitration",
      ],
      outcome:
        "TODO[CLIENT]: confirm outcome. Placeholder: quantity and quality certified within contract terms, accepted without dispute.",
    },
    si: {
      title: "Pregled in vzorčenje pšenice",
      summary:
        "Nadzor količine in kakovosti razsute pošiljke mlevske pšenice: ugrezni pregled, kontinuirano vzorčenje in laboratorijska analiza vlage, beljakovin in primesi.",
      challenge:
        "Trgovina z razsutim žitom je zahtevala nadzor v slogu GAFTA z zagovorljivimi podatki o količini in kakovosti za obe strani. TODO[CLIENT]: potrditev scenarija.",
      approach: [
        "Ugrezni pregled za ugotavljanje količine razsutega tovora",
        "Kontinuirano vzorčenje med natovarjanjem / raztovarjanjem",
        "Analiza vlage, beljakovin, hektolitrske teže in primesi",
        "Sestavljeni in hranjeni vzorci plombirani za arbitražo",
      ],
      outcome:
        "TODO[CLIENT]: potrditev izida. Nadomestno: količina in kakovost certificirani znotraj pogodbenih pogojev, sprejeti brez spora.",
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
