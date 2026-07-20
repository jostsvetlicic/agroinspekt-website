/**
 * Case studies - five REAL project titles from the client.
 * Copy is deliberately neutral: it describes the type of inspection work tied
 * to each real engagement, without asserting any unverifiable detail (no
 * location, date, dispute or outcome). Method steps are generic to the
 * discipline. Verified specifics can be added once the client supplies them.
 */

export interface ProjectContent {
  title: string;
  summary: string;
  approach: string[];
}

export interface Project {
  slug: string;
  serviceSlug: string; // links to a service area
  commodity: { en: string; si: string };
  en: ProjectContent;
  si: ProjectContent;
}

export const projects: Project[] = [
  {
    slug: "sampling-of-sunflower-oil",
    serviceSlug: "liquids",
    commodity: { en: "Crude sunflower oil", si: "Surovo sončnično olje" },
    en: {
      title: "Sampling of Sunflower Oil",
      summary:
        "Representative sampling and quantity verification of a bulk crude sunflower oil parcel during shore-tank transfer, the custody-grade liquid inspection that protects both trade quantity and quality for the parties.",
      approach: [
        "Calibrated shore-tank gauging with temperature and density correction",
        "Top / middle / bottom and running samples drawn to ISO 3170",
        "Composite and retained samples sealed for laboratory and arbitration",
        "Independent quantity certificate issued to all parties",
      ],
    },
    si: {
      title: "Vzorčenje sončničnega olja",
      summary:
        "Reprezentativno vzorčenje in verifikacija količine razsute pošiljke surovega sončničnega olja med pretokom v obalni tank, nadzor tekočin skrbniške ravni, ki ščiti trgovinsko količino in kakovost za vse strani.",
      approach: [
        "Umerjeno merjenje obalnega tanka s korekcijo temperature in gostote",
        "Vzorci zgoraj / sredina / spodaj in tekoči vzorci po ISO 3170",
        "Sestavljeni in hranjeni vzorci plombirani za laboratorij in arbitražo",
        "Neodvisen količinski certifikat izdan vsem stranem",
      ],
    },
  },
  {
    slug: "inspection-of-bananas",
    serviceSlug: "fruits-and-vegetables",
    commodity: { en: "Fresh bananas", si: "Sveže banane" },
    en: {
      title: "Inspection of Bananas",
      summary:
        "Cold-chain and condition inspection of a reefer consignment of fresh bananas on discharge, documenting ripeness, temperature and any decay to support acceptance and any insurance claim.",
      approach: [
        "Pulp temperature readings across the container population",
        "Ripeness, colour and firmness grading against buyer spec",
        "Defect and decay count with photographic evidence",
        "Condition report issued for acceptance and claim purposes",
      ],
    },
    si: {
      title: "Pregled banan",
      summary:
        "Pregled hladne verige in stanja hlajene pošiljke svežih banan ob raztovarjanju, z dokumentiranjem zrelosti, temperature in morebitnega kvarjenja v podporo prevzemu in zavarovalniškemu zahtevku.",
      approach: [
        "Meritve temperature mesa plodov po celotni populaciji kontejnerjev",
        "Razvrščanje zrelosti, barve in čvrstosti glede na specifikacijo kupca",
        "Štetje napak in kvarjenja s fotografskimi dokazi",
        "Izdano poročilo o stanju za prevzem in zahtevek",
      ],
    },
  },
  {
    slug: "assessment-of-damages-and-reconditioning",
    serviceSlug: "general",
    commodity: {
      en: "Damaged general cargo",
      si: "Poškodovan splošni tovor",
    },
    en: {
      title: "Assessment of Damages and Reconditioning of Damaged Goods",
      summary:
        "Independent survey of damaged goods to quantify loss, determine cause where possible, and supervise reconditioning and salvage to minimise the net claim.",
      approach: [
        "Extent-of-damage survey with itemised loss quantification",
        "Cause assessment from available evidence",
        "Supervision of sorting, reconditioning and salvage",
        "Documented mitigation to reduce the net claim",
      ],
    },
    si: {
      title: "Ocena škode in obnova poškodovanega blaga",
      summary:
        "Neodvisen pregled poškodovanega blaga za količinsko opredelitev izgube, ugotavljanje vzroka, kjer je mogoče, ter nadzor obnove in reševanja za zmanjšanje neto zahtevka.",
      approach: [
        "Pregled obsega škode s postavko po postavki opredeljeno izgubo",
        "Ocena vzroka iz razpoložljivih dokazov",
        "Nadzor sortiranja, obnove in reševanja",
        "Dokumentirano zmanjševanje za znižanje neto zahtevka",
      ],
    },
  },
  {
    slug: "supervision-and-sampling-of-phosphate-rock",
    serviceSlug: "minerals-coal-coke-ores",
    commodity: { en: "Phosphate rock", si: "Fosfatna kamnina" },
    en: {
      title: "Supervision and Sampling of Phosphate Rock",
      summary:
        "Discharge supervision, draft survey and representative sampling of a bulk phosphate rock cargo, verifying quantity and quality for the receivers.",
      approach: [
        "Draft survey on arrival and completion of discharge",
        "Representative sampling during grab / conveyor discharge",
        "Moisture and grade sample preparation and sealing",
        "Supervision of hold cleanliness and cargo handling",
      ],
    },
    si: {
      title: "Nadzor in vzorčenje fosfatne kamnine",
      summary:
        "Nadzor raztovarjanja, ugrezni pregled in reprezentativno vzorčenje razsute pošiljke fosfatne kamnine z verifikacijo količine in kakovosti za prejemnike.",
      approach: [
        "Ugrezni pregled ob prihodu in po zaključku raztovarjanja",
        "Reprezentativno vzorčenje med raztovarjanjem",
        "Priprava in plombiranje vzorcev za vlago in razred",
        "Nadzor čistosti skladišč in ravnanja s tovorom",
      ],
    },
  },
  {
    slug: "inspection-and-sampling-of-wheat",
    serviceSlug: "grains-and-feedstuff",
    commodity: { en: "Milling wheat", si: "Mlevska pšenica" },
    en: {
      title: "Inspection and Sampling of Wheat",
      summary:
        "Quantity and quality control of a bulk milling wheat cargo: draft survey, continuous sampling and laboratory analysis of moisture, protein and impurities.",
      approach: [
        "Draft survey for bulk quantity determination",
        "Continuous sampling throughout loading / discharge",
        "Moisture, protein, test weight and impurity analysis",
        "Composite and retained samples sealed for arbitration",
      ],
    },
    si: {
      title: "Pregled in vzorčenje pšenice",
      summary:
        "Nadzor količine in kakovosti razsute pošiljke mlevske pšenice: ugrezni pregled, kontinuirano vzorčenje in laboratorijska analiza vlage, beljakovin in primesi.",
      approach: [
        "Ugrezni pregled za ugotavljanje količine razsutega tovora",
        "Kontinuirano vzorčenje med natovarjanjem / raztovarjanjem",
        "Analiza vlage, beljakovin, hektolitrske teže in primesi",
        "Sestavljeni in hranjeni vzorci plombirani za arbitražo",
      ],
    },
  },
];

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
