import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { BRAND, GOOGLE_PLAY_DEVELOPER_URL, LEGAL_ENTITY_NAME, SITE_URL } from "./constants";
import {
  ORGANIZATION_ADDRESS,
  ORGANIZATION_CONTACT_POINT,
  ORGANIZATION_REFERENCE,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
} from "./schema";

describe("organization schema", () => {
  it("carries the core identity fields", () => {
    assert.equal(ORGANIZATION_SCHEMA["@context"], "https://schema.org");
    assert.equal(ORGANIZATION_SCHEMA["@type"], "Organization");
    assert.equal(ORGANIZATION_SCHEMA.name, BRAND.name);
    assert.equal(ORGANIZATION_SCHEMA.legalName, LEGAL_ENTITY_NAME);
    assert.equal(ORGANIZATION_SCHEMA.alternateName, "VeryFunStudio");
    assert.equal(ORGANIZATION_SCHEMA.url, SITE_URL);
    assert.equal(ORGANIZATION_SCHEMA.email, BRAND.email);
    assert.equal(ORGANIZATION_SCHEMA.logo["@type"], "ImageObject");
    assert.ok(ORGANIZATION_SCHEMA.logo.url.startsWith(SITE_URL));
  });

  it("includes a usable contactPoint (audit: Organization completeness)", () => {
    const contactPoints = ORGANIZATION_SCHEMA.contactPoint;
    assert.equal(contactPoints.length, 1);
    const point = contactPoints[0];
    assert.equal(point["@type"], "ContactPoint");
    assert.ok(point.contactType.length > 0);
    assert.match(point.email, /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    assert.ok(point.url.startsWith(SITE_URL));
  });

  it("includes a PostalAddress (audit: Organization completeness)", () => {
    const address = ORGANIZATION_SCHEMA.address;
    assert.equal(address["@type"], "PostalAddress");
    assert.ok(address.streetAddress.length > 0);
    assert.ok(address.addressLocality.length > 0);
    assert.ok(address.addressRegion.length > 0);
    assert.match(address.postalCode, /^\d{6}$/);
    assert.match(address.addressCountry, /^[A-Z]{2}$/);
  });

  it("links the same social profiles everywhere (brand consistency)", () => {
    for (const sameAs of [ORGANIZATION_SCHEMA.sameAs, ORGANIZATION_REFERENCE.sameAs]) {
      assert.ok(sameAs.includes(BRAND.social.github));
      assert.ok(sameAs.includes(BRAND.social.x));
      assert.ok(sameAs.includes(GOOGLE_PLAY_DEVELOPER_URL));
    }
  });

  it("shared building blocks stay in sync with the composed schema", () => {
    assert.deepEqual(ORGANIZATION_SCHEMA.contactPoint[0], ORGANIZATION_CONTACT_POINT);
    assert.deepEqual(ORGANIZATION_SCHEMA.address, ORGANIZATION_ADDRESS);
    assert.equal(ORGANIZATION_REFERENCE["@type"], "Organization");
    assert.equal(ORGANIZATION_REFERENCE.name, BRAND.name);
    assert.equal(ORGANIZATION_REFERENCE.url, SITE_URL);
    assert.equal(ORGANIZATION_REFERENCE.logo["@type"], "ImageObject");
  });
});

describe("website schema", () => {
  it("names the site and its publisher", () => {
    assert.equal(WEBSITE_SCHEMA["@type"], "WebSite");
    assert.equal(WEBSITE_SCHEMA.name, BRAND.name);
    assert.equal(WEBSITE_SCHEMA.alternateName, "VeryFunStudio");
    assert.equal(WEBSITE_SCHEMA.url, SITE_URL);
    assert.deepEqual(WEBSITE_SCHEMA.publisher, ORGANIZATION_REFERENCE);
  });
});
