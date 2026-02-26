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
  const [allPosts, setAllPosts] = useState<SubstackPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [showPersimmons, setShowPersimmons] = useState(false);
  const [persimmonPositions, setPersimmonPositions] = useState<
    PersimmonPosition[]
  >([]);

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
        setAllPosts(data.items);
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

  const handleRandomPost = () => {
    if (allPosts.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPosts.length);
      window.open(allPosts[randomIndex].link, "_blank");
    }
  };

  const handleFootnoteHover = (id: string | null) => {
    setActiveFootnote(id);
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
        <p className="leading-relaxed mb-4">Hey, I&apos;m Jasmine!</p>
        <p className="leading-relaxed mb-4">
          I research technical safeguards for artificial intelligence, and study
          CS and English at Cornell as a{" "}
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
            Telluride Scholar
          </a>
          .
        </p>

        <p className="leading-relaxed mb-4">
          I care about making the development of advanced AI go well —
          that&apos;s one reason I do research. (The other is that it&apos;s
          incredibly fun and fulfilling, and I get to work with wonderful people
          who inspire me!) I&apos;m currently a winter 2026{" "}
          <a
            className="hyperlink"
            href="https://www.matsprogram.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            MATS scholar
          </a>{" "}
          under Alex Turner (go Team Shard!!), doing model biology for
          evaluation awareness. Previously, I developed agent security
          evaluations at Gray Swan AI and methods for LLM honesty at the Center
          for AI Safety. I also founded{" "}
          <a
            className="hyperlink"
            href="https://cornell-aia.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cornell AI Alignment
          </a>
          ! See my{" "}
          <Link href="/projects" className="hyperlink">
            research
          </Link>{" "}
          and{" "}
          <Link href="/now" className="hyperlink">
            what I&apos;m up to now
          </Link>
          .
        </p>

        <p className="leading-relaxed mb-4">
          I&apos;m most motivated by spending the present well and building
          flourishing, free futures for humanity. Other loves of mine:{" "}
          <span
            className={`hoverable-footnote ${
              activeFootnote === "persimmons" ? "active" : ""
            }`}
            onMouseEnter={() => handlePersimmonHover(true)}
            onMouseLeave={() => handlePersimmonHover(false)}
          >
            persimmons
          </span>
          , optimistic science fiction, AI for science,{" "}
          <a
            className="hyperlink"
            href="https://www.givingwhatwecan.org/pledge"
            target="_blank"
            rel="noopener noreferrer"
          >
            the 10% pledge 🔸
          </a>{" "}
          (you should sign it!), long hikes, running at dawn, my{" "}
          <Link href="/friends" className="hyperlink">
            friends
          </Link>
          , vegetarianism, self-understanding, and meeting new people. Please
          reach out and say hi (
          <a className="hyperlink" href="mailto:jasminexinzeli@gmail.com">
            jasminexinzeli@gmail.com
          </a>
          )!
        </p>

        {/* Recent Posts */}
        <div className="mt-12 sm:mt-16 border-t border-gray-200 pt-8">
          <div className="flex justify-between items-baseline mb-2 flex-wrap gap-3">
            <h2 className="text-xl font-medium accent-font">Recent posts</h2>
            <div className="flex gap-4 items-center">
              <button onClick={handleRandomPost} className="random-button">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="random-icon"
                >
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Random
              </button>
              <Link
                href="/writing"
                className="text-sm  hover:text-gray-900 transition-colors"
              >
                All posts →
              </Link>
            </div>
          </div>
          <p className="text-sm mb-6">
            I like to write, and want to write more! My stack is{" "}
            <a
              href="https://github.com/jasmineee-li/zap-writing-plugin"
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              this
            </a>
            .
          </p>
          {postsLoading ? (
            <p className="text-sm text-gray-500 py-4">Loading posts...</p>
          ) : (
            <ul className="space-y-4">
              {recentPosts.map((post, index) => (
                <li key={index}>
                  <a
                    href={post.link}
                    className="block group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex justify-between items-baseline gap-6">
                      <span className="text-base group-hover:text-[#a10000] transition-colors">
                        {post.title}
                      </span>
                      <span className="text-sm text-gray-500 whitespace-nowrap flex-shrink-0">
                        {formatDate(post.pubDate)}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Photo Carousel */}
        <div className="mt-12 sm:mt-16 border-t border-gray-200 pt-8">
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
