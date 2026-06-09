import Link from "next/link";

const archive = [{ date: "Feb 26, 2026", href: "/now/2026-02-26" }];

export default function Now() {
  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-6 accent-font">Now</h1>

      <p className="mb-4 text-base leading-relaxed">
        I moved to London! Back in the homeland and excited to explore this
        lovely city, though I miss the Bay Area a bunch.
      </p>

      <p className="mb-4 text-base leading-relaxed">
        I&apos;m currently at{" "}
        <a
          className="hyperlink"
          href="https://www.safer-ai.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SaferAI
        </a>{" "}
        as a Research Scientist, where I&apos;m helping engage Chinese labs in
        AI safety. Thinking most about: AI verification, US-China engagement, &amp;
        philanthropic capital deployment/grantmaking.
      </p>

      <p className="mb-4 text-base leading-relaxed">
        Text me if you want to do some fun backpacking/biking trip in UK/Europe
        this summer — I&apos;m itching to be outside!! I&apos;ll probably also
        visit Ox and Cam soon, for all the friends there.
      </p>

      <div className="mt-10 pt-6 border-t border-gray-300">
        <h2 className="text-lg font-medium mb-4 accent-font">Archive</h2>
        <ul className="space-y-2 text-base leading-relaxed">
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
          Last updated Jun 9, 2026.{" "}
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
