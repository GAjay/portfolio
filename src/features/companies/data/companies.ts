export type Company = {
  id: string;
  name: string;
  short: string;
  /** Local copy of logo from the company site (see logoSource). */
  logo: string;
  logoSource?: string;
  website?: string;
  /** When true, invert logo in dark mode for black-on-transparent SVGs. */
  monoDark?: boolean;
  /** Short industry label for carousel cards. */
  sector?: string;
};

/** Logo metadata keyed by `logoId` / carousel id. */
export const companyCatalog: Record<string, Company> = {
  publicis: {
    id: "publicis",
    name: "Publicis Sapient",
    short: "Publicis Sapient",
    logo: "/assets/companies/publicis.svg",
    logoSource:
      "https://www.publicissapient.com/content/dam/ps-redesign/us/en/global/footer/ps-logo-footer.svg",
    website: "https://www.publicissapient.com/",
    sector: "Digital consulting",
  },
  lloyds: {
    id: "lloyds",
    name: "Lloyds Bank",
    short: "Lloyds",
    logo: "/assets/companies/lloyds.svg",
    logoSource: "https://www.lloydsbank.com/",
    website: "https://www.lloydsbank.com/",
    sector: "Banking",
  },
  vymo: {
    id: "vymo",
    name: "Vymo",
    short: "Vymo",
    logo: "/assets/companies/vymo.png",
    logoSource: "https://vymo.com/press/wp-content/uploads/2021/08/main-logo.png",
    website: "https://vymo.com/",
    sector: "Sales engagement",
  },
  magento: {
    id: "magento",
    name: "Magento",
    short: "Magento",
    logo: "/assets/companies/magento.svg",
    logoSource:
      "https://business.adobe.com/products/magento/magento-commerce.html",
    website: "https://business.adobe.com/products/magento/magento-commerce.html",
    sector: "E‑commerce",
  },
  ranosys: {
    id: "ranosys",
    name: "Ranosys",
    short: "Ranosys",
    logo: "/assets/companies/ranosys.svg",
    logoSource:
      "https://www.ranosys.com/wp-content/uploads/2026/06/Ranosys-Black_1.svg",
    website: "https://www.ranosys.com/",
    monoDark: true,
    sector: "Digital commerce",
  },
  wordpress: {
    id: "wordpress",
    name: "WordPress",
    short: "WordPress",
    logo: "/assets/companies/wordpress.svg",
    logoSource: "https://wordpress.org/",
    website: "https://wordpress.org/",
    sector: "CMS",
  },
  tata: {
    id: "tata",
    name: "Tata",
    short: "Tata",
    logo: "/assets/companies/tata.svg",
    logoSource:
      "https://www.tata.com/etc.clientlibs/tata/clientlibs/assets/resources/img/pages/nav/Tata_Logo2.svg",
    website: "https://www.tata.com/",
    sector: "Enterprise",
  },
  wipro: {
    id: "wipro",
    name: "Wipro",
    short: "Wipro",
    logo: "/assets/companies/wipro.svg",
    logoSource: "https://www.wipro.com/content/dam/wipro/social-icons/wipro_new_logo.svg",
    website: "https://www.wipro.com/",
    sector: "IT services",
  },
  apollo: {
    id: "apollo",
    name: "Apollo Global Management",
    short: "Apollo",
    logo: "/assets/companies/apollo.svg",
    logoSource:
      "https://d1io3yog0oux5.cloudfront.net/_89a8fecd520bcfa7f96361eee84d6d4f/apollo/files/theme/images/logo-sm.svg",
    website: "https://www.apollo.com/",
    sector: "Financial services",
  },
  capbridge: {
    id: "capbridge",
    name: "CapBridge",
    short: "CapBridge",
    logo: "/assets/companies/capbridge.png",
    logoSource: "https://www.capbridge.sg/",
    website: "https://www.capbridge.sg/",
    sector: "Investment platform",
  },
  razertech: {
    id: "razertech",
    name: "Razertech",
    short: "Razertech",
    logo: "/assets/companies/razertech.svg",
    logoSource: "https://www.razrcorp.com/",
    website: "https://www.razrcorp.com/",
    sector: "Product studio",
  },
};

/** Section 02 carousel — employers and client brands (matches reference mock). */
export const carouselBrandIds = [
  "publicis",
  "lloyds",
  "vymo",
  "apollo",
  "capbridge",
  "ranosys",
  "wordpress",
  "tata",
  "wipro",
  "razertech",
] as const;

export function brandsForCarousel(): Company[] {
  return carouselBrandIds
    .map((id) => companyCatalog[id])
    .filter((c): c is Company => Boolean(c));
}

export function employersFromJourney(
  journey: { logoId?: string }[],
): Company[] {
  const seen = new Set<string>();
  const list: Company[] = [];
  for (const entry of journey) {
    const id = entry.logoId;
    if (!id || seen.has(id)) continue;
    const company = companyCatalog[id];
    if (!company) continue;
    seen.add(id);
    list.push(company);
  }
  return list;
}

export const companyLogoById = Object.fromEntries(
  Object.values(companyCatalog).map((c) => [c.id, c.logo]),
) as Record<string, string>;
