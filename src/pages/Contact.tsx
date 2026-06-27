import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Mail, Send, SquareArrowOutUpRight } from "lucide-react";
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
          <span className="page-kicker">Contact</span>
          <h1>Talk to VeryFun Company.</h1>
          <p>
            Send player feedback, partnership context, press questions, or bug reports. Short,
            specific notes are easiest to answer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="contact-panel"
        >
          <div className="contact-panel-header">
            <span className="status-text">Message</span>
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
    </div>
  );
};

export default Contact;
