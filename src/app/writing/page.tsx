"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import "./style.css";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
}

export default function Writing() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubstackFeed = async () => {
      try {
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          "https://jasminexli.substack.com/feed"
        )}`;

        const response = await fetch(rssUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        if (data.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error(data.message || "Failed to parse feed");
        }

        setPosts(data.items.slice(0, 6)); // Show up to 6 posts
        setLoading(false);
      } catch (err) {
        console.error("Substack feed error:", err);
        setError("Could not load posts. Please try again later.");
        setLoading(false);
      }
    };

    fetchSubstackFeed();
  }, []);

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

  const extractFirstImg = (html: string): string | null => {
    if (!html) return null;
    const match = html.match(/<img[^>]+src="([^"]+)"/i);
    return match ? match[1] : null;
  };

  const truncate = (str: string, max = 160) =>
    str && str.length > max ? `${str.slice(0, max)}…` : str || "";

  return (
    <div className="py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Writing</h1>
      <p className="mb-4 sm:mb-6">
        I publish essays at{" "}
        <a
          className="hyperlink"
          href="https://jasminexli.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          jasminexli.substack.com
        </a>
        !
      </p>

      <div ref={containerRef} className="substack-feed-container">
        {loading && <div className="substack-skeleton">Loading posts...</div>}

        {error && <p className="substack-error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="substack-empty">No posts available.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="substack-grid">
            {posts.map((post, idx) => {
              const imgUrl = extractFirstImg(post.content);
              return (
                <a
                  key={idx}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="substack-card"
                >
                  <div className="substack-post">
                    {imgUrl && (
                      <Image
                        src={imgUrl}
                        alt={post.title || "Substack post image"}
                        className="substack-thumbnail"
                        width={240}
                        height={180}
                        loading="lazy"
                      />
                    )}
                    <div className="substack-body">
                      <h3 className="substack-title">
                        {post.title || "Untitled"}
                      </h3>
                      {post.pubDate && (
                        <p className="substack-date">
                          {formatDate(post.pubDate)}
                        </p>
                      )}
                      <p className="substack-desc">
                        {truncate(post.description, 160)}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Other Writing</h2>
        <ul className="py-4">
          <li className="mb-2">
            <a
              href="https://docs.google.com/document/d/1p1BU_7JEn5M6hRSnRA9W_WbzVTuEC7bu/edit?usp=drive_link&ouid=113458154265672469537&rtpof=true&sd=true"
              className="text-custom-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              Space Odyssey Made Real? Interrogating the Moral Bounds of the
              AI-Human Friendship through Aristotelian and Confucian Frameworks
            </a>
            <p className="italic">
              Dec 17, 2023 | Cornell James E. Rice, Jr., Prize
            </p>
          </li>
          <li className="mb-2">
            <a
              href="https://cornellsun.com/2024/09/10/old-remedies-new-perspectives-finding-healing-in-chinese-medicine/"
              className="text-custom-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              Finding healing in Chinese medicine
            </a>
            <p className="italic">Sep 10, 2024 | Cornell Daily Sun</p>
          </li>
          <li className="mb-2">
            <a
              href="https://docs.google.com/document/d/1FZY9LtMMEu3LzgRd2g2E-NwNGsciOwK8/edit?usp=drive_link&ouid=113458154265672469537&rtpof=true&sd=true"
              className="text-custom-green"
              target="_blank"
              rel="noopener noreferrer"
            >
              A Cautionary Tale: Internally Conflicting Panoptic Values and
              Self-Destruction in Black Swan
            </a>
            <p className="italic">Sep 10, 2024 | Stanford De Novo</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
