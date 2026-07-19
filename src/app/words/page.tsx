import fs from "fs";
import path from "path";

interface Quote {
  paragraphs: string[];
  attribution: string | null;
}

// Blocks are separated by lines containing only `---`; trailing lines
// starting with `—` are the attribution.
function parseBlock(block: string): Quote | null {
  const lines = block.trim().split(/\r?\n/);
  const attributionLines: string[] = [];
  while (lines.length > 0 && lines[lines.length - 1].trim().startsWith("—")) {
    attributionLines.unshift(lines.pop()!.trim().replace(/^—\s*/, ""));
  }
  const paragraphs = lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  if (paragraphs.length === 0) return null;
  return {
    paragraphs,
    attribution: attributionLines.length > 0 ? attributionLines.join(", ") : null,
  };
}

function loadQuotes(): Quote[] {
  const file = fs.readFileSync(
    path.join(process.cwd(), "content", "quotes.md"),
    "utf8"
  );
  const blocks = file.split(/\r?\n---+\s*(?:\r?\n|$)/).slice(1);
  return blocks
    .map(parseBlock)
    .filter((q): q is Quote => q !== null)
    .reverse(); // newest (bottom of file) first
}

export default function Words() {
  const quotes = loadQuotes();
  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-6 accent-font">Words</h1>
      <p className="mb-10 leading-relaxed">
        Passages I&apos;ve come across and want to keep.
      </p>
      <div className="space-y-10">
        {quotes.map((quote, i) => (
          <figure key={i} className="border-l-2 border-gray-300 pl-5">
            {quote.paragraphs.map((paragraph, j) => (
              <p key={j} className="mb-3 leading-relaxed">
                {paragraph}
              </p>
            ))}
            {quote.attribution && (
              <figcaption className="text-sm text-gray-600 italic">
                — {quote.attribution}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </div>
  );
}
