import { NextResponse } from "next/server";
import { parseFeed } from "./parseFeed";

// Proxies the Substack RSS feed so the browser never calls a third party.
// rss2json (previously used) now sits behind a Cloudflare challenge that
// blocks cross-origin requests.

const FEED_URL = "https://jasminexli.substack.com/feed";

// Always served from the function (never prerendered at build time); the
// upstream fetch is cached for an hour and the CDN caches the response.
export const dynamic = "force-dynamic";
const REVALIDATE_SECONDS = 3600;

export async function GET() {
  try {
    const res = await fetch(FEED_URL, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; jasminexli.com feed reader)",
        accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Upstream HTTP ${res.status}` },
        { status: 502 },
      );
    }
    const items = parseFeed(await res.text());
    return NextResponse.json(
      { items },
      { headers: { "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (err) {
    console.error("Substack feed error:", err);
    return NextResponse.json({ error: "Failed to fetch feed" }, { status: 502 });
  }
}
