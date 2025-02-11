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
        by strong communities, cool ideas, and doing good things in the world!
        To this end, I&apos;m interested in AI safety, literature, software for
        good, and community-building.
      </p>
      <br />
      <p>
        Currently, I do AI alignment research under{" "}
        <a
          className="hyperlink"
          href="https://pi.math.cornell.edu/~levine/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Prof. Lionel Levine
        </a>{" "}
        at Cornell, as well as a variety of independent alignment projects (most
        recently{" "}
        <a
          className="hyperlink"
          href="https://arxiv.org/pdf/2406.20087"
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>{" "}
        and{" "}
        <a
          className="hyperlink"
          href="https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          this
        </a>
        ). I also founded{" "}
        <a
          className="hyperlink"
          href="https://cornell-aia.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cornell AI Alignment
        </a>{" "}
        and lead development of a fintech product on{" "}
        <a
          className="hyperlink"
          href="https://www.cornelldti.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cornell Digital Tech & Innovation
        </a>
        . In addition, I love to write, and I sometimes publish on my{" "}
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
        This summer I'll be at Meta, and previously I worked in software
        engineering at{" "}
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
        On the personal side: I grew up on 3 different continents, live in the
        <a
          className="hyperlink"
          href="https://telluridehouse.org/main/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telluride House
        </a>{" "}
        as a scholar, and am an avid backpacker and proud vegetarian. I also
        love hosting my friends, journaling, and watching sunsets!
      </p>
    </div>
  );
}
