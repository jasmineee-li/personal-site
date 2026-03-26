import Image from "next/image";

export default function Projects() {
  return (
    <div className="py-12 sm:py-16">
      <h2 className="text-xl font-bold mb-4 accent-font">Research Overview</h2>

      <div className="mb-10 space-y-4 text-body-sm">
        <p>My research broadly spans three areas:</p>
        <ol className="list-decimal pl-6 space-y-3">
          <li>
            <span className="font-semibold">Oversight and control.</span> What
            oversight measures robustly scale to increasingly capable frontier
            language models? I currently focus on training-time mitigations for
            evaluation awareness and model introspection — understanding how and
            when models represent the distinction between evaluation and
            deployment, and how to intervene on this.
          </li>
          <li>
            <span className="font-semibold">Value alignment and epistemics.</span>{" "}
            How can we train models to be more honest? How can AI uplift human
            truth-seeking and moral progress, and how do we prevent harmful value
            lock-in?
          </li>
          <li>
            <span className="font-semibold">Agent security.</span> How do we
            design scalable, realistic environments for evaluating agent misuse
            and misbehavior — for example, in computer use and MCP settings?
          </li>
        </ol>
        <p>
          As of March 2026, the research directions that excite me most are:
          understanding model introspection and situational awareness, exploring
          metacognition-based alignment techniques, alignment pretraining, and
          operationalizing AI-induced human disempowerment.
        </p>
        <p>
          I want to be the most excellent researcher I can be. I enjoy rapid
          experimentation and careful truth-seeking. Above all else, I care about
          real-world impact and choosing the right, most pressing problems to
          work on.
        </p>
        <p>
          In a past life, I researched analytical chemistry and published in{" "}
          <span className="italic">Nature Communications</span> and ACS
          journals.
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4 border-t border-gray-200 pt-8 accent-font">Papers</h2>
      <div className="divide-y divide-gray-200">
        <div className="pb-6">
          <a
            href="https://arxiv.org/abs/2509.01938"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            EigenBench: A Comparative Behavioral Measure of Value Alignment
          </a>
          <p className="italic text-sub mt-1">
            Chang, J., Piff, L., Sana, S.,{" "}
            <span className="font-semibold not-italic">Li, J.X.</span>, Levine,
            L.
          </p>
          <p className="text-sub mt-1">ICLR Oral (Top 5%), 2026</p>
          <p className="text-sub mt-1">
            [
            <a
              href="https://arxiv.org/abs/2509.01938"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              arXiv
            </a>
            ]
          </p>
        </div>

        <div className="py-6">
          <a
            href="https://arxiv.org/pdf/2406.20087"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            ProgressGym: Alignment with a Millennium of Moral Progress
          </a>
          <p className="italic text-sub mt-1">
            Qiu, T., Zhang, Y., Huang, Z.,{" "}
            <span className="font-semibold not-italic">Li, J.X.</span>, et al.
          </p>
          <p className="text-sub mt-1">NeurIPS Spotlight (Top 10%), 2024</p>
          <p className="text-sub mt-1">
            [
            <a
              href="https://arxiv.org/abs/2406.20087"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              arXiv
            </a>
            ]
          </p>
        </div>

        <div className="py-6">
          <a
            href="https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scaling laws for contrastive activation addition with refusal
            mechanisms and Llama 2 models
          </a>
          <p className="italic text-sub mt-1">Mentored by Abdur Raheem Ali</p>
          <p className="text-sub mt-1">ICML Workshop, 2025</p>
          <p className="text-sub mt-1">
            [
            <a
              href="https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              paper
            </a>
            ]
          </p>
        </div>

        <div className="py-6">
          <a
            href="https://www.nature.com/articles/s41467-023-39574-3"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Machining water through laser cutting of nanoparticle-encased water
            pancakes
          </a>
          <p className="text-sub mt-1">Nature Communications, 2023</p>
          <p className="text-sub mt-1">
            [
            <a
              href="https://www.nature.com/articles/s41467-023-39574-3"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              paper
            </a>
            ]
          </p>
        </div>

        <div className="pt-6">
          <a
            href="https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            A three-dimensional paper-based isoelectric focusing device for
            direct analysis of proteins in physiological samples
          </a>
          <p className="text-sub mt-1">Analytical Chemistry, 2021</p>
          <p className="text-sub mt-1">
            [
            <a
              href="https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              paper
            </a>
            ]
          </p>
        </div>
      </div>

      {/* Organizing Section */}
      <h2 className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font">
        Organizing
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <a
            href="https://proxima.ink/"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Proxima
          </a>
          <p className="italic">
            An anthology of speculative fiction and art, imagining
            post-intelligence explosion futures.
          </p>
        </li>
        <li>
          <a
            href="https://idealistscollective.org/unconference"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Idealists Collective Unconference
          </a>
          <p className="italic">April 2026</p>
        </li>
        <li>
          <a
            href="https://html-energy-seattle-2025.aninternet.farm/"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTML Day 2025, Seattle
          </a>
          <p className="italic">
            an HTML freewrite embracing HTML energy, the slow web, and community
          </p>
        </li>
        <li>
          <a
            href="https://x.com/jasminexli/status/1944220797196730552"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Saturday 8am Walk &amp; Yaps
          </a>
          <p className="italic">weekly saturday morning walks in seattle</p>
        </li>
        <li>
          <a
            href="https://x.com/jasminexli/status/1897138031410471028"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pen &amp; Ponder
          </a>
          <p className="italic">
            a 1 month writing experiment &amp; toronto writeathon!
          </p>
        </li>
      </ul>

      {/* Code Section */}
      <h2 className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font">
        Code
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4">
          <Image
            src="/assets/ritu.png"
            alt="Ritu"
            width={500}
            height={300}
            className="w-full h-auto mb-2"
          />
          <a
            href="https://www.figma.com/design/xK9GDMaTPGRWGEn7wM7sxi/Ritu-Hackathon-Pitch-Deck?node-id=0-1"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ritu
          </a>
          <p className="text-sm text-gray-500 mt-1">
            Smart pest and weather prediction for farmers. Grand Prize, Cornell
            Switch the Pitch Hackathon
          </p>
        </div>
        <div className="border p-4">
          <Image
            src="/assets/ALIGN.png"
            alt="ALIGN"
            width={500}
            height={300}
            className="w-full h-auto mb-2"
          />
          <a
            href="https://www.figma.com/design/adCoXHePOw4PVcsFkgJch3/LII-Hackathon?t=zVF9CFd6cRZLcrIe-0"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            ALIGN
          </a>
          <p className="text-sm text-gray-500 mt-1">
            Designed optimized database and search for Wex, Cornell Legal
            Information Institute&apos;s dictionary. First Prize, LII Hackathon
          </p>
        </div>
        <div className="border p-4">
          <Image
            src="/assets/circles.jpg"
            alt="Circles"
            width={500}
            height={300}
            className="w-full h-auto mb-2"
          />
          <a
            href="https://devpost.com/software/circles-8cfnod#updates"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Circles
          </a>
          <p className="text-sm text-gray-500 mt-1">
            Frictionless friend meetups. Big Red Hacks 2024
          </p>
        </div>
      </div>
    </div>
  );
}
