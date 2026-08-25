import {
  BRAND,
  BRAND_LOGO_URL,
  GOOGLE_PLAY_DEVELOPER_URL,
  LEGAL_ENTITY_NAME,
  SITE_URL,
} from "./constants";

/**
 * Shared schema.org building blocks. Kept in one module so every page emits
 * the same Organization identity (name, logo, contact, address, sameAs) —
 * consistency across pages is what lets AI cross-verify the studio.
 */

export const ORGANIZATION_LOGO = {
  "@type": "ImageObject",
  url: BRAND_LOGO_URL,
  width: 512,
  height: 512,
} as const;

export const ORGANIZATION_SAME_AS = [
  BRAND.social.github,
  BRAND.social.x,
  GOOGLE_PLAY_DEVELOPER_URL,
] as const;

export const ORGANIZATION_CONTACT_POINT = {
  "@type": "ContactPoint",
  contactType: "customer support",
  email: BRAND.email,
  url: `${SITE_URL}/contact`,
} as const;

/**
 * Developer address as publicly disclosed on the Google Play store listing
 * (Google requires all developers to publish it). Kept byte-identical to the
 * store disclosure so cross-checks against the Play page succeed.
 */
export const ORGANIZATION_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "定福家园南里1号院 1号楼3单元1603",
  addressLocality: "朝阳区",
  addressRegion: "北京市",
  postalCode: "100024",
  addressCountry: "CN",
} as const;

/** Full Organization JSON-LD (includes @context). Emit once on the home page. */
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.name,
  legalName: LEGAL_ENTITY_NAME,
  alternateName: "VeryFunStudio",
  url: SITE_URL,
  logo: ORGANIZATION_LOGO,
  description: BRAND.description,
  slogan: BRAND.tagline,
  email: BRAND.email,
  contactPoint: [ORGANIZATION_CONTACT_POINT],
  address: ORGANIZATION_ADDRESS,
  sameAs: [...ORGANIZATION_SAME_AS],
} as const;

/** Compact Organization node for embedding as author/publisher (no @context). */
export const ORGANIZATION_REFERENCE = {
  "@type": "Organization",
  name: BRAND.name,
  url: SITE_URL,
  logo: ORGANIZATION_LOGO,
  email: BRAND.email,
  sameAs: [...ORGANIZATION_SAME_AS],
} as const;

/** WebSite JSON-LD for the home page. */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: BRAND.name,
  alternateName: "VeryFunStudio",
  url: SITE_URL,
  publisher: ORGANIZATION_REFERENCE,
} as const;
