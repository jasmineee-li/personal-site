import Link from "next/link";

export default function NowArchive20260609() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mb-6">
        <Link href="/now" className="hyperlink text-sm">
          ← Back to current /now
        </Link>
      </div>
      <h1 className="text-xl font-medium mb-2 accent-font">Now (archived)</h1>
      <p className="text-sm text-gray-600 mb-6">Jun 9, 2026</p>

      <p className="mb-4 leading-relaxed">
        I moved to London! Back in the homeland and excited to explore this
        lovely city, though I miss the Bay Area a bunch.
      </p>

      <p className="mb-4 leading-relaxed">
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

      <p className="mb-4 leading-relaxed">
        Text me if you want to do some fun backpacking/biking trip in UK/Europe
        this summer — I&apos;m itching to be outside!! I&apos;ll probably also
        visit Ox and Cam soon, for all the friends there.
      </p>

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
