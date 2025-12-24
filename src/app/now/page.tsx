export default function Now() {
  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-6 accent-font">Now</h1>

      <p className="mb-4 text-base leading-relaxed">
        Currently in China, spending the holidays with family. Moving to
        Berkeley soon, where I&apos;ll be attending{" "}
        <a
          className="hyperlink"
          href="https://www.matsprogram.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS 9.0
        </a>{" "}
        and working out of{" "}
        <a
          className="hyperlink"
          href="https://www.lighthaven.space/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lighthaven
        </a>
        .
      </p>

      <h2 className="text-lg font-medium mt-10 mb-4 accent-font">
        Current goals
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-base leading-relaxed">
        <li>Finishing up LLM honesty and Gray Swan projects</li>
        <li>Writing one blog post / day</li>
      </ul>

      <div className="mt-8 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Last updated Dec 24, 2025.{" "}
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
