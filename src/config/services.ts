/**
 * Service areas - the eight inspection domains.
 * Each carries bilingual copy for its card + dedicated detail page.
 *
 * NOTE ON STANDARDS: specific standard references (GAFTA, FOSFA, ISO, IMDG…)
 * are industry-typical and marked where they need CLIENT confirmation.
 */

export type IconKey =
  | "general"
  | "fruits"
  | "coffee"
  | "grains"
  | "marine"
  | "liquids"
  | "minerals"
  | "dangerous";

export interface ServiceContent {
  title: string;
  tagline: string; // one line for the card
  intro: string; // lead paragraph on detail page
  covers: string[]; // "what it covers"
  commodities: string[];
  methods: string[]; // inspection & sampling methods
  standards: string[]; // relevant standards / references
}

export interface Service {
  slug: string;
  icon: IconKey;
  en: ServiceContent;
  si: ServiceContent;
}

export const services: Service[] = [
  {
    slug: "general",
    icon: "general",
    en: {
      title: "General Inspection",
      tagline: "Independent quantity and quality control for any consignment.",
      intro:
        "Impartial third-party inspection covering quantity, quality and condition of goods at loading, discharge and in storage. It is the baseline verification that lets buyers, sellers and insurers act on a single, trusted set of facts.",
      covers: [
        "Quantity determination and tally at loading and discharge",
        "Quality and condition inspection against contract specification",
        "Pre-shipment and pre-payment verification",
        "Container and packaging condition checks",
        "Independent certification and report issuance",
      ],
      commodities: [
        "General cargo and packaged goods",
        "Bagged and bulk commodities",
        "Containerised consignments",
        "Break-bulk and project cargo",
      ],
      methods: [
        "Physical tally and weight verification",
        "Representative sampling to agreed protocol",
        "Photographic documentation and condition survey",
        "Seal verification and chain-of-custody control",
      ],
      standards: [
        "ISO 17020 conformity assessment (TODO[CLIENT]: confirm accreditation)",
        "Contractual terms per Incoterms 2020",
        "GAFTA / FOSFA where applicable (TODO[CLIENT]: confirm memberships)",
      ],
    },
    si: {
      title: "Splošni nadzor",
      tagline: "Neodvisen nadzor količine in kakovosti za vsako pošiljko.",
      intro:
        "Nepristranski nadzor tretje strani, ki zajema količino, kakovost in stanje blaga pri natovarjanju, raztovarjanju in v skladišču. To je temeljna verifikacija, na podlagi katere kupci, prodajalci in zavarovalnice ravnajo na osnovi enotnega, zaupanja vrednega niza dejstev.",
      covers: [
        "Ugotavljanje količine in tally pri natovarjanju in raztovarjanju",
        "Nadzor kakovosti in stanja glede na pogodbeno specifikacijo",
        "Verifikacija pred odpremo in pred plačilom",
        "Preverjanje stanja kontejnerjev in embalaže",
        "Neodvisno certificiranje in izdaja poročil",
      ],
      commodities: [
        "Splošni tovor in pakirano blago",
        "Vrečasto in razsuto blago",
        "Kontejnerske pošiljke",
        "Break-bulk in projektni tovor",
      ],
      methods: [
        "Fizični tally in verifikacija teže",
        "Reprezentativno vzorčenje po dogovorjenem protokolu",
        "Fotografska dokumentacija in pregled stanja",
        "Preverjanje plomb in nadzor verige hrambe",
      ],
      standards: [
        "Skladnost z ISO 17020 (TODO[CLIENT]: potrditev akreditacije)",
        "Pogodbeni pogoji po Incoterms 2020",
        "GAFTA / FOSFA kjer je relevantno (TODO[CLIENT]: potrditev članstev)",
      ],
    },
  },
  {
    slug: "fruits-and-vegetables",
    icon: "fruits",
    en: {
      title: "Fruits and Vegetables",
      tagline: "Freshness, grading and phytosanitary condition at the quay.",
      intro:
        "Time-critical inspection of fresh produce where condition can change by the hour. We verify grade, calibre, ripeness, temperature and packaging so perishable cargo is accepted, rejected or claimed on documented fact.",
      covers: [
        "Grade, calibre and quality assessment",
        "Ripeness, firmness and colour evaluation",
        "Cold-chain and temperature verification",
        "Packaging, labelling and count checks",
        "Damage, decay and rejection surveys",
      ],
      commodities: [
        "Bananas and tropical fruit",
        "Citrus and pome fruit",
        "Table grapes and stone fruit",
        "Fresh vegetables and salad crops",
      ],
      methods: [
        "Statistical sampling across the lot",
        "Pulp temperature measurement",
        "Refractometer (Brix) and firmness testing",
        "Defect count and photographic recording",
      ],
      standards: [
        "UNECE fresh produce standards",
        "EU marketing standards (Reg. 543/2011)",
        "Client / buyer specification tolerances",
      ],
    },
    si: {
      title: "Sadje in zelenjava",
      tagline: "Svežina, razvrščanje in fitosanitarno stanje na privezu.",
      intro:
        "Časovno kritičen nadzor svežih pridelkov, kjer se stanje lahko spremeni v urah. Preverjamo razred, kaliber, zrelost, temperaturo in embalažo, tako da je pokvarljivi tovor sprejet, zavrnjen ali reklamiran na podlagi dokumentiranih dejstev.",
      covers: [
        "Ocena razreda, kalibra in kakovosti",
        "Vrednotenje zrelosti, čvrstosti in barve",
        "Preverjanje hladne verige in temperature",
        "Preverjanje embalaže, označevanja in števila",
        "Pregledi poškodb, kvarjenja in zavrnitev",
      ],
      commodities: [
        "Banane in tropsko sadje",
        "Citrusi in pečkato sadje",
        "Namizno grozdje in koščičasto sadje",
        "Sveža zelenjava in solatnice",
      ],
      methods: [
        "Statistično vzorčenje po celotni partiji",
        "Merjenje temperature mesa plodov",
        "Refraktometer (Brix) in testiranje čvrstosti",
        "Štetje napak in fotografsko beleženje",
      ],
      standards: [
        "UNECE standardi za sveže pridelke",
        "Tržni standardi EU (Uredba 543/2011)",
        "Tolerance po specifikaciji naročnika / kupca",
      ],
    },
  },
  {
    slug: "coffee-cocoa-rice",
    icon: "coffee",
    en: {
      title: "Coffee, Cocoa and Rice",
      tagline: "Origin, grade and moisture verified for soft commodities.",
      intro:
        "Specialist inspection of soft commodities where grade, moisture and defect count set the price. We sample, grade and supervise handling from warehouse to vessel to protect contract value.",
      covers: [
        "Green coffee grading and defect classification",
        "Cocoa bean cut-test and quality assessment",
        "Rice milling degree, purity and broken-grain analysis",
        "Moisture and infestation checks",
        "Weight and bag-count supervision",
      ],
      commodities: [
        "Green and roasted coffee",
        "Cocoa beans and derivatives",
        "Milled and paddy rice",
        "Bagged soft commodities",
      ],
      methods: [
        "Automatic and manual bag sampling",
        "Cut-test and screen-size grading",
        "Moisture meter and oven-drying analysis",
        "Sample reduction and retained-sample sealing",
      ],
      standards: [
        "GAFTA sampling & analysis (TODO[CLIENT]: confirm membership)",
        "ISO 6673 / ISO 1446 moisture methods",
        "ICO / ICCO grade references",
      ],
    },
    si: {
      title: "Kava, kakav in riž",
      tagline: "Preverjeno poreklo, razred in vlaga za mehke surovine.",
      intro:
        "Specialistični nadzor mehkih surovin, pri katerih razred, vlaga in število napak določajo ceno. Vzorčimo, razvrščamo in nadziramo ravnanje od skladišča do plovila za zaščito pogodbene vrednosti.",
      covers: [
        "Razvrščanje zelene kave in klasifikacija napak",
        "Cut-test kakavovih zrn in ocena kakovosti",
        "Analiza stopnje mletja riža, čistosti in lomljenih zrn",
        "Preverjanje vlage in okužb",
        "Nadzor teže in števila vreč",
      ],
      commodities: [
        "Zelena in pražena kava",
        "Kakavova zrna in derivati",
        "Mleti in neoluščeni riž",
        "Vrečaste mehke surovine",
      ],
      methods: [
        "Avtomatsko in ročno vzorčenje vreč",
        "Cut-test in razvrščanje po velikosti sit",
        "Merilnik vlage in analiza s sušenjem",
        "Redukcija vzorcev in plombiranje hranjenih vzorcev",
      ],
      standards: [
        "GAFTA vzorčenje in analiza (TODO[CLIENT]: potrditev članstva)",
        "Metode vlage ISO 6673 / ISO 1446",
        "Referenčni razredi ICO / ICCO",
      ],
    },
  },
  {
    slug: "grains-and-feedstuff",
    icon: "grains",
    en: {
      title: "Grains and Feedstuff",
      tagline: "Bulk sampling, weighing and quality for agri-bulk trades.",
      intro:
        "Full-scope inspection of grain and feed in bulk: draft survey, mechanical sampling, weighing supervision and laboratory analysis. This is the discipline at the core of agricultural commodity trading.",
      covers: [
        "Draft survey and bulk quantity determination",
        "Continuous sampling during loading and discharge",
        "Moisture, protein, test weight and impurity analysis",
        "Hold cleanliness and fitness inspection",
        "Fumigation supervision and monitoring",
      ],
      commodities: [
        "Wheat, maize and barley",
        "Soybean, sunflower and rapeseed meal",
        "Feed pellets and compound feed",
        "Oilseeds and pulses",
      ],
      methods: [
        "Draft survey to UN/ECE methodology",
        "Automatic in-line and manual probe sampling",
        "NIR and reference laboratory analysis",
        "Composite and retained sample preparation",
      ],
      standards: [
        "GAFTA registered superintendence (TODO[CLIENT]: confirm)",
        "ISO 24333 grain sampling",
        "UN/ECE draft survey code",
      ],
    },
    si: {
      title: "Žita in krmila",
      tagline: "Vzorčenje razsutega tovora, tehtanje in kakovost.",
      intro:
        "Celovit nadzor žit in krmil v razsutem stanju: ugrezni pregled (draft survey), mehansko vzorčenje, nadzor tehtanja in laboratorijska analiza. To je disciplina v jedru trgovanja s kmetijskimi surovinami.",
      covers: [
        "Ugrezni pregled in ugotavljanje količine razsutega tovora",
        "Kontinuirano vzorčenje med natovarjanjem in raztovarjanjem",
        "Analiza vlage, beljakovin, hektolitrske teže in primesi",
        "Pregled čistosti in ustreznosti skladiščnih prostorov",
        "Nadzor in spremljanje fumigacije",
      ],
      commodities: [
        "Pšenica, koruza in ječmen",
        "Sojina, sončnična in oljnorepična moka",
        "Krmni peleti in krmne mešanice",
        "Oljnice in stročnice",
      ],
      methods: [
        "Ugrezni pregled po metodologiji UN/ECE",
        "Avtomatsko in ročno sondno vzorčenje",
        "NIR in referenčna laboratorijska analiza",
        "Priprava sestavljenih in hranjenih vzorcev",
      ],
      standards: [
        "GAFTA registriran nadzor (TODO[CLIENT]: potrditev)",
        "ISO 24333 vzorčenje žit",
        "UN/ECE kodeks ugreznega pregleda",
      ],
    },
  },
  {
    slug: "marine-surveys",
    icon: "marine",
    en: {
      title: "Marine Surveys",
      tagline: "On/off-hire, hold condition, draft and casualty surveys.",
      intro:
        "Marine surveying that protects vessel, cargo and charter interests: hold and hatch condition, draft surveys, on- and off-hire condition, and independent casualty assessment when things go wrong.",
      covers: [
        "Hold and hatch cover inspection",
        "Draft surveys for bulk quantity",
        "On-hire and off-hire condition surveys",
        "Stowage and lashing supervision",
        "Casualty and cargo-damage assessment",
      ],
      commodities: [
        "Bulk carriers and general cargo vessels",
        "Break-bulk and project cargo",
        "Containerised trades",
        "Barge and coastal transfers",
      ],
      methods: [
        "Draft reading and displacement calculation",
        "Hatch-cover ultrasonic tightness testing",
        "Photographic condition documentation",
        "Independent survey reporting for owners / charterers",
      ],
      standards: [
        "UN/ECE draft survey code of practice",
        "P&I and H&M survey requirements",
        "Class and SOLAS references where relevant",
      ],
    },
    si: {
      title: "Pomorski pregledi",
      tagline: "On/off-hire, stanje skladišč, ugrez in havarije.",
      intro:
        "Pomorski nadzor, ki ščiti interese plovila, tovora in zakupa: stanje skladišč in pokrovov, ugrezni pregledi, on- in off-hire stanje ter neodvisna ocena havarij, ko gre kaj narobe.",
      covers: [
        "Pregled skladišč in ladijskih pokrovov",
        "Ugrezni pregledi za količino razsutega tovora",
        "On-hire in off-hire pregledi stanja",
        "Nadzor natovarjanja in privezovanja tovora",
        "Ocena havarij in poškodb tovora",
      ],
      commodities: [
        "Ladje za razsuti tovor in splošni tovor",
        "Break-bulk in projektni tovor",
        "Kontejnerski promet",
        "Prevozi z baržami in obalni prevozi",
      ],
      methods: [
        "Odčitavanje ugreza in izračun izpodriva",
        "Ultrazvočno testiranje tesnosti pokrovov",
        "Fotografska dokumentacija stanja",
        "Neodvisno poročanje za lastnike / zakupnike",
      ],
      standards: [
        "UN/ECE kodeks ugreznega pregleda",
        "Zahteve P&I in H&M pregledov",
        "Klasifikacijske in SOLAS reference kjer je relevantno",
      ],
    },
  },
  {
    slug: "liquids",
    icon: "liquids",
    en: {
      title: "Liquids",
      tagline: "Tank calibration, sampling and quantity for liquid cargoes.",
      intro:
        "Precise quantity and quality control for liquids in shore tanks, road/rail tankers and vessels: ullage, temperature, density and representative sampling that stand up to trade and custody scrutiny.",
      covers: [
        "Shore-tank and vessel quantity determination",
        "Ullage, temperature and density measurement",
        "Representative sampling (top / middle / bottom)",
        "Water dip and free-water assessment",
        "Loading / discharge supervision and line checks",
      ],
      commodities: [
        "Edible oils (sunflower, palm, soya)",
        "Molasses and liquid feed",
        "Base chemicals and solvents",
        "Petroleum and biofuel products",
      ],
      methods: [
        "Calibrated tank tables and gauging",
        "Closed and open sampling to ISO/API",
        "Density and temperature correction (ASTM tables)",
        "Composite and running sample preparation",
      ],
      standards: [
        "ISO 3170 / 3171 liquid sampling",
        "API MPMS gauging standards",
        "FOSFA where applicable (TODO[CLIENT]: confirm membership)",
      ],
    },
    si: {
      title: "Tekočine",
      tagline: "Umerjanje tankov, vzorčenje in količina tekočih tovorov.",
      intro:
        "Natančen nadzor količine in kakovosti tekočin v obalnih tankih, cestnih/železniških cisternah in plovilih: praznina, temperatura, gostota in reprezentativno vzorčenje, ki prestanejo trgovinski in skrbniški nadzor.",
      covers: [
        "Ugotavljanje količine v obalnih tankih in plovilih",
        "Merjenje praznine, temperature in gostote",
        "Reprezentativno vzorčenje (zgoraj / sredina / spodaj)",
        "Ocena vsebnosti vode",
        "Nadzor natovarjanja / raztovarjanja in preverjanje vodov",
      ],
      commodities: [
        "Jedilna olja (sončnično, palmovo, sojino)",
        "Melasa in tekoča krma",
        "Osnovne kemikalije in topila",
        "Naftni proizvodi in biogoriva",
      ],
      methods: [
        "Umerjene tabele tankov in merjenje",
        "Zaprto in odprto vzorčenje po ISO/API",
        "Korekcija gostote in temperature (tabele ASTM)",
        "Priprava sestavljenih in tekočih vzorcev",
      ],
      standards: [
        "ISO 3170 / 3171 vzorčenje tekočin",
        "API MPMS standardi merjenja",
        "FOSFA kjer je relevantno (TODO[CLIENT]: potrditev članstva)",
      ],
    },
  },
  {
    slug: "minerals-coal-coke-ores",
    icon: "minerals",
    en: {
      title: "Minerals, Coal, Coke, Ores",
      tagline: "Stockpile survey, sampling and moisture for dry bulk minerals.",
      intro:
        "Inspection and sampling of solid mineral bulks where moisture, size and calorific value drive value and safe carriage, from stockpile survey to transportable moisture limit determination.",
      covers: [
        "Stockpile and draft survey quantity",
        "Mechanical and manual sampling of dry bulk",
        "Moisture, ash and calorific value analysis",
        "Transportable Moisture Limit (TML) determination",
        "Loading supervision and hold monitoring",
      ],
      commodities: [
        "Steam and coking coal",
        "Coke and petcoke",
        "Iron ore and concentrates",
        "Phosphate rock and mineral sands",
      ],
      methods: [
        "Belt-cut and stopped-belt sampling",
        "Sample division and moisture sealing",
        "TML / flow-moisture point testing",
        "Laboratory proximate and calorific analysis",
      ],
      standards: [
        "ISO 13909 coal & coke sampling",
        "IMSBC Code for safe carriage",
        "ISO 21398 / ASTM references",
      ],
    },
    si: {
      title: "Minerali, premog, koks, rude",
      tagline: "Pregled deponij, vzorčenje in vlaga za suhi razsuti tovor.",
      intro:
        "Nadzor in vzorčenje trdnih mineralnih razsutih tovorov, kjer vlaga, granulacija in kalorična vrednost določajo vrednost in varen prevoz, od pregleda deponij do določitve meje prevozljive vlage.",
      covers: [
        "Količina po pregledu deponij in ugreznem pregledu",
        "Mehansko in ročno vzorčenje suhega razsutega tovora",
        "Analiza vlage, pepela in kalorične vrednosti",
        "Določitev meje prevozljive vlage (TML)",
        "Nadzor natovarjanja in spremljanje skladišč",
      ],
      commodities: [
        "Energetski in koksni premog",
        "Koks in petrolkoks",
        "Železova ruda in koncentrati",
        "Fosfatna kamnina in mineralni peski",
      ],
      methods: [
        "Vzorčenje z ustavljenega traku",
        "Delitev vzorcev in plombiranje za vlago",
        "Testiranje TML / točke pretočne vlage",
        "Laboratorijska proksimalna in kalorična analiza",
      ],
      standards: [
        "ISO 13909 vzorčenje premoga in koksa",
        "IMSBC kodeks za varen prevoz",
        "Reference ISO 21398 / ASTM",
      ],
    },
  },
  {
    slug: "dangerous-goods",
    icon: "dangerous",
    en: {
      title: "Dangerous Goods",
      tagline: "Compliance, classification and container packing for hazmat.",
      intro:
        "Verification and supervision of dangerous goods handling, covering classification, packing, marking, labelling and documentation, so hazardous consignments move safely and in full regulatory compliance.",
      covers: [
        "Classification and documentation review",
        "Packing, marking and labelling verification",
        "Container / vehicle packing supervision (CTU)",
        "Segregation and stowage compliance checks",
        "Placarding and transport document control",
      ],
      commodities: [
        "Packaged chemicals and reagents",
        "Fertilisers and oxidising agents",
        "Flammable liquids and solids",
        "Class-specific hazardous cargoes",
      ],
      methods: [
        "IMDG / ADR compliance inspection",
        "CTU packing-code supervision",
        "Documentation and dangerous-goods declaration audit",
        "Photographic evidence and non-conformity reporting",
      ],
      standards: [
        "IMDG Code (maritime)",
        "ADR / RID (road & rail)",
        "CTU Code for container packing",
      ],
    },
    si: {
      title: "Nevarno blago",
      tagline: "Skladnost, klasifikacija in pakiranje kontejnerjev.",
      intro:
        "Verifikacija in nadzor ravnanja z nevarnim blagom, ki zajema klasifikacijo, pakiranje, označevanje, etiketiranje in dokumentacijo, da se nevarne pošiljke gibljejo varno in v celoti skladno s predpisi.",
      covers: [
        "Pregled klasifikacije in dokumentacije",
        "Preverjanje pakiranja, označevanja in etiketiranja",
        "Nadzor pakiranja kontejnerjev / vozil (CTU)",
        "Preverjanje ločevanja in skladiščenja",
        "Nadzor nalepk in prevoznih dokumentov",
      ],
      commodities: [
        "Pakirane kemikalije in reagenti",
        "Gnojila in oksidanti",
        "Vnetljive tekočine in trdne snovi",
        "Nevarni tovori po razredih",
      ],
      methods: [
        "Nadzor skladnosti IMDG / ADR",
        "Nadzor po CTU kodeksu pakiranja",
        "Revizija dokumentacije in deklaracij nevarnega blaga",
        "Fotografski dokazi in poročanje o neskladnostih",
      ],
      standards: [
        "IMDG kodeks (pomorski)",
        "ADR / RID (cestni in železniški)",
        "CTU kodeks za pakiranje kontejnerjev",
      ],
    },
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
