import { useState } from "react";
import { m } from "framer-motion";
import { FaGithub, FaEnvelope } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MailCheck } from "lucide-react";
import { Seo } from "@/components/seo/Seo";

const CONTACT_INFO = [
  {
    icon: <FaEnvelope size={24} />,
    title: "Email",
    value: "chuangcius@gmail.com",
    link: "mailto:chuangcius@gmail.com",
  },
  {
    icon: <FaGithub size={24} />,
    title: "GitHub",
    value: "github.com/cookabc",
    link: "https://github.com/cookabc",
  },
  {
    icon: <FaXTwitter size={24} />,
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
    <div>
      <Seo
        title="Contact Us"
        description="Get in touch with VeryFun Company - email, X (Twitter), or GitHub. We'd love to hear from players and partners."
        path="/contact"
        noindex
      />
      <section className="py-20">
        <div className="mx-auto max-w-[80rem] px-6">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <p className="mb-3 font-patrick text-sm font-bold uppercase tracking-wide text-accent">
              Say hello
            </p>
            <h1 className="mb-4 font-kalam text-4xl font-bold text-foreground sm:text-5xl">
              Get in Touch
            </h1>
            <p className="max-w-2xl font-patrick text-xl text-foreground">
              If you have any questions or collaboration inquiries, feel free to reach out anytime
            </p>
          </m.div>

          <div className="grid gap-12 md:grid-cols-2">
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-[4px] border-2 border-border-strong bg-surface p-8 relative"
            >
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Contact Info</h2>
              <div className="flex flex-col gap-6">
                {CONTACT_INFO.map((item, index) => (
                  <m.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-tint text-foreground"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="mb-0.5 font-kalam text-lg font-bold text-foreground">
                        {item.title}
                      </h3>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-accent font-patrick text-base"
                      >
                        {item.value}
                      </a>
                    </div>
                  </m.div>
                ))}
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className=" rounded-[4px] border-2 border-border-strong bg-surface p-8 relative"
            >
              <h2 className="mb-6 font-kalam text-2xl font-bold text-foreground">Send a Message</h2>
              {submitted ? (
                <m.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-[4px] border-2 border-border-strong bg-surface-warm text-foreground"
                    aria-hidden="true"
                  >
                    <MailCheck size={34} strokeWidth={2.3} />
                  </div>
                  <p className="font-kalam text-xl font-bold text-foreground">
                    Email Draft Requested
                  </p>
                  <p className="mt-2 font-patrick text-foreground">
                    If your email app did not open, write to chuangcius@gmail.com directly.
                  </p>
                </m.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block font-patrick text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      className="hand-drawn-input w-full px-4 py-2 font-patrick text-foreground placeholder:text-muted"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block font-patrick text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      className="hand-drawn-input w-full px-4 py-2 font-patrick text-foreground placeholder:text-muted"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block font-patrick text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      className="hand-drawn-input w-full px-4 py-2 font-patrick text-foreground resize-y placeholder:text-muted"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <m.button
                    type="submit"
                    className="hand-drawn-button w-full bg-foreground px-6 py-3 font-patrick text-base font-medium text-background"
                  >
                    Send Message
                  </m.button>
                </form>
              )}
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
