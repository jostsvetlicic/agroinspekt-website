import { brand, offices, whatsapp } from "@/config/site";
import { getServices } from "@/lib/services";

/**
 * JSON-LD structured data. An Organization plus a LocalBusiness node per office
 * (Koper carries geo-coordinates for local "cargo inspection Koper" search),
 * and the services as an offer catalog for topical relevance.
 */
export default async function StructuredData() {
  const site = "https://agroinspekt.si";
  const services = await getServices();

  const localBusiness = offices.map((o) => ({
    "@type": "LocalBusiness",
    "@id": `${site}/#${o.id}`,
    name: `${brand.legalName} — ${o.city}`,
    parentOrganization: { "@id": `${site}/#org` },
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      postalCode: o.postal.match(/^\d+/)?.[0] ?? o.postal,
      addressLocality: o.city,
      addressCountry: "SI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: o.coords.lat,
      longitude: o.coords.lng,
    },
    telephone: o.phone,
    email: o.emails[0],
    areaServed: "Port of Koper, Slovenia",
  }));

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site}/#org`,
        name: brand.legalName,
        alternateName: brand.name,
        url: site,
        logo: `${site}/logo/agroinspect-logo.png`,
        email: brand.email,
        telephone: offices[0].phone,
        description:
          "Independent third-party inspection, survey, sampling and testing of traded goods at the Port of Koper and across Slovenia.",
        sameAs: [`https://wa.me/${whatsapp.number}`],
        knowsAbout: [
          "cargo inspection",
          "marine survey",
          "draft survey",
          "sampling and testing",
          "grains and feedstuff",
          "coffee, cocoa and rice",
          "liquids and edible oils",
          "minerals, coal, coke and ores",
          "dangerous goods",
          "Port of Koper",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Inspection services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.en.title },
          })),
        },
      },
      ...localBusiness,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
