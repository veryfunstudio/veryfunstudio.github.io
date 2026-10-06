import { useEffect, useRef, useState } from "react";
import type { PlayObjectScene } from "@/lib/play-object-scene";

interface Props {
  slug: string;
  title: string;
  image: string;
}

export function HeroPlayObject({ slug, title, image }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<PlayObjectScene | null>(null);
  const currentSlug = useRef(slug);
  const [ready, setReady] = useState(false);
  currentSlug.current = slug;

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    let cancelled = false;
    let started = false;
    let visible = false;
    const observer = new IntersectionObserver(
      async ([entry]) => {
        visible = entry.isIntersecting;
        scene.current?.setVisible(visible);
        if (!visible || started) return;
        started = true;
        try {
          const { createPlayObjectScene } = await import("@/lib/play-object-scene");
          if (cancelled) return;
          const loadedSlug = currentSlug.current;
          const instance = await createPlayObjectScene(element, loadedSlug, () => {
            if (!cancelled) setReady(false);
          });
          if (cancelled) {
            instance.dispose();
            return;
          }
          scene.current = instance;
          if (loadedSlug !== currentSlug.current) instance.setGame(currentSlug.current);
          instance.setVisible(visible);
          setReady(true);
        } catch {
          // The existing key art remains usable if WebGL or the lazy chunk is unavailable.
          if (!cancelled) setReady(false);
        }
      },
      { threshold: 0.01 },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      observer.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    scene.current?.setGame(slug);
  }, [slug]);

  return (
    <div className={`play-object${ready ? " is-ready" : ""}`}>
      <div className="play-object__fallback" aria-hidden={ready}>
        <img src={image} alt={`${title} key art`} width={1200} height={630} fetchPriority="high" />
        <span>VeryFun Studio / Play a little.</span>
      </div>
      <div ref={host} className="play-object__canvas" aria-hidden="true" />
      {ready && (
        <>
          <button
            type="button"
            className="play-object__interaction"
            aria-label={`Rearrange the ${title} 3D display`}
            onClick={() => scene.current?.shuffle()}
            onPointerMove={(event) => {
              if (event.pointerType === "touch") return;
              const bounds = event.currentTarget.getBoundingClientRect();
              scene.current?.point(
                ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
                ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
              );
            }}
            onPointerLeave={() => scene.current?.point(0, 0)}
            onBlur={() => scene.current?.point(0, 0)}
          />
          <span className="play-object__hint" aria-hidden="true">
            <span className="play-object__hint-desktop">
              Move to explore · Click to {slug === "nova-mahjong" ? "shuffle" : "tilt"}
            </span>
            <span className="play-object__hint-touch">
              Tap to {slug === "nova-mahjong" ? "shuffle" : "tilt"}
            </span>
            <span>↻</span>
          </span>
        </>
      )}
    </div>
  );
}
