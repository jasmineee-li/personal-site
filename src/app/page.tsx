"use client";
import "./page.css";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
        Jasmine Li
      </h1>
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
        at Cornell, studying CS, philosophy, and English. I care about strong
        communities, cool ideas, and doing meaningful good in the world.
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
      <div className="mt-8 sm:mt-12">
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
  );
}
