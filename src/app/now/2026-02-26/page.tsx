import Link from "next/link";

export default function NowArchive20260226() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mb-6">
        <Link href="/now" className="hyperlink text-sm">
          ← Back to current /now
        </Link>
      </div>
      <h1 className="text-xl font-medium mb-2 accent-font">Now (archived)</h1>
      <p className="text-sm text-gray-600 mb-6">Feb 26, 2026</p>

      <p className="mb-4 text-base leading-relaxed">
        I&apos;m currently a{" "}
        <a
          className="hyperlink"
          href="https://www.matsprogram.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          MATS 9.0
        </a>{" "}
        fellow, based in sunny Berkeley! I&apos;m working on the science of
        evaluations with Alex Turner. In particular, I want to figure out how we
        can make safety and scheming propensity evals still faithfully predict
        behaviors of interest as models become increasingly evaluation-aware. It
        would be a real shame if pre-deployment evals stopped working, and I
        want to prevent that.
      </p>

      <p className="mb-4 text-base leading-relaxed">
        I&apos;m also co-organizing{" "}
        <a
          className="hyperlink"
          href="https://proxima.ink/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Proxima
        </a>{" "}
        for winter 2026 AI safety fellows in the Berkeley community with my
        friend{" "}
        <a
          className="hyperlink"
          href="https://parvmahajan.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Parv
        </a>
        , and the{" "}
        <a
          className="hyperlink"
          href="http://idealistscollective.org/unconference"
          target="_blank"
          rel="noopener noreferrer"
        >
          Idealists Unconference
        </a>{" "}
        in the UK this April for the wonderful Idealists Collective.
      </p>

      <p className="mb-4 text-base leading-relaxed">
        I&apos;ve also been thinking a lot lately about gradual disempowerment
        and civilizational resilience.
      </p>

      <h2 className="text-lg font-medium mt-10 mb-4 accent-font">
        Current goals
      </h2>
      <ul className="list-disc pl-6 space-y-2 mb-6 text-base leading-relaxed">
        <li>
          Finishing up Gray Swan research developing better web agent evaluation
          infrastructure
        </li>
        <li>
          Learning salsa! Reach out if you want to go to weekly Friday salsa
          classes in SF together
        </li>
      </ul>

      <div className="mt-8 pt-6 border-t border-gray-300">
        <p className="text-sm text-gray-600">
          Last updated Feb 26, 2026.{" "}
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
