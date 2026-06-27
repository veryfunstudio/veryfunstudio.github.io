import { useState } from "react";
import { motion } from "framer-motion";
import { Bug, Code2, Handshake, Mail, Send, Sparkles, SquareArrowOutUpRight } from "lucide-react";
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

const CONTACT_LANES = [
  {
    icon: <Bug size={22} />,
    label: "Player report",
    response: "Bug, balance, unclear level, device issue",
    detail: "Include game title, device model, and what happened right before the issue.",
  },
  {
    icon: <Handshake size={22} />,
    label: "Partnership",
    response: "Distribution, publishing, promotion, stores",
    detail: "Send context, timeline, region, and the exact decision you need from us.",
  },
  {
    icon: <Sparkles size={22} />,
    label: "Press note",
    response: "Screenshots, studio info, launch questions",
    detail: "Tell us the outlet, deadline, topic, and which game you are covering.",
  },
] as const;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    window.location.href = `mailto:chuangcius@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

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
          <span className="page-kicker">Open channel</span>
          <h1>Send the studio a signal.</h1>
          <p>
            Player feedback, partnership notes, press questions, and bug reports all land in the
            same place. Keep it specific and we will route it cleanly.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="contact-panel"
        >
          <div className="contact-panel-header">
            <span className="status-text">message composer</span>
            <span className="status-text">mailto</span>
          </div>

          {submitted ? (
            <div className="contact-success">
              <Mail size={34} />
              <h2>Email draft requested.</h2>
              <p>If your email app did not open, write to chuangcius@gmail.com directly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  placeholder="What should we know?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button type="submit" className="pill-button pill-button--accent">
                <Send size={16} />
                Send message
              </button>
            </form>
          )}
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

      <section className="contact-intake">
        <div className="contact-intake-copy">
          <span className="status-text">Routing board</span>
          <h2>What reaches the right person fastest?</h2>
          <p>
            A clear note beats a long one. Pick the nearest lane, include concrete details, and we
            can answer without making you repeat the setup.
          </p>
        </div>

        <div className="contact-lanes">
          {CONTACT_LANES.map((lane, index) => (
            <article key={lane.label} className="contact-lane">
              <div>
                <span aria-hidden="true">{lane.icon}</span>
                <em>{String(index + 1).padStart(2, "0")}</em>
              </div>
              <strong>{lane.label}</strong>
              <p>{lane.response}</p>
              <small>{lane.detail}</small>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contact;
