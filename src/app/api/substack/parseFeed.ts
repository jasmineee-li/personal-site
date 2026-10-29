export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

const tag = (xml: string, name: string): string => {
  const match = xml.match(
    new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"),
  );
  if (!match) return "";
  return match[1]
    .replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1")
    .trim();
};

/** Pull title, link, and pubDate out of each <item> in an RSS 2.0 feed. */
export function parseFeed(xml: string): FeedItem[] {
  const items: FeedItem[] = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    const body = m[1];
    const title = tag(body, "title");
    const link = tag(body, "link");
    const pubDate = tag(body, "pubDate");
    if (title && link) items.push({ title, link, pubDate });
  }
  return items;
}
