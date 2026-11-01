export interface Paper {
  title: string;
  href: string;
  /** Author list in order. Prefix your own name with "*" to emphasise it. */
  authors: string[];
  venue?: string;
  links: { label: string; href: string }[];
}

export const papers: Paper[] = [
  {
    title: "AI Epistemic Risks: Emerging Mechanisms & Evidence",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6873005",
    authors: [
      "Casper, S.", "Stray, J.", "Gausen, A.", "Jones, C.", "Christian, B.",
      "*Li, J.", "Bengio, Y.", "Rand, D.", "et al.",
    ],
    venue: "SSRN, 2026",
    links: [
      { label: "SSRN", href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6873005" },
    ],
  },
  {
    title:
      "WARP: Measuring and Mitigating Evaluation Awareness in Browser-Agent Safety Benchmarks",
    href: "https://openreview.net/forum?id=8fk9XYWtSQ",
    authors: ["*Li, J.X.", "Chew, A.", "Lin, M.", "Jones, E.K.", "Fu, X.", "Zou, A."],
    venue: "AIWILD, ICML, 2026",
    links: [
      { label: "OpenReview", href: "https://openreview.net/forum?id=8fk9XYWtSQ" },
      { label: "GitHub", href: "https://github.com/jasmineee-li/warp" },
    ],
  },
  {
    title: "Eval Cooperativeness May Be a Scalable Mitigation for Eval Gaming",
    href: "https://turntrout.com/eval-cooperation",
    authors: ["*Li, J.", "Turner, A.M."],
    links: [
      { label: "blogpost", href: "https://turntrout.com/eval-cooperation" },
      { label: "GitHub", href: "https://github.com/jasmineee-li/eval-awareness/" },
    ],
  },
  {
    title: "EigenBench: A Comparative Behavioral Measure of Value Alignment",
    href: "https://arxiv.org/abs/2509.01938",
    authors: ["Chang, J.", "Piff, L.", "Sana, S.", "*Li, J.X.", "Levine, L."],
    venue: "ICLR Oral (Top 5%), 2026",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2509.01938" }],
  },
  {
    title: "ProgressGym: Alignment with a Millennium of Moral Progress",
    href: "https://arxiv.org/pdf/2406.20087",
    authors: ["Qiu, T.", "Zhang, Y.", "Huang, Z.", "*Li, J.X.", "et al."],
    venue: "NeurIPS Spotlight (Top 10%), 2024",
    links: [{ label: "arXiv", href: "https://arxiv.org/abs/2406.20087" }],
  },
  {
    title:
      "Scaling laws for contrastive activation addition with refusal mechanisms and Llama 2 models",
    href: "https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view",
    authors: ["Ali, S.A.R.", "Xu, J.", "Yang, I.", "*Li, J.X.", "Arslan, A.", "Benham, C."],
    venue: "NewInML, ICML, 2025",
    links: [
      { label: "arXiv", href: "https://arxiv.org/abs/2507.11771" },
      {
        label: "paper",
        href: "https://drive.google.com/file/d/1-uK8lsKApXFikfCdQIixFNwu0uWL1gSJ/view",
      },
    ],
  },
  {
    title: "Machining water through laser cutting of nanoparticle-encased water pancakes",
    href: "https://www.nature.com/articles/s41467-023-39574-3",
    authors: [
      "Niu, J.", "Liu, W.", "*Li, J.X.", "Pang, X.", "Liu, Y.", "Zhang, C.",
      "Yue, K.", "Zhou, Y.", "Xu, F.", "Li, X.", "Li, F.",
    ],
    venue: "Nature Communications, 2023",
    links: [{ label: "paper", href: "https://www.nature.com/articles/s41467-023-39574-3" }],
  },
  {
    title:
      "A three-dimensional paper-based isoelectric focusing device for direct analysis of proteins in physiological samples",
    href: "https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883",
    authors: ["Jiang, X.", "Li, F.", "Niu, J.", "Bao, Z.", "Wei, Z.", "*Li, J.X."],
    venue: "Analytical Chemistry, 2021",
    links: [
      { label: "paper", href: "https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883" },
    ],
  },
];
