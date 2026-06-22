import { Link } from "react-router-dom";
import { m } from "framer-motion";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  showcaseImages?: {
    src: string;
    alt: string;
    title: string;
  }[];
}

const HeroSection = ({
  title,
  subtitle,
  buttonText,
  buttonLink,
  showcaseImages,
}: HeroSectionProps) => {
  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-4 text-center">
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="mx-auto mb-6 max-w-4xl font-kalam text-5xl font-bold leading-tight text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mb-10 max-w-3xl font-patrick text-xl leading-relaxed text-foreground sm:text-2xl">
            {subtitle}
          </p>
          {buttonText && buttonLink && (
            <m.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to={buttonLink}
                className="hand-drawn-button inline-block bg-white px-8 py-3 font-patrick text-lg text-foreground no-underline"
              >
                {buttonText}
              </Link>
            </m.div>
          )}
        </m.div>

        {showcaseImages && showcaseImages.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
            aria-label="Featured game screenshots"
          >
            {showcaseImages.map((image, index) => (
              <figure
                key={image.src}
                className={`hand-drawn-card relative overflow-hidden bg-white ${
                  index % 2 === 0 ? "-rotate-1" : "rotate-1"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={1024}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover outline outline-1 outline-black/10"
                />
                <figcaption className="px-3 py-2 text-left font-patrick text-base leading-tight text-foreground">
                  {image.title}
                </figcaption>
              </figure>
            ))}
          </m.div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
