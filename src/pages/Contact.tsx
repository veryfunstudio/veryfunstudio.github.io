import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { PageIntro } from "@/components/common/PageIntro";
import { Seo } from "@/components/seo/Seo";
import { BRAND } from "@/lib/constants";

const CONTACTS = [
  {
    label: "Email the studio",
    value: BRAND.email,
    href: `mailto:${BRAND.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "Code & projects",
    value: "github.com/veryfunstudio",
    href: BRAND.social.github,
    icon: Code2,
    external: true,
  },
  {
    label: "Studio updates",
    value: BRAND.social.xHandle,
    href: BRAND.social.x,
    icon: ArrowUpRight,
    external: true,
  },
];
export default function Contact() {
  return (
    <div className="studio-page">
      <Seo
        title="Contact Us"
        description={`Get in touch with ${BRAND.name} — feedback, partnerships, and questions from players.`}
        path="/contact"
      />
      <PageIntro
        eyebrow="04 / Get in touch"
        title="Your next move?"
        accent="Say hello."
        description="A puzzle you love, a detail we could improve, or an idea for working together. We would like to hear it."
        meta="Players & partners welcome"
      />
      <section className="studio-shell contact-layout">
        <div className="contact-channels">
          {CONTACTS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
            >
              <span className="contact-channels__icon">
                <item.icon size={22} />
              </span>
              <div>
                <span className="studio-kicker">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
              <ArrowUpRight size={20} />
            </a>
          ))}
        </div>
        <aside className="contact-note">
          <span className="studio-kicker">A good place to start</span>
          <h2>
            Help us see
            <br />
            <em>what you see.</em>
          </h2>
          <p>
            For a game issue, include the game name, your device, and what happened. A screenshot
            helps us understand the board.
          </p>
          <p>For a partnership, tell us the idea and what you would like to build together.</p>
          <div className="contact-note__tiles" aria-hidden="true">
            {["tile_bamboo_3", "tile_flower_orchid", "tile_dragon_red"].map((mark) => (
              <img
                key={mark}
                src={`/game-assets/nova-mahjong/${mark}.png`}
                alt=""
                width={198}
                height={241}
              />
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
