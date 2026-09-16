import Link from "next/link";

const archive = [
  { date: "Jun 9, 2026", href: "/now/2026-06-09" },
  { date: "Feb 26, 2026", href: "/now/2026-02-26" },
];

export default function Now() {
  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-6 accent-font">Now</h1>

      <p className="mb-4 leading-relaxed">
        Back in the US! Working on projects in Track-2 diplomacy, auditing
        ecosystem buildout, and technical verification fieldbuilding.
      </p>

      <p className="mb-4 leading-relaxed">
        I&apos;ve been very, very grateful for my wonderful friends, lovely
        weather, and Hint water. Goals for the rest of the year are{" "}
        <a
          className="hyperlink"
          href="https://jasminexli.substack.com/p/2026-h2-personal-goals"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>

      <div className="mt-10 pt-6 border-t border-gray-300">
        <h2 className="text-lg font-medium mb-4 accent-font">Archive</h2>
        <ul className="space-y-2 leading-relaxed">
          {archive.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href} className="hyperlink">
                {entry.date}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Last updated Sep 16, 2026.{" "}
          <a
            href="https://nownownow.com/about"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            What is a &quot;now&quot; page?
          </a>
        </p>
      </div>
    </div>
  );
}
