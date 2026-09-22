"use client";
import "./page.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
}

const footnotes = [
  {
    id: "persimmons",
    type: "text",
    caption: "good luck (柿柿如意); my grandfather's favorite fruit. ",
  },
  {
    id: "climbing",
    type: "image",
    image: "/assets/climb.png",
    caption: "i climbed this!",
  },
  {
    id: "camping",
    type: "image",
    image: "/assets/IMG_6149.JPG",
    caption: "Hiking in the Adirondacks, summer 2024",
  },
  {
    id: "people",
    type: "image",
    image: "/assets/IMG_5634.jpg",
    caption: "seattle 2026!",
  },
];

interface PersimmonPosition {
  id: number;
  x: number;
  y: number;
}

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeFootnote, setActiveFootnote] = useState<string | null>(null);
  const [recentPosts, setRecentPosts] = useState<SubstackPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [showPersimmons, setShowPersimmons] = useState(false);
  const [persimmonPositions, setPersimmonPositions] = useState<
    PersimmonPosition[]
  >([]);

  useEffect(() => {
    const fetchSubstackFeed = async () => {
      try {
        const rssUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
          "https://jasminexli.substack.com/feed",
        )}`;
        const response = await fetch(rssUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (data.status !== "ok" || !Array.isArray(data.items)) {
          throw new Error(data.message || "Failed to parse feed");
        }
        setRecentPosts(data.items.slice(0, 3));
        setPostsLoading(false);
      } catch (err) {
        console.error("Substack feed error:", err);
        setPostsLoading(false);
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

  const decodeHtmlEntities = (str: string): string => {
    if (!str) return "";
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const handlePersimmonHover = (isHovering: boolean) => {
    if (isHovering) {
      // Generate random positions for persimmons
      const positions: PersimmonPosition[] = [];
      const count = 12; // Number of persimmons to show
      for (let i = 0; i < count; i++) {
        positions.push({
          id: i,
          x: Math.random() * 90 + 5, // 5% to 95% of viewport width
          y: Math.random() * 90 + 5, // 5% to 95% of viewport height
        });
      }
      setPersimmonPositions(positions);
      setShowPersimmons(true);
      setActiveFootnote("persimmons");
    } else {
      setShowPersimmons(false);
      setActiveFootnote(null);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    const pauseDuration = 2000; // pause at end in milliseconds
    let isPaused = false;
    let animationFrameId: number;
    let pauseTimeoutId: NodeJS.Timeout;
    let resumeTimeoutId: NodeJS.Timeout;

    const autoScroll = () => {
      if (isPaused || isHovered) {
        animationFrameId = requestAnimationFrame(autoScroll);
        return;
      }

      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;

      scrollPosition += scrollSpeed;

      // Reset to start when reaching the end
      if (scrollPosition >= scrollWidth - clientWidth) {
        isPaused = true;
        pauseTimeoutId = setTimeout(() => {
          scrollPosition = 0;
          carousel.scrollLeft = 0; // Instant reset instead of smooth
          resumeTimeoutId = setTimeout(() => {
            isPaused = false;
          }, 500);
        }, pauseDuration);
      } else {
        carousel.scrollLeft = scrollPosition; // Direct property assignment is faster
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(pauseTimeoutId);
      clearTimeout(resumeTimeoutId);
    };
  }, [isHovered]);

  return (
    <div className="py-12 sm:py-16 content-with-sidebar">
      {/* Main Content */}
      <div className="main-content-area">
        <p className="leading-relaxed mb-4">Hi, I&apos;m Jasmine!</p>
        <p className="leading-relaxed mb-2">
          I work on US-China AI cooperation for safe AI development. Currently:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2 leading-relaxed">
          <li>
            Research Affiliate at{" "}
            <a
              className="hyperlink"
              href="https://www.safer-ai.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SaferAI
            </a>
            , building the Asian safety evaluations ecosystem;
          </li>
          <li>
            Writing about AI governance at{" "}
            <a
              className="hyperlink italic"
              href="https://jasminexli.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              The J-Space
            </a>
            ;
          </li>
          <li>Thinking about AI verification.</li>
        </ul>

        <p className="leading-relaxed mb-4">
          Previously, I was a{" "}
          <a
            className="hyperlink"
            href="https://www.matsprogram.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MATS
          </a>{" "}
          Fellow under Alex Turner, working on{" "}
          <a
            className="hyperlink"
            href="https://turntrout.com/eval-cooperation"
            target="_blank"
            rel="noopener noreferrer"
          >
            training mitigations for evaluation gaming
          </a>
          . I also researched{" "}
          <a
            className="hyperlink"
            href="https://github.com/jasmineee-li/warp"
            target="_blank"
            rel="noopener noreferrer"
          >
            agent security
          </a>{" "}
          at{" "}
          <a
            className="hyperlink"
            href="https://www.grayswan.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Gray Swan AI
          </a>
          , AI honesty with the{" "}
          <a
            className="hyperlink"
            href="https://www.safe.ai/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Center for AI Safety
          </a>
          , and value alignment (
          <a
            className="hyperlink"
            href="https://arxiv.org/abs/2406.20087"
            target="_blank"
            rel="noopener noreferrer"
          >
            NeurIPS
          </a>
          ,{" "}
          <a
            className="hyperlink"
            href="https://arxiv.org/abs/2509.01938"
            target="_blank"
            rel="noopener noreferrer"
          >
            ICLR
          </a>
          ).
        </p>

        <p className="leading-relaxed mb-4">
          I studied CS at Cornell as a{" "}
          <a
            className="hyperlink"
            href="https://milstein-program.as.cornell.edu/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Milstein
          </a>{" "}
          and{" "}
          <a
            className="hyperlink"
            href="https://telluridehouse.org/main/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telluride
          </a>{" "}
          scholar. While there, I founded{" "}
          <a
            className="hyperlink"
            href="https://cornell-aia.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cornell AI Alignment
          </a>{" "}
          and Cornell&apos;s{" "}
          <a
            className="hyperlink"
            href="https://cornell-aia.org/programs/cs1998"
            target="_blank"
            rel="noopener noreferrer"
          >
            first AI safety class
          </a>
          .
        </p>

        <p className="leading-relaxed mb-4">
          In my past life, I enjoyed tinkering with microfluidics, and published
          in{" "}
          <a
            className="hyperlink italic"
            href="https://www.nature.com/articles/s41467-023-39574-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nature Comm
          </a>{" "}
          and{" "}
          <a
            className="hyperlink italic"
            href="https://pubs.acs.org/doi/full/10.1021/acs.analchem.0c04883"
            target="_blank"
            rel="noopener noreferrer"
          >
            Analytical Chemistry
          </a>
          ! I grew up in England, Houston, and Xi&apos;an, China; I&apos;m lucky
          to have fond memories spanning continents. Some other loves:{" "}
          <span
            className={`hoverable-footnote ${
              activeFootnote === "persimmons" ? "active" : ""
            }`}
            onMouseEnter={() => handlePersimmonHover(true)}
            onMouseLeave={() => handlePersimmonHover(false)}
          >
            persimmons
          </span>
          , progress and economics,{" "}
          <a
            className="hyperlink"
            href="https://www.givingwhatwecan.org/pledge"
            target="_blank"
            rel="noopener noreferrer"
          >
            the 10% pledge 🔸
          </a>
          , backpacking, flowers, sketching, tomato egg noodles, San Francisco,
          my{" "}
          <Link href="/friends" className="hyperlink">
            friends
          </Link>
          .
        </p>

        <p className="leading-relaxed mb-4">
          Please reach out and say hi (
          <span className="whitespace-nowrap italic">
            jasmine xinze li [at] gmail [dot] com
          </span>
          )!
        </p>

        {/* Photo Carousel */}
        <div className="mt-10 sm:mt-12">
          <div
            className="carousel-container"
            ref={carouselRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="carousel-track">
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_6149.JPG"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_5634.jpg"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_4330.jpg"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_2781.jpg"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_2108.jpg"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_1871.jpg"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_1174.JPEG"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
              <div className="carousel-item">
                <Image
                  src="/assets/IMG_0210.JPG"
                  alt="Personal photo"
                  className="carousel-image"
                  width={400}
                  height={300}
                  quality={85}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recent writing */}
        <div className="mt-12 sm:mt-16 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-baseline mb-5 flex-wrap gap-3">
            <h2 className="writing-heading accent-font">Recent writing</h2>
            <Link href="/writing" className="writing-all-link">
              All posts →
            </Link>
          </div>
          {postsLoading ? (
            <p className="text-sm text-gray-500 py-4">Loading posts...</p>
          ) : (
            <ul className="space-y-3">
              {recentPosts.map((post, index) => (
                <li key={index}>
                  <a
                    href={post.link}
                    className="writing-row group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="writing-title">
                      {decodeHtmlEntities(post.title)}
                    </span>
                    <span className="writing-leader" aria-hidden="true" />
                    <span className="writing-date">
                      {formatDate(post.pubDate)}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Sidebar with Footnotes */}
      <aside className="sidebar-footnotes">
        {footnotes.map((footnote) => (
          <div
            key={footnote.id}
            className={`footnote-item ${
              activeFootnote === footnote.id ? "active" : ""
            }`}
          >
            {footnote.type === "image" && footnote.image ? (
              <>
                <Image
                  src={footnote.image}
                  alt={footnote.caption}
                  className="footnote-image"
                  width={280}
                  height={210}
                  quality={85}
                />
                <p className="footnote-caption">{footnote.caption}</p>
              </>
            ) : (
              <p className="footnote-text">{footnote.caption}</p>
            )}
          </div>
        ))}
      </aside>

      {/* Persimmon animation overlay */}
      {showPersimmons && (
        <div className="persimmon-overlay">
          {persimmonPositions.map((pos) => (
            <Image
              key={pos.id}
              src="/assets/persimmon.png"
              alt="Persimmon"
              className="floating-persimmon"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
              }}
              width={60}
              height={60}
            />
          ))}
        </div>
      )}
    </div>
  );
}
