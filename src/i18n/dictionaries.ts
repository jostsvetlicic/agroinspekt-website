import type { Locale } from "@/config/site";

/**
 * UI + section copy dictionaries. Structural/marketing copy lives here;
 * long-form domain content lives in src/config/*.
 */

export interface Dict {
  meta: {
    homeTitle: string;
    homeDescription: string;
  };
  nav: {
    about: string;
    services: string;
    projects: string;
    coverage: string;
    contact: string;
    requestCta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
    slides: { headline: string; support: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; text: string }[];
    points: { label: string; text: string }[];
  };
  whatWeDo: {
    eyebrow: string;
    title: string;
    lead: string;
    body: string;
    points: { title: string; text: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    lead: string;
    viewAll: string;
    learnMore: string;
  };
  accreditations: {
    eyebrow: string;
    title: string;
    lead: string;
    points: { title: string; text: string }[];
    logoLabel: string;
    logosTitle: string;
    logosNote: string;
    items: { name: string; scope: string }[];
  };
  capability: {
    eyebrow: string;
    title: string;
    lead: string;
    steps: { title: string; text: string }[];
  };
  projects: {
    eyebrow: string;
    title: string;
    lead: string;
    viewAll: string;
    readCase: string;
    commodity: string;
    approach: string;
    related: string;
  };
  statements: {
    integrity: { statement: string; support: string };
    speed: { statement: string; support: string };
    evidence: { statement: string; support: string };
  };
  coverage: {
    eyebrow: string;
    title: string;
    lead: string;
    portAdvantage: string;
  };
  finalCta: {
    title: string;
    text: string;
    cta: string;
    call: string;
  };
  footer: {
    descriptor: string;
    explore: string;
    servicesCol: string;
    offices: string;
    legalPrivacy: string;
    rights: string;
    builtNote: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    storyTitle: string;
    story: string[];
    independenceTitle: string;
    independence: string;
    expertiseTitle: string;
    expertise: string;
    teamTitle: string;
    teamPlaceholder: string;
    valuesTitle: string;
    values: { title: string; text: string }[];
  };
  servicePage: {
    covers: string;
    commodities: string;
    methods: string;
    standards: string;
    otherServices: string;
    ctaTitle: string;
    ctaText: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    formTitle: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    commodity: string;
    serviceType: string;
    serviceTypePlaceholder: string;
    location: string;
    dateFrom: string;
    dateTo: string;
    message: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    required: string;
    officesTitle: string;
  };
  common: {
    backHome: string;
    requestCta: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
}

const en: Dict = {
  meta: {
    homeTitle: "Agroinspekt: Independent Inspection, Survey & Testing",
    homeDescription:
      "Independent third-party inspection, survey, sampling and testing across agricultural commodities, minerals, liquids and dangerous goods. Ljubljana & Port of Koper.",
  },
  nav: {
    about: "About",
    services: "Services",
    projects: "Projects",
    coverage: "Coverage",
    contact: "Contact",
    requestCta: "Request an inspection",
  },
  hero: {
    eyebrow: "Independent · Impartial · Third-party",
    title: "Independent inspection, survey and testing of traded goods.",
    subtitle:
      "Third-party verification of quantity, quality and condition, trusted by the traders, shippers, importers, exporters and insurers who move commodities through Koper and beyond.",
    primaryCta: "Request an inspection",
    secondaryCta: "See our services",
    scroll: "Scroll",
    slides: [
      {
        headline: "We verify what is in the cargo, and what condition it is in.",
        support:
          "Independent inspection, survey, sampling and testing of traded goods.",
      },
      {
        headline: "An independent report your counterparty cannot argue with.",
        support:
          "Quantity, quality and condition, documented to recognised standards, so it holds in the contract, in arbitration and in a claim.",
      },
      {
        headline: "Our inspectors are already at the Port of Koper.",
        support: "On the quay fast, when the cargo will not wait.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    title: "From enquiry to report, in four steps.",
    lead: "A clear, documented process, so you always know what happens next.",
    steps: [
      {
        title: "Enquiry",
        text: "Tell us the commodity, the port and the dates. We confirm scope, method and standard.",
      },
      {
        title: "Attendance & sampling",
        text: "Our inspector attends on site and draws representative samples to protocol.",
      },
      {
        title: "Inspection & analysis",
        text: "Quantity, quality and condition are verified, with laboratory testing where required.",
      },
      {
        title: "Report & certificate",
        text: "You receive a clear, defensible report and certificate you can act on.",
      },
    ],
    points: [
      {
        label: "Independent",
        text: "No stake in the cargo, only the facts and the standard we work to.",
      },
      {
        label: "At the quay",
        text: "Inspectors at the Port of Koper when time-critical cargo cannot wait.",
      },
      {
        label: "Full scope",
        text: "Eight inspection domains, from grain and produce to liquids and dangerous goods.",
      },
      {
        label: "Defensible",
        text: "Documented method and evidence, built to hold in trade, arbitration and claims.",
      },
    ],
  },
  whatWeDo: {
    eyebrow: "What we do",
    title: "One independent set of facts, trusted by every party.",
    lead: "Independent third-party inspection is the neutral verification that lets a trade proceed with confidence.",
    body: "When goods change hands across borders, buyers, sellers, shipping lines and insurers each carry risk. As an impartial third party with no stake in the cargo, we determine quantity, quality and condition to a documented standard, so every party can act on the same trusted facts, settle fairly, and resolve disputes on evidence rather than assertion.",
    points: [
      {
        title: "Protects the buyer",
        text: "Confirms the goods match contract before payment and acceptance.",
      },
      {
        title: "Protects the seller",
        text: "Documents that goods were sound and correct at the point of shipment.",
      },
      {
        title: "Protects the insurer",
        text: "Provides independent evidence of extent, cause and value on a claim.",
      },
    ],
  },
  services: {
    eyebrow: "Services",
    title: "Eight inspection domains, one standard of rigour.",
    lead: "From draft survey to laboratory analysis, we provide specialist coverage across the commodities our clients trade.",
    viewAll: "View all services",
    learnMore: "Learn more",
  },
  accreditations: {
    eyebrow: "Standards & method",
    title: "Standards that make our reports actionable.",
    lead: "Our inspections are carried out to recognised international standards, so certificates hold up in trade, arbitration and claims.",
    points: [
      {
        title: "Documented method",
        text: "Every inspection follows a written protocol, so results are repeatable and traceable.",
      },
      {
        title: "Recognised standards",
        text: "We work to established international sampling and testing references appropriate to each commodity.",
      },
      {
        title: "Defensible evidence",
        text: "Representative samples and clear reporting produce certificates that hold up in trade, arbitration and claims.",
      },
    ],
    logoLabel: "Logo",
    logosTitle: "Accreditations & memberships",
    logosNote:
      "Certification and membership logos will appear here once confirmed with Agroinspekt.",
    items: [],
  },
  capability: {
    eyebrow: "Capability",
    title: "A complete inspection process, end to end.",
    lead: "Five disciplines that combine into a single, defensible chain of evidence.",
    steps: [
      {
        title: "Sampling",
        text: "Representative samples drawn to protocol, divided, sealed and retained for arbitration.",
      },
      {
        title: "Inspection",
        text: "Quantity, quality and condition verified against contract and standard.",
      },
      {
        title: "Supervision",
        text: "On-site oversight of loading, discharge, handling and fumigation.",
      },
      {
        title: "Damage assessment",
        text: "Independent extent-and-cause surveys to support fair settlement.",
      },
      {
        title: "Laboratory analysis",
        text: "Moisture, protein, calorific value and contaminant testing to reference methods.",
      },
    ],
  },
  projects: {
    eyebrow: "Selected projects",
    title: "Work that stood up when it mattered.",
    lead: "Representative engagements across commodities and ports.",
    viewAll: "View all projects",
    readCase: "Read case study",
    commodity: "Commodity",
    approach: "Our approach",
    related: "Related service",
  },
  statements: {
    integrity: {
      statement: "The cargo doesn't lie. Neither do we.",
      support:
        "Every figure we issue is one we can stand behind, in the contract, in arbitration, in the claim.",
    },
    speed: {
      statement: "When the vessel waits, minutes cost money.",
      support:
        "Inspectors on the Koper quay within the hour, because demurrage does not pause for paperwork.",
    },
    evidence: {
      statement: "Evidence, not opinion.",
      support:
        "Representative samples, documented method, referenced standards. A chain of proof built to hold.",
    },
  },
  coverage: {
    eyebrow: "Coverage",
    title: "Two offices. One decisive location.",
    lead: "Headquartered in Ljubljana and operating at the Port of Koper, the northern Adriatic gateway for Central European trade.",
    portAdvantage:
      "Our Koper office sits at the Port of Koper, so inspectors reach the quay fast. That is a decisive advantage for time-critical cargo.",
  },
  finalCta: {
    title: "Need goods inspected?",
    text: "Tell us the commodity, the port and the dates. We will do the rest.",
    cta: "Request an inspection",
    call: "Or call",
  },
  footer: {
    descriptor:
      "Independent third-party inspection, survey, sampling and testing. Ljubljana & Port of Koper, Slovenia.",
    explore: "Explore",
    servicesCol: "Services",
    offices: "Offices",
    legalPrivacy: "Privacy Policy",
    rights: "All rights reserved.",
    builtNote: "Proposed redesign, presented for review.",
  },
  about: {
    eyebrow: "About us",
    title: "Impartial by design. Precise by discipline.",
    lead: "Agroinspekt is a Slovenian independent inspection, survey and testing company serving commodity traders, shipping lines, importers, exporters and insurers.",
    storyTitle: "Our story",
    story: [
      "Agroinspekt is a Slovenian independent inspection, survey and testing company, operating from Ljubljana and the Port of Koper. We verify the quantity, quality and condition of goods moving through the northern Adriatic and beyond.",
      "Our remit spans the full scope of commodity inspection: grain and produce, liquids, minerals, marine cargo and dangerous goods. The principle behind every engagement is constant: independent facts, documented to a standard that holds.",
    ],
    independenceTitle: "Independence & impartiality",
    independence:
      "We hold no interest in the cargo we inspect. Our only obligation is to the facts and to the standard we work to. That independence is what makes our certificates worth issuing, and worth relying on in trade, arbitration and claims.",
    expertiseTitle: "Expertise",
    expertise:
      "Our inspectors combine deep commodity knowledge with rigorous method across agricultural, mineral, liquid and hazardous goods: draft survey, mechanical and manual sampling, laboratory analysis and damage assessment.",
    teamTitle: "Team",
    teamPlaceholder:
      "Profiles of our key inspectors and management will appear here.",
    valuesTitle: "How we work",
    values: [
      {
        title: "Independent",
        text: "No stake in the goods. Only the facts and the standard.",
      },
      {
        title: "Standards-led",
        text: "Work carried out to recognised international standards.",
      },
      {
        title: "Precise",
        text: "Defensible method, documented evidence, tabular data.",
      },
      {
        title: "Responsive",
        text: "At the quay fast when cargo cannot wait.",
      },
    ],
  },
  servicePage: {
    covers: "What it covers",
    commodities: "Commodities",
    methods: "Inspection & sampling methods",
    standards: "Relevant standards",
    otherServices: "Other services",
    ctaTitle: "Need this inspected?",
    ctaText: "Request an inspection and an operations lead will respond.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Request an inspection.",
    lead: "Tell us what you are moving and when. We cover both offices and the Port of Koper.",
    formTitle: "Enquiry",
    name: "Full name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    commodity: "Commodity",
    serviceType: "Service type",
    serviceTypePlaceholder: "Select a service…",
    location: "Location / port",
    dateFrom: "Date from",
    dateTo: "Date to",
    message: "Details",
    submit: "Send enquiry",
    sending: "Sending…",
    success: "Thank you. Your enquiry has been noted, and we will be in touch.",
    error: "Something went wrong. Please try again, or email us directly.",
    required: "Required",
    officesTitle: "Our offices",
  },
  common: {
    backHome: "Back to home",
    requestCta: "Request an inspection",
    phone: "Phone",
    email: "Email",
    whatsapp: "Chat on WhatsApp",
  },
};

const si: Dict = {
  meta: {
    homeTitle: "Agroinspekt: Neodvisni nadzor, pregledi in testiranje",
    homeDescription:
      "Neodvisni tretji-stranski nadzor, pregledi, vzorčenje in testiranje kmetijskih surovin, mineralov, tekočin in nevarnega blaga. Ljubljana in Luka Koper.",
  },
  nav: {
    about: "O nas",
    services: "Storitve",
    projects: "Projekti",
    coverage: "Pokritost",
    contact: "Kontakt",
    requestCta: "Naročite pregled",
  },
  hero: {
    eyebrow: "Neodvisno · Nepristransko · Tretja stran",
    title: "Neodvisen nadzor, pregledi in testiranje blaga v trgovini.",
    subtitle:
      "Neodvisno preverjanje količine, kakovosti in stanja za trgovce, ladjarje, uvoznike, izvoznike in zavarovalnice, ki premikajo surovine skozi Koper in širše.",
    primaryCta: "Naročite pregled",
    secondaryCta: "Oglejte si storitve",
    scroll: "Drsaj",
    slides: [
      {
        headline: "Preverimo, kaj je v tovoru in v kakšnem stanju je.",
        support:
          "Neodvisen nadzor, pregledi, vzorčenje in testiranje blaga v trgovini.",
      },
      {
        headline:
          "Neodvisno poročilo, ki mu nasprotna stranka ne more oporekati.",
        support:
          "Količina, kakovost in stanje, dokumentirano po priznanih standardih, da vzdrži v pogodbi, arbitraži in odškodninskem zahtevku.",
      },
      {
        headline: "Naši nadzorniki so že v Luki Koper.",
        support: "Hitro na privezu, ko tovor ne more čakati.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Kako poteka",
    title: "Od povpraševanja do poročila, v štirih korakih.",
    lead: "Jasen, dokumentiran proces, da vedno veste, kaj sledi.",
    steps: [
      {
        title: "Povpraševanje",
        text: "Sporočite nam surovino, pristanišče in datume. Potrdimo obseg, metodo in standard.",
      },
      {
        title: "Prisotnost in vzorčenje",
        text: "Naš nadzornik je prisoten na kraju samem in odvzame reprezentativne vzorce po protokolu.",
      },
      {
        title: "Nadzor in analiza",
        text: "Preverimo količino, kakovost in stanje, po potrebi z laboratorijskim testiranjem.",
      },
      {
        title: "Poročilo in certifikat",
        text: "Prejmete jasno, zagovorljivo poročilo in certifikat, na katerega se lahko zanesete.",
      },
    ],
    points: [
      {
        label: "Neodvisni",
        text: "Brez deleža v tovoru, le dejstva in standard, po katerem delamo.",
      },
      {
        label: "Na privezu",
        text: "Nadzorniki v Luki Koper, ko časovno kritičen tovor ne more čakati.",
      },
      {
        label: "Celoten obseg",
        text: "Osem področij nadzora, od žit in pridelkov do tekočin in nevarnega blaga.",
      },
      {
        label: "Zagovorljivi",
        text: "Dokumentirana metoda in dokazi, zgrajeni, da vzdržijo v trgovini, arbitraži in zahtevkih.",
      },
    ],
  },
  whatWeDo: {
    eyebrow: "Kaj počnemo",
    title: "Enoten niz neodvisnih dejstev, ki mu zaupa vsaka stran.",
    lead: "Neodvisni tretji-stranski nadzor je nevtralna verifikacija, ki omogoča, da trgovina poteka z zaupanjem.",
    body: "Ko blago menja lastnika prek meja, kupci, prodajalci, ladjarji in zavarovalnice nosijo tveganje. Kot nepristranska tretja stran brez deleža v tovoru ugotavljamo količino, kakovost in stanje po dokumentiranem standardu, tako lahko vsaka stran ravna na osnovi istih zaupanja vrednih dejstev, se pošteno poravna in rešuje spore na podlagi dokazov, ne trditev.",
    points: [
      {
        title: "Ščiti kupca",
        text: "Potrdi, da blago ustreza pogodbi pred plačilom in prevzemom.",
      },
      {
        title: "Ščiti prodajalca",
        text: "Dokumentira, da je bilo blago brezhibno in pravilno ob odpremi.",
      },
      {
        title: "Ščiti zavarovalnico",
        text: "Zagotavlja neodvisen dokaz obsega, vzroka in vrednosti pri zahtevku.",
      },
    ],
  },
  services: {
    eyebrow: "Storitve",
    title: "Osem področij nadzora, en standard natančnosti.",
    lead: "Od ugreznega pregleda do laboratorijske analize nudimo specialistično pokritje surovin, s katerimi trgujejo naši naročniki.",
    viewAll: "Vse storitve",
    learnMore: "Več",
  },
  accreditations: {
    eyebrow: "Standardi in metoda",
    title: "Standardi, ki naša poročila naredijo uporabna.",
    lead: "Naši pregledi so izvedeni po priznanih mednarodnih standardih, tako da certifikati vzdržijo v trgovini, arbitraži in zahtevkih.",
    points: [
      {
        title: "Dokumentirana metoda",
        text: "Vsak pregled sledi pisnemu protokolu, tako da so rezultati ponovljivi in sledljivi.",
      },
      {
        title: "Priznani standardi",
        text: "Delamo po uveljavljenih mednarodnih referencah za vzorčenje in testiranje, primernih za vsako surovino.",
      },
      {
        title: "Zagovorljivi dokazi",
        text: "Reprezentativni vzorci in jasno poročanje ustvarijo certifikate, ki vzdržijo v trgovini, arbitraži in zahtevkih.",
      },
    ],
    logoLabel: "Logotip",
    logosTitle: "Akreditacije in članstva",
    logosNote:
      "Logotipi certifikatov in članstev bodo prikazani tukaj, ko jih potrdimo z Agroinspektom.",
    items: [],
  },
  capability: {
    eyebrow: "Zmogljivosti",
    title: "Celoten proces nadzora, od začetka do konca.",
    lead: "Pet disciplin, ki se združijo v enotno, zagovorljivo verigo dokazov.",
    steps: [
      {
        title: "Vzorčenje",
        text: "Reprezentativni vzorci po protokolu, razdeljeni, plombirani in hranjeni za arbitražo.",
      },
      {
        title: "Nadzor",
        text: "Količina, kakovost in stanje preverjeni glede na pogodbo in standard.",
      },
      {
        title: "Supervizija",
        text: "Nadzor natovarjanja, raztovarjanja, ravnanja in fumigacije na kraju samem.",
      },
      {
        title: "Ocena škode",
        text: "Neodvisni pregledi obsega in vzroka v podporo pošteni poravnavi.",
      },
      {
        title: "Laboratorijska analiza",
        text: "Testiranje vlage, beljakovin, kalorične vrednosti in onesnaževal po referenčnih metodah.",
      },
    ],
  },
  projects: {
    eyebrow: "Izbrani projekti",
    title: "Delo, ki je vzdržalo, ko je bilo pomembno.",
    lead: "Reprezentativni projekti po surovinah in pristaniščih.",
    viewAll: "Vsi projekti",
    readCase: "Preberi študijo primera",
    commodity: "Surovina",
    approach: "Naš pristop",
    related: "Povezana storitev",
  },
  statements: {
    integrity: {
      statement: "Tovor ne laže. Tudi mi ne.",
      support:
        "Za vsako številko, ki jo izdamo, stojimo: v pogodbi, v arbitraži, v zahtevku.",
    },
    speed: {
      statement: "Ko ladja čaka, vsaka minuta stane.",
      support:
        "Nadzorniki na koprskem privezu v eni uri, kajti zamudnina ne čaka na papirologijo.",
    },
    evidence: {
      statement: "Dokazi, ne mnenja.",
      support:
        "Reprezentativni vzorci, dokumentirana metoda, referenčni standardi. Veriga dokazov, zgrajena, da vzdrži.",
    },
  },
  coverage: {
    eyebrow: "Pokritost",
    title: "Dve pisarni. Ena odločilna lokacija.",
    lead: "S sedežem v Ljubljani in delovanjem v Luki Koper. To so vrata severnega Jadrana za srednjeevropsko trgovino.",
    portAdvantage:
      "Naša pisarna v Kopru je v Luki Koper, zato nadzorniki hitro pridejo na privez. To je odločilna prednost za časovno kritičen tovor.",
  },
  finalCta: {
    title: "Potrebujete pregled blaga?",
    text: "Sporočite nam surovino, pristanišče in datume. Za ostalo poskrbimo mi.",
    cta: "Naročite pregled",
    call: "Ali pokličite",
  },
  footer: {
    descriptor:
      "Neodvisni tretji-stranski nadzor, pregledi, vzorčenje in testiranje. Ljubljana in Luka Koper, Slovenija.",
    explore: "Razišči",
    servicesCol: "Storitve",
    offices: "Pisarni",
    legalPrivacy: "Politika zasebnosti",
    rights: "Vse pravice pridržane.",
    builtNote: "Predlagana prenova, predstavljeno v pregled.",
  },
  about: {
    eyebrow: "O nas",
    title: "Nepristranski po zasnovi. Natančni po disciplini.",
    lead: "Agroinspekt je slovensko neodvisno podjetje za nadzor, preglede in testiranje, ki streže trgovcem s surovinami, ladjarjem, uvoznikom, izvoznikom in zavarovalnicam.",
    storyTitle: "Naša zgodba",
    story: [
      "Agroinspekt je slovensko neodvisno podjetje za nadzor, preglede in testiranje, z delovanjem iz Ljubljane in Luke Koper. Preverjamo količino, kakovost in stanje blaga, ki se pretaka skozi severni Jadran in širše.",
      "Naš obseg zajema celotno področje nadzora surovin: žita in pridelke, tekočine, minerale, pomorski tovor in nevarno blago. Načelo za vsakim projektom ostaja isto: neodvisna dejstva, dokumentirana po standardu, ki vzdrži.",
    ],
    independenceTitle: "Neodvisnost in nepristranskost",
    independence:
      "Nimamo interesa v tovoru, ki ga pregledujemo. Naša edina obveza so dejstva in standard, po katerem delamo. Prav ta neodvisnost je tisto, kar naredi naše certifikate vredne izdaje in vredne zaupanja v trgovini, arbitraži in zahtevkih.",
    expertiseTitle: "Strokovnost",
    expertise:
      "Naši nadzorniki združujejo poglobljeno poznavanje surovin z natančno metodo pri kmetijskem, mineralnem, tekočem in nevarnem blagu: ugrezni pregled, mehansko in ročno vzorčenje, laboratorijska analiza in ocena škode.",
    teamTitle: "Ekipa",
    teamPlaceholder:
      "Profili naših ključnih nadzornikov in vodstva bodo prikazani tukaj.",
    valuesTitle: "Kako delamo",
    values: [
      {
        title: "Neodvisno",
        text: "Brez deleža v blagu. Le dejstva in standard.",
      },
      {
        title: "Po standardih",
        text: "Delo izvedeno po priznanih mednarodnih standardih.",
      },
      {
        title: "Natančno",
        text: "Zagovorljiva metoda, dokumentirani dokazi, tabelarni podatki.",
      },
      {
        title: "Odzivno",
        text: "Hitro na privezu, ko tovor ne more čakati.",
      },
    ],
  },
  servicePage: {
    covers: "Kaj zajema",
    commodities: "Surovine",
    methods: "Metode nadzora in vzorčenja",
    standards: "Relevantni standardi",
    otherServices: "Druge storitve",
    ctaTitle: "Potrebujete pregled?",
    ctaText: "Naročite pregled in vodja operacij se bo odzval.",
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Naročite pregled.",
    lead: "Sporočite nam, kaj prevažate in kdaj. Pokrivamo obe pisarni in Luko Koper.",
    formTitle: "Povpraševanje",
    name: "Ime in priimek",
    company: "Podjetje",
    email: "E-pošta",
    phone: "Telefon",
    commodity: "Surovina",
    serviceType: "Vrsta storitve",
    serviceTypePlaceholder: "Izberite storitev…",
    location: "Lokacija / pristanišče",
    dateFrom: "Datum od",
    dateTo: "Datum do",
    message: "Podrobnosti",
    submit: "Pošlji povpraševanje",
    sending: "Pošiljanje…",
    success: "Hvala. Vaše povpraševanje je zabeleženo in oglasili se vam bomo.",
    error: "Prišlo je do napake. Poskusite znova ali nam pišite neposredno.",
    required: "Obvezno",
    officesTitle: "Naši pisarni",
  },
  common: {
    backHome: "Nazaj na domov",
    requestCta: "Naročite pregled",
    phone: "Telefon",
    email: "E-pošta",
    whatsapp: "Klepet na WhatsAppu",
  },
};

const dictionaries: Record<Locale, Dict> = { en, si };

export const getDict = (locale: Locale): Dict => dictionaries[locale];
