import "./page.css";

export default function Home() {
  return (
    <div className="py-8">
      <p className="mb-4">Hello!</p>
      <p>
        I&apos;m Jasmine, a{" "}
        <a
          className="hyperlink"
          href="https://milstein-program.as.cornell.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Milstein Scholar
        </a>{" "}
        at Cornell studying computer science and philosophy. I&apos;m fired up
        by strong communities, cool ideas, and doing good things in the world.
        To this end, I&apos;m interested in AI safety and ethics, literature, software
        for good, and community-building.
      </p>
      <br />
      <p>
        Currently, I do AI alignment research (most recently {" "}
        <a
          className="hyperlink"
          href="https://arxiv.org/pdf/2406.20087"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        ) and lead development of a fintech product on {" "}
        <a
          className="hyperlink"
          href="https://www.cornelldti.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cornell Digital Tech & Innovation
        </a>. I'm also beginning Cornell AI alignment! In addition, I love to write,
        and I sometimes publish on my{" "}
        <a
          className="hyperlink"
          href="https://jasminexli.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Substack
        </a>
        .
      </p>
      <br />
      <p>
        Previously, I worked in software engineering and data at Meta and {" "}
        <a
          className="hyperlink"
          href="https://ellis.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ellis
        </a>
        . In my past life, I{" "}
        <a
          className="hyperlink"
          href="https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en&authuser=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          researched analytical chemistry
        </a>{" "}
        and science ethics education.
      </p>
      <br />
      <p>
        On the personal side: I grew up in 3 different continents, live in the Telluride House, and am
        an avid backpacker and proud vegetarian. I also love hosting my friends, journaling, and watching sunsets!
      </p>
    </div>
  );
}
