import { motion } from "framer-motion";
import { Code2, Mail, SquareArrowOutUpRight } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const CONTACT_INFO = [
  {
    icon: <Mail size={20} />,
    title: "Email",
    value: "chuangcius@gmail.com",
    link: "mailto:chuangcius@gmail.com",
  },
  {
    icon: <Code2 size={20} />,
    title: "GitHub",
    value: "github.com/cookabc",
    link: "https://github.com/cookabc",
  },
  {
    icon: <SquareArrowOutUpRight size={20} />,
    title: "X",
    value: "@chuangcius",
    link: "https://x.com/chuangcius",
  },
] as const;

const Contact = () => {
  return (
    <div className="site-page relative overflow-hidden px-[3.125vw] pt-28 pb-24 lg:pt-32">
      <Seo
        title="Contact Us"
        description="Get in touch with VeryFun Company - email, X (Twitter), or GitHub. We'd love to hear from players and partners."
        path="/contact"
        noindex
      />

      <section className="contact-hero">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="contact-hero-copy"
        >
          <h1>Talk to VeryFun Company.</h1>
          <p>
            Send player feedback, partnership context, press questions, or bug reports. Email is the
            fastest route.
          </p>
          <a
            href="mailto:chuangcius@gmail.com"
            className="pill-button pill-button--accent contact-primary-link"
          >
            <Mail size={16} />
            Email the studio
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="contact-panel"
        >
          <h2>
            chuangcius@
            <br />
            gmail.com
          </h2>
          <p>
            Include the game name, device, and a short description when reporting bugs. For press or
            partnership notes, lead with the context and timeline.
          </p>
          <a href="mailto:chuangcius@gmail.com" className="contact-panel-link">
            Open email
            <SquareArrowOutUpRight size={18} />
          </a>
        </motion.div>
      </section>

      <section className="contact-routes">
        {CONTACT_INFO.map((item) => (
          <a
            key={item.title}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
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
