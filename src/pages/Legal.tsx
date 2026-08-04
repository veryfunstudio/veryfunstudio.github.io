import { Seo } from "@/components/seo/Seo";
import { BRAND, LEGAL_ENTITY_NAME } from "@/lib/constants";

export default function Legal() {
  return (
    <div className="workshop-page legal-page">
      <Seo
        title="Legal"
        description={`Privacy policy and terms of service for ${LEGAL_ENTITY_NAME} and our mobile puzzle games.`}
        path="/legal"
      />

      <header className="archive-hero">
        <div className="workshop-shell">
          <p className="eyebrow">Legal</p>
          <h1>Privacy and terms</h1>
          <p>We keep our games simple. Our legal language tries to be simple too.</p>
        </div>
      </header>

      <div className="workshop-shell legal-layout">
        <nav aria-label="Legal sections">
          <a href="#privacy-heading">Privacy policy</a>
          <a href="#terms-heading">Terms of service</a>
          <span>Updated July 17, 2026</span>
        </nav>
        <main>
          <section aria-labelledby="privacy-heading">
            <h2 id="privacy-heading">Privacy policy</h2>
            <p>
              {LEGAL_ENTITY_NAME} built the games listed on this site. We do not collect personal
              information through this website. When you download our games from Google Play, Google
              may collect data according to its own privacy policy.
            </p>
            <p>
              Our games may show ads served by Google AdMob. AdMob uses device identifiers to serve
              personalized or non-personalized ads. You can adjust ad preferences in your device
              settings. Some games may also offer optional in-app purchases; those purchases are
              processed by Google Play, not by this website.
            </p>
            <p>
              We do not sell your data. If you contact us by email, we keep your message only long
              enough to respond. For privacy questions, email{" "}
              <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.
            </p>
          </section>

          <section aria-labelledby="terms-heading">
            <h2 id="terms-heading">Terms of service</h2>
            <p>
              Our games are provided for personal, non-commercial use. You may not reverse-engineer,
              modify, or redistribute the apps or their content without written permission.
            </p>
            <p>
              We aim to keep the games available and enjoyable, but we do not guarantee
              uninterrupted service. We may update or remove games at any time.
            </p>
            <p>
              These terms may change as our games evolve. The latest version will always be posted
              here with an updated date.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
