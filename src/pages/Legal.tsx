import { Seo } from "@/components/seo/Seo";

export default function Legal() {
  return (
    <main className="site-page flex flex-col gap-20 px-[3.125vw] pb-28 pt-40">
      <Seo
        title="Legal"
        description="Privacy policy and terms of service for Cook ABC and our mobile puzzle games."
        path="/legal"
      />

      <header className="mx-auto w-full max-w-3xl text-center">
        <span className="status-text">Legal</span>
        <h1 className="kinetic-title mt-5">Privacy and terms</h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
          We keep our games simple. Our legal language tries to be simple too.
        </p>
      </header>

      <section aria-labelledby="privacy-heading" className="mx-auto w-full max-w-3xl">
        <h2 id="privacy-heading" className="text-2xl font-semibold tracking-tight">
          Privacy policy
        </h2>
        <p className="mt-4 leading-relaxed text-foreground">
          Cook ABC built the games listed on this site. We do not collect personal information
          through this website. When you download our games from Google Play, Google may collect
          data according to its own privacy policy.
        </p>
        <p className="mt-4 leading-relaxed text-foreground">
          Our games may show ads served by Google AdMob. AdMob uses device identifiers to serve
          personalized or non-personalized ads. You can adjust ad preferences in your device
          settings.
        </p>
        <p className="mt-4 leading-relaxed text-foreground">
          We do not sell your data. If you contact us by email, we keep your message only long
          enough to respond.
        </p>
      </section>

      <section aria-labelledby="terms-heading" className="mx-auto w-full max-w-3xl">
        <h2 id="terms-heading" className="text-2xl font-semibold tracking-tight">
          Terms of service
        </h2>
        <p className="mt-4 leading-relaxed text-foreground">
          Our games are provided for personal, non-commercial use. You may not reverse-engineer,
          modify, or redistribute the apps or their content without written permission.
        </p>
        <p className="mt-4 leading-relaxed text-foreground">
          We aim to keep the games available and enjoyable, but we do not guarantee uninterrupted
          service. We may update or remove games at any time.
        </p>
        <p className="mt-4 leading-relaxed text-foreground">
          These terms may change as our games evolve. The latest version will always be posted here
          with an updated date.
        </p>
      </section>

      <footer className="mx-auto w-full max-w-3xl border-t border-border-soft pt-8">
        <p className="text-sm text-muted">Last updated: July 2, 2026</p>
      </footer>
    </main>
  );
}
