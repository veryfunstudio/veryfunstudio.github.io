import { motion } from "framer-motion";
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
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Contact Us"
        description={`Get in touch with ${BRAND.name} - email, X (Twitter), or GitHub. We'd love to hear from players and partners.`}
        path="/contact"
      />

      <section className="contact-hero contact-hero--simple">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="contact-hero-copy"
        >
          <h1>Talk to {BRAND.name}.</h1>
          <p>
            Send player feedback, partnership context, press questions, or bug reports. Email is the
            fastest route.
          </p>
          <a
            href={`mailto:${BRAND.email}`}
            className="pill-button pill-button--accent contact-primary-link"
          >
            <Mail size={16} />
            Email the studio
          </a>
        </motion.div>
      </section>

      <section className="contact-routes">
        {CONTACT_INFO.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="contact-route"
          >
            <span aria-hidden="true">{item.icon}</span>
            <strong>{item.title}</strong>
            <em>{item.value}</em>
          </a>
        ))}
      </section>
    </div>
  );
};

export default Contact;
