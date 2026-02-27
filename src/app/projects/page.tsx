import Image from "next/image";

export default function Projects() {
  return (
    <div className="py-12 sm:py-16">
      <h2 className="text-xl font-medium mb-6 accent-font">Research</h2>
      {/* <p>
        I&apos;m interested in AI alignment, analytical chemistry, and US-CN
        policy!{" "}
      </p> */}
      <ul className="pl-4">
        <li className="mb-2">
          <a
            href="https://arxiv.org/abs/2509.01938"
            className="text-custom-green"
          >
            EigenBench: A Comparative Behavioral Measure of Value Alignment
          </a>
          <p className="italic">
            ICLR 2026 Oral. Chang, J., Piff, L., Sana, S., Li, J.X., Levine, L.
          </p>
        </li>
        <li className="mb-2">
          <a
            href="https://arxiv.org/pdf/2406.20087"
            className="text-custom-green"
          >
            ProgressGym: Alignment with a Millennium of Moral Progress
          </a>
          <p className="italic">
            NeurIPS 2024. Qiu, T., Zhang, Y., Huang, Z., Li, J.X., et al.{" "}
          </p>
        </li>
        <li className="mb-2">
          <a
            href="https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view"
            className="text-custom-green"
          >
            Scaling laws for contrastive activation addition with refusal
            mechanisms and Llama 2 models
          </a>
          <p className="italic">
            ICML 2025 NewInML Workshop. Berkeley Supervised Program for
            Alignment Research, Mentor: Abdur Raheem Ali
          </p>
        </li>
        <li className="mb-2">
          <a
            href="https://www.nature.com/articles/s41467-023-39574-3"
            className="text-custom-green"
          >
            Machining water through laser cutting of nanoparticle-encased water
            pancakes
          </a>
          <p className="italic">June 2023, Nature Communications</p>
        </li>

        <li className="mb-2">
          <a
            href="https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883"
            className="text-custom-green"
          >
            A three-dimensional paper-based isoelectric focusing device for
            direct analysis of proteins in physiological samples
          </a>
          <p className="italic">Feb. 2021, Analytical Chemistry</p>
        </li>
      </ul>

      {/* New Code Section */}
      <h2 className="text-xl font-medium mt-12 border-t border-gray-200 pt-8 mb-6 accent-font">
        Code
      </h2>
      {/* <p>to come :D</p> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4">
          <Image
            src="/assets/ritu.png"
            alt="Ritu"
            width={500}
            height={300}
            className="w-full h-auto"
          />
          <a
            href="https://www.figma.com/design/xK9GDMaTPGRWGEn7wM7sxi/Ritu-Hackathon-Pitch-Deck?node-id=0-1"
            className="text-custom-green"
          >
            Ritu
          </a>
          <p className="italic">
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
            className="w-full h-auto"
          />
          <a
            href="https://www.figma.com/design/adCoXHePOw4PVcsFkgJch3/LII-Hackathon?t=zVF9CFd6cRZLcrIe-0"
            className="text-custom-green"
          >
            ALIGN
          </a>
          <p className="italic">
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
            className="w-full h-auto"
          />
          <a
            href="https://devpost.com/software/circles-8cfnod#updates"
            className="text-custom-green"
          >
            Circles
          </a>
          <p className="italic">
            Frictionless friend meetups. Big Red Hacks 2024
          </p>
        </div>
      </div>

      {/* Chaos Section */}
      <h2 className="text-xl font-medium mt-12 border-t border-gray-200 pt-8 mb-2 accent-font">
        Chaos
      </h2>
      <p className="mb-6 italic">oh to organize silly little events with friends!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="border p-4">
          <a
            href="https://proxima.ink/"
            className="text-custom-green"
          >
            Proxima
          </a>
          <p className="italic">
            a community space for creative friends on the internet
          </p>
        </div>
        <div className="border p-4">
          <a
            href="https://idealistscollective.org/unconference"
            className="text-custom-green"
          >
            Idealists Collective Unconference
          </a>
          <p className="italic">
            April 2026
          </p>
        </div>
        <div className="border p-4">
          <a
            href="https://html-energy-seattle-2025.aninternet.farm/"
            className="text-custom-green"
          >
            HTML Day 2025, Seattle
          </a>
          <p className="italic">
            an HTML freewrite embracing HTML energy, the slow web, and community
          </p>
        </div>
        <div className="border p-4">
          <a
            href="https://x.com/jasminexli/status/1944220797196730552"
            className="text-custom-green"
          >
            Saturday 8am Walk &amp; Yaps
          </a>
          <p className="italic">
            weekly saturday morning walks in seattle
          </p>
        </div>
        <div className="border p-4">
          <a
            href="https://x.com/jasminexli/status/1897138031410471028"
            className="text-custom-green"
          >
            Pen &amp; Ponder
          </a>
          <p className="italic">
            a 1 month writing experiment &amp; toronto writeathon!
          </p>
        </div>
      </div>
    </div>
  );
}
