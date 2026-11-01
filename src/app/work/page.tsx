import { Fragment } from "react";
import BlogList from "../components/BlogList";
import { papers } from "./papers";

export default function Projects() {
  return (
    <div className="py-12 sm:py-16">
      <h2 className="text-xl font-bold mb-4 accent-font">Overview</h2>

      <div className="mb-10 space-y-4 leading-relaxed">
        <p>
          I currently focus on technical and international governance of
          frontier AI. In the past, I&apos;ve explored a{" "}
          <span className="research-reveal">
            <span className="hoverable-footnote" tabIndex={0}>
              variety of other research questions
            </span>
            <span className="research-popover" role="note">
              <span className="research-item">
                <span className="font-semibold">Oversight and control.</span>{" "}
                What oversight measures robustly scale to increasingly capable
                frontier language models? How do we understand situational
                awareness, model introspection, and other mentalistic
                properties?
              </span>
              <span className="research-item">
                <span className="font-semibold">
                  Value alignment and epistemics.
                </span>{" "}
                How can we train models to be more honest? How can AI uplift
                human truth-seeking and moral progress, and how do we prevent
                harmful value lock-in?
              </span>
              <span className="research-item">
                <span className="font-semibold">Agent security.</span> How do we
                design scalable, realistic environments for evaluating agent
                misuse and misbehavior — for example, in computer use and MCP
                settings?
              </span>
              <span className="research-item">
                How do we operationalize AI-induced human disempowerment?
              </span>
            </span>
          </span>{" "}
          in technical AI safety and alignment.
        </p>

        <p>
          As a doer and generalist, I try to make things happen in the world
          strategically. As a researcher, I enjoy rapid experimentation and
          careful truth-seeking. I absolutely love my work — I&apos;m very
          lucky ☺︎
        </p>
      </div>

      <h2 className="text-xl font-bold mb-4 border-t border-gray-200 pt-8 accent-font">
        Papers
      </h2>
      <ul className="paper-list">
        {papers.map((paper) => (
          <li key={paper.href}>
            <a
              href={paper.href}
              className="hyperlink"
              target="_blank"
              rel="noopener noreferrer"
            >
              {paper.title}
            </a>
            <p className="paper-meta">
              {paper.authors.map((author, i) => {
                const me = author.startsWith("*");
                const name = me ? author.slice(1) : author;
                return (
                  <Fragment key={i}>
                    {i > 0 && ", "}
                    {me ? <span className="paper-me">{name}</span> : name}
                  </Fragment>
                );
              })}
              {paper.venue && (
                <>
                  {" "}
                  <span className="paper-venue">{paper.venue}.</span>
                </>
              )}
              {paper.links.length > 0 && (
                <span className="paper-links">
                  {paper.links.map((link, i) => (
                    <Fragment key={link.href}>
                      {i > 0 && <span className="paper-sep">·</span>}
                      <a
                        href={link.href}
                        className="paper-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </Fragment>
                  ))}
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>

      {/* Blog Section */}
      <h2
        id="blog"
        className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font scroll-mt-8"
      >
        Blog
      </h2>
      <p className="mb-6 leading-relaxed">
        I write about AI at{" "}
        <a
          className="hyperlink italic"
          href="https://jasminexli.substack.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          The J-Space
        </a>
        .
      </p>
      <BlogList />

      {/* Media Section */}
      <h2 className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font">
        Media
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <a
            href="https://www.theinformation.com/newsletters/ai-agenda/ai-evaluators-struggle-models-know-tested"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            AI Evaluators Struggle as Models Know They&apos;re Being Tested
          </a>
          <p className="italic">The Information, AI Agenda</p>
        </li>
      </ul>

      {/* Mentorship Section */}
      <h2 className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font">
        Mentorship
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <a
            href="https://www.securefrontier.ai/mentors"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontier AI Security Residency
          </a>
          , Fall 2026
        </li>
      </ul>

      {/* Organizing Section */}
      <h2 className="text-xl font-bold mt-12 border-t border-gray-200 pt-8 mb-4 accent-font">
        Organizing
      </h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>
          <a
            href="https://proxima.ink/"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Proxima
          </a>
          <p className="italic">
            An anthology of speculative fiction and art, imagining
            post-intelligence explosion futures.
          </p>
        </li>
        <li>
          <a
            href="https://idealistscollective.org/unconference"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Idealists Collective Unconference
          </a>
          <p className="italic">April 2026</p>
        </li>
        <li>
          <a
            href="https://html-energy-seattle-2025.aninternet.farm/"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            HTML Day 2025, Seattle
          </a>
        </li>
        <li>
          <a
            href="https://x.com/jasminexli/status/1897138031410471028"
            className="hyperlink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pen &amp; Ponder
          </a>
        </li>
      </ul>
    </div>
  );
}
