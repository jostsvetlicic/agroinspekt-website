import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/config/site";
import { brand, offices } from "@/config/site";
import { getDict } from "@/i18n/dictionaries";
import { isLocale } from "@/lib/i18n";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = { title: "Privacy Policy" };

const copy = {
  en: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    lead: "How Agroinspekt handles personal data submitted through this website.",
    sections: [
      {
        h: "Data controller",
        p: `${brand.legalName}, ${offices[0].street}, ${offices[0].postal}, Slovenia. Enquiries: ${brand.email}.`,
      },
      {
        h: "What we collect",
        p: "Contact and enquiry details you submit (name, company, email, phone, commodity, service type, location and dates) solely to respond to your request.",
      },
      {
        h: "Legal basis & retention",
        p: "Processing is based on your consent and our legitimate interest in responding to enquiries. Data is retained only as long as necessary for that purpose.",
      },
      {
        h: "Your rights (GDPR)",
        p: "You may request access, rectification, erasure or restriction of your data, and lodge a complaint with the Slovenian Information Commissioner.",
      },
    ],
  },
  si: {
    eyebrow: "Pravno",
    title: "Politika zasebnosti",
    lead: "Kako Agroinspekt ravna z osebnimi podatki, posredovanimi prek te spletne strani.",
    sections: [
      {
        h: "Upravljavec podatkov",
        p: `${brand.legalName}, ${offices[0].street}, ${offices[0].postal}, Slovenija. Povpraševanja: ${brand.email}.`,
      },
      {
        h: "Kaj zbiramo",
        p: "Kontaktne podatke in podrobnosti povpraševanja, ki jih posredujete (ime, podjetje, e-pošta, telefon, surovina, vrsta storitve, lokacija in datumi), izključno za odgovor na vašo zahtevo.",
      },
      {
        h: "Pravna podlaga in hramba",
        p: "Obdelava temelji na vaši privolitvi in našem zakonitem interesu za odgovarjanje na povpraševanja. Podatki se hranijo le toliko časa, kolikor je potrebno za ta namen.",
      },
      {
        h: "Vaše pravice (GDPR)",
        p: "Zahtevate lahko dostop, popravek, izbris ali omejitev svojih podatkov ter vložite pritožbo pri Informacijskem pooblaščencu RS.",
      },
    ],
  },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const c = copy[l];
  const nav = getDict(l).nav;

  return (
    <>
      <PageHero
        locale={l}
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        crumbs={[{ label: c.title }]}
      />
      <section className="section">
        <div className="container-x max-w-3xl">
          <div className="space-y-10">
            {c.sections.map((s) => (
              <div key={s.h}>
                <h2 className="font-display text-xl font-medium text-ink">
                  {s.h}
                </h2>
                <p className="mt-3 leading-relaxed text-grey">{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
