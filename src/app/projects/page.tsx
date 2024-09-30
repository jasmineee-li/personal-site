export default function Projects() {
  return (
    <div className="py-8">
      {/* <h1 className="text-3xl font-bold mb-4">My Projects</h1> */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Research</h2>
      <p>
        I&apos;m interested in AI alignment, analytical chemistry, and US-CN
        policy!{" "}
      </p>
      <ul className="pl-4">
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
            SP24 Berkeley Supervised Program for Alignment Research, Mentor:
            Abdur Raheem Ali
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
        <li className="mb-2">
          <a
            href="https://docs.google.com/document/d/10l-bHw6ldT6bkbe16vVth880QCvIHAemPjJxxxlihl4/edit?usp=sharing"
            className="text-custom-green"
          >
            Proposal for cheaply evaluating dangerous biochemical experimental
            capabilities in frontier large-language models
          </a>
          <p className="italic">Dec 5, 2023. Personal Research.</p>
        </li>
        <li className="mb-2">
          <a href="" className="text-custom-green">
            China&apos;s International Student Recruitment Strategy as a Failed
            Exercise of Soft Power
          </a>
          <p className="italic">
            Jan 6, 2022. Stanford Freeman Spogli Institute for International
            Studies.
          </p>
        </li>
      </ul>

      {/* New Code Section */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Code</h2>
      <p>to come :D</p>
      {/* <div className="grid grid-cols-3 gap-4">
        <div className="border p-4">
          <img
            src="path/to/image1.jpg"
            alt="Project 1"
            className="w-full h-auto"
          />
          <a href="https://link-to-project1.com" className="text-custom-green">
            Ritu
          </a>
          <p className="italic">Metadata for Project 1</p>
        </div>
        <div className="border p-4">
          <img
            src="path/to/image2.jpg"
            alt="Project 2"
            className="w-full h-auto"
          />
          <a href="https://link-to-project2.com" className="text-custom-green">
            Project Title 2
          </a>
          <p className="italic">Metadata for Project 2</p>
        </div>
        <div className="border p-4">
          <img
            src="path/to/image3.jpg"
            alt="Project 3"
            className="w-full h-auto"
          />
          <a href="https://link-to-project3.com" className="text-custom-green">
            Project Title 3
          </a>
          <p className="italic">Metadata for Project 3</p>
        </div>
      </div> */}
    </div>
  );
}
