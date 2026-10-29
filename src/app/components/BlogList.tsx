"use client";
import { useEffect, useState } from "react";
import "./BlogList.css";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
}

const FEED_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
  "https://jasminexli.substack.com/feed",
)}`;

const formatDate = (iso: string) => {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "";
  }
};

const decodeHtmlEntities = (str: string): string => {
  if (!str) return "";
  const textarea = document.createElement("textarea");
  textarea.innerHTML = str;
  return textarea.value;
};

/**
 * Title ... date rows for Substack posts, fetched client-side.
 * Omit `limit` to show every post the feed returns.
 */
export default function BlogList({ limit }: { limit?: number }) {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSubstackFeed = async () => {
      try {
        const response = await fetch(FEED_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error(data.message || "Failed to parse feed");
        }
        setPosts(limit ? data.items.slice(0, limit) : data.items);
      } catch (err) {
        console.error("Substack feed error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSubstackFeed();
  }, [limit]);

  if (loading) {
    return <p className="text-sm text-gray-500 py-4">Loading posts...</p>;
  }
  if (error) {
    return (
      <p className="text-sm text-gray-500 py-4">
        Could not load posts. Please try again later.
      </p>
    );
  }
  if (posts.length === 0) {
    return <p className="text-sm text-gray-500 py-4">No posts available.</p>;
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.link}>
          <a
            href={post.link}
            className="writing-row group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="writing-title">
              {decodeHtmlEntities(post.title) || "Untitled"}
            </span>
            <span className="writing-leader" aria-hidden="true" />
            <span className="writing-date">{formatDate(post.pubDate)}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
