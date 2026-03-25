import fs from "fs";
import path from "path";
import Image from "next/image";
import "./vibes.css";

const VIBES_DIR = path.join(process.cwd(), "public", "vibes");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);

function getVibesImages(): string[] {
  try {
    const files = fs.readdirSync(VIBES_DIR);
    return files
      .filter((f) => IMAGE_EXTENSIONS.has(path.extname(f).toLowerCase()))
      .sort((a, b) => {
        // Sort by modified time, newest first
        const aStat = fs.statSync(path.join(VIBES_DIR, a));
        const bStat = fs.statSync(path.join(VIBES_DIR, b));
        return bStat.mtimeMs - aStat.mtimeMs;
      });
  } catch {
    return [];
  }
}

export const dynamic = "force-dynamic";

export default function Vibes() {
  const images = getVibesImages();

  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-8 accent-font">Vibes</h1>

      {images.length === 0 ? (
        <p className="vibes-empty">No vibes yet...</p>
      ) : (
        <div className="vibes-gallery">
          {images.map((filename) => (
            <div key={filename} className="vibes-gallery-item">
              <Image
                src={`/vibes/${filename}`}
                alt=""
                width={400}
                height={400}
                quality={85}
                sizes="(max-width: 640px) 50vw, 33vw"
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
