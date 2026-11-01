// Posts kept off the site. Matched by the slug after /p/ in the post URL,
// or by title (lowercased, punctuation stripped) for posts without a known slug.
const HIDDEN_SLUGS = new Set([
  "a-journey-through-the-american-west",
  "a-proposal-for-automated-science",
  "do-you-take-pride-in-your-hurt-does",
  "on-blockchain-poetry-and-labor",
  "hi-would-you-like-to-help-the-world",
  "magpie-days",
  "commitment-issues",
]);
const HIDDEN_TITLES = new Set(["magpie days", "commitment issues"]);

const normalizeTitle = (t: string) =>
  t
    .toLowerCase()
    .replace(/&amp;|&#\d+;|&\w+;/g, " ")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const slugOf = (link: string) => {
  try {
    const m = new URL(link).pathname.match(/^\/p\/([^/]+)/);
    return m ? m[1] : "";
  } catch {
    return "";
  }
};

export const isHidden = (item: { title: string; link: string }) =>
  HIDDEN_SLUGS.has(slugOf(item.link)) ||
  HIDDEN_TITLES.has(normalizeTitle(item.title));
