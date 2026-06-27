import fs from "fs";
import path from "path";
import Image from "next/image";
import "./vibes.css";
import { curatedVibes, VibeItem } from "./vibes-content";

const VIBES_DIR = path.join(process.cwd(), "public", "vibes");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function getVibesImages(): VibeItem[] {
  try {
    const files = fs.readdirSync(VIBES_DIR);
    return files
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .map((filename) => {
        const stat = fs.statSync(path.join(VIBES_DIR, filename));
        return {
          type: "image" as const,
          date: new Date(stat.mtimeMs).toISOString(),
          src: `/vibes/${filename}`,
        };
      });
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default function Vibes() {
  const items: VibeItem[] = [...curatedVibes, ...getVibesImages()].sort((a, b) =>
    b.date.localeCompare(a.date),
  );

  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-2 accent-font">Vibes</h1>
      <p className="vibes-subtitle">
        A scrapbook — things I&apos;m reading, watching, and saving lately.
      </p>

      {items.length === 0 ? (
        <p className="vibes-empty">No vibes yet...</p>
      ) : (
        <div className="vibes-gallery">
          {items.map((item, i) => (
            <VibeCard key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

function VibeCard({ item }: { item: VibeItem }) {
  if (item.type === "quote") {
    return (
      <figure className="vibes-gallery-item vibe-quote">
        <blockquote className="vibe-quote-body">
          {item.lines.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </blockquote>
        <figcaption className="vibe-quote-attribution">
          — {item.attribution}
        </figcaption>
      </figure>
    );
  }

  if (item.type === "video") {
    return (
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className="vibes-gallery-item vibe-video"
        aria-label={`${item.source} — ${item.title}`}
      >
        <span className="vibe-video-thumb">
          <Image
            src={`https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            sizes="(max-width: 640px) 50vw, 33vw"
            style={{ width: "100%", height: "auto" }}
          />
          <span className="vibe-video-play" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </span>
        <span className="vibe-video-meta">
          <span className="vibe-video-title">{item.title}</span>
          <span className="vibe-video-source">{item.source}</span>
        </span>
      </a>
    );
  }

  return (
    <div className="vibes-gallery-item">
      <Image
        src={item.src}
        alt={item.alt ?? ""}
        width={400}
        height={400}
        quality={85}
        sizes="(max-width: 640px) 50vw, 33vw"
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
