"use client";
import "./page.css";
import { useEffect, useRef } from "react";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    let scrollPosition = 0;
    const scrollSpeed = 1; // pixels per frame
    const pauseDuration = 2000; // pause at end in milliseconds
    let isPaused = false;

    const autoScroll = () => {
      if (isPaused) return;

      scrollPosition += scrollSpeed;

      // Reset to start when reaching the end
      if (scrollPosition >= scrollWidth - clientWidth) {
        isPaused = true;
        setTimeout(() => {
          scrollPosition = 0;
          carousel.scrollTo({ left: 0, behavior: "smooth" });
          setTimeout(() => {
            isPaused = false;
          }, 1000);
        }, pauseDuration);
        return;
      }

      carousel.scrollTo({ left: scrollPosition, behavior: "auto" });
    };

    const interval = setInterval(autoScroll, 50);

    // Pause on hover
    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      if (!isPaused) {
        const newInterval = setInterval(autoScroll, 50);
        return () => clearInterval(newInterval);
      }
    };

    carousel.addEventListener("mouseenter", handleMouseEnter);
    carousel.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      clearInterval(interval);
      carousel.removeEventListener("mouseenter", handleMouseEnter);
      carousel.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="py-8">
      <h1 className="text-4xl font-bold mb-6">Jasmine Li</h1>
      <p className="mb-4">Hello! I&apos;m Jasmine.</p>
      <p>
        I&apos;m an undergrad{" "}
        <a
          className="hyperlink"
          href="https://milstein-program.as.cornell.edu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Milstein Scholar
        </a>{" "}
        at Cornell, studying CS and philosophy. I care about strong communities,
        cool ideas, and doing meaningful good in the world.
      </p>
      <br />
      <p>
        Currently, I&apos;m focused on helping the development of advanced AI go
        well. This summer, I&apos;m developing agentic monitoring models at Gray
        Swan AI! Previously, I have also worked on LLM honesty, model
        calibration, and disposition benchmarking, advised by{" "}
        <a
          className="hyperlink"
          href="https://pi.math.cornell.edu/~levine/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lionel Levine
        </a>{" "}
        and{" "}
        <a
          className="hyperlink"
          href="https://www.linkedin.com/in/mmazeika"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mantas Mazeika
        </a>
        . I also lead{" "}
        <a
          className="hyperlink"
          href="https://cornell-aia.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cornell AI Alignment
        </a>{" "}
        and contribute to a variety of independent alignment projects, including{" "}
        <a
          className="hyperlink"
          href="https://arxiv.org/pdf/2406.20087"
          target="_blank"
          rel="noopener noreferrer"
        >
          ProgressGym
        </a>
        .
      </p>
      <br />
      <p>
        I also really love{" "}
        <a
          className="hyperlink"
          href="https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en&authuser=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          bioengineering
        </a>
        ,{" "}
        <a
          className="hyperlink"
          href="https://jasminexli.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          writing{" "}
        </a>
        (especially with{" "}
        <a
          className="hyperlink"
          href="https://x.com/jasminexli/status/1897138031410471028"
          target="_blank"
          rel="noopener noreferrer"
        >
          friends
        </a>
        !), and{" "}
        <a
          className="hyperlink"
          href="https://www.cornelldti.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          building 0-1 products.
        </a>
        {/* . In addition, I love to write and publish on my . This summer I&apos;ll
        be at Meta, and previously I worked in software engineering at{" "}
        <a
          className="hyperlink"
          href="https://ellis.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ellis
        </a>
        . In my past life, I{" "}
        <a
          className="hyperlink"
          href="https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en&authuser=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          researched analytical chemistry
        </a>{" "}
        and science ethics education. */}
      </p>
      <br />
      <p>
        On the personal side: I grew up on 3 different continents, live in the{" "}
        <a
          className="hyperlink"
          href="https://telluridehouse.org/main/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telluride House
        </a>{" "}
        as a scholar (🫶), and am an avid backpacker and outdoors person. I like
        hosting community events and dinner parties, reading sweeping novels
        (most recently, East of Eden), journaling, and watching sunsets!
      </p>

      {/* Photo Carousel */}
      <div className="mt-12">
        <div className="carousel-container" ref={carouselRef}>
          <div className="carousel-track">
            <div className="carousel-item">
              <img
                src="/assets/IMG_6149.JPG"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_5634.jpg"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_4330.jpg"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_2781.jpg"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_2108.jpg"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_1871.jpg"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_1174.JPEG"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/assets/IMG_0210.JPG"
                alt="Personal photo"
                className="carousel-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
