import { Code2, Mail, SquareArrowOutUpRight } from "lucide-react";
import { Seo } from "@/components/seo/Seo";
import { BRAND } from "@/lib/constants";

const CONTACT_INFO = [
  {
    icon: <Mail size={20} />,
    title: "Player feedback",
    value: BRAND.email,
    link: `mailto:${BRAND.email}`,
    external: false,
  },
  {
    icon: <Code2 size={20} />,
    title: "Code notes",
    value: "github.com/cookabc",
    link: BRAND.social.github,
    external: true,
  },
  {
    icon: <SquareArrowOutUpRight size={20} />,
    title: "Studio updates",
    value: BRAND.social.xHandle,
    link: BRAND.social.x,
    external: true,
  },
] as const;

const Contact = () => {
  return (
    <div className="workshop-page">
      <Seo
        title="Contact Us"
        description={`Get in touch with ${BRAND.name} - email, X (Twitter), or GitHub. We'd love to hear from players and partners.`}
        path="/contact"
      />

      <section className="contact-hero">
        <div className="workshop-shell contact-hero__grid">
          <div className="contact-hero-copy">
            <p className="eyebrow">Contact</p>
            <h1>
              Let's build something <span>fun</span> together.
            </h1>
            <p>
              Send player feedback, partnership context, press questions, or bug reports. Email is
              the fastest route.
            </p>
            <a href={`mailto:${BRAND.email}`} className="workshop-button workshop-button--accent">
              <Mail size={16} /> Email the studio
            </a>
            <div className="contact-routes">
              {CONTACT_INFO.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                >
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <em>{item.value}</em>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-workshop">
            <div className="contact-workshop__card tactile-card">
              <h2>Visit our workshop</h2>
              <p>Independent, remote, and always close to the work.</p>
              <img
                src="/images/stitch/workshop-article.jpg"
                alt="A wooden game-design workbench with a puzzle prototype"
                width={900}
                height={1000}
              />
              <span>Crafted with structural honesty.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-band">
        <div className="workshop-shell">
          <strong>Want to work with us?</strong>
          <p>
            Send the context, the constraint, and what a good outcome looks like. Email is the
            fastest route.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
