"use client";

import { useState, useEffect } from "react";
import "./rat-ranking.css";

interface Word {
  id: string;
  text: string;
  score: number;
}

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface Data {
  words: Word[];
  comments: Comment[];
}

const TIERS = [
  { label: "S", min: 50, color: "#ff7f7f" },
  { label: "A", min: 35, color: "#ffbf7f" },
  { label: "B", min: 20, color: "#ffdf7f" },
  { label: "C", min: 10, color: "#7fff7f" },
  { label: "D", min: 0, color: "#7fbfff" },
  { label: "E", min: -10, color: "#bf7fff" },
  { label: "F", min: -Infinity, color: "#ff7fbf" },
] as const;

function getTierLabel(score: number) {
  for (const tier of TIERS) {
    if (score >= tier.min) return tier.label;
  }
  return "F";
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function RatRanking() {
  const [data, setData] = useState<Data>({ words: [], comments: [] });
  const [votes, setVotes] = useState<Record<string, "up" | "down">>({});
  const [newWord, setNewWord] = useState("");
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/rat-ranking")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    try {
      const storedVotes = localStorage.getItem("rat-ranking-votes");
      if (storedVotes) setVotes(JSON.parse(storedVotes));
      const storedName = localStorage.getItem("rat-ranking-name");
      if (storedName) setName(storedName);
    } catch {}
  }, []);

  const saveVotes = (v: Record<string, "up" | "down">) => {
    setVotes(v);
    localStorage.setItem("rat-ranking-votes", JSON.stringify(v));
  };

  const handleVote = async (wordId: string, direction: "up" | "down") => {
    const current = votes[wordId];
    let delta = 0;
    const newVotes = { ...votes };

    if (current === direction) {
      delete newVotes[wordId];
      delta = direction === "up" ? -1 : 1;
    } else if (current) {
      newVotes[wordId] = direction;
      delta = direction === "up" ? 2 : -2;
    } else {
      newVotes[wordId] = direction;
      delta = direction === "up" ? 1 : -1;
    }

    saveVotes(newVotes);
    setData((prev) => ({
      ...prev,
      words: prev.words.map((w) =>
        w.id === wordId ? { ...w, score: w.score + delta } : w
      ),
    }));

    fetch("/api/rat-ranking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "vote", wordId, delta }),
    });
  };

  const handleSubmitWord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord.trim()) return;

    const res = await fetch("/api/rat-ranking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "submit", text: newWord.trim() }),
    });

    if (res.ok) {
      const word = await res.json();
      setData((prev) => ({ ...prev, words: [...prev.words, word] }));
      setNewWord("");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (name.trim()) localStorage.setItem("rat-ranking-name", name.trim());

    const res = await fetch("/api/rat-ranking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "comment",
        text: newComment.trim(),
        author: name.trim() || undefined,
      }),
    });

    if (res.ok) {
      const comment = await res.json();
      setData((prev) => ({
        ...prev,
        comments: [comment, ...prev.comments],
      }));
      setNewComment("");
    }
  };

  const tiers = TIERS.map((tier) => ({
    ...tier,
    words: data.words
      .filter((w) => getTierLabel(w.score) === tier.label)
      .sort((a, b) => b.score - a.score),
  }));

  if (loading) {
    return (
      <div className="py-12 sm:py-16">
        <p className="rr-loading">Loading the rankings...</p>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <h1 className="rr-wordart">The Definitive Rat Ranking</h1>
      <p className="rr-subtitle">
        words &amp; phrases, ranked by the people
      </p>

      <form className="rr-submit-form" onSubmit={handleSubmitWord}>
        <input
          className="rr-input"
          type="text"
          placeholder="Submit a word or phrase..."
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          maxLength={200}
        />
        <input
          className="rr-input rr-input-name"
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={50}
        />
        <button className="rr-btn" type="submit" disabled={!newWord.trim()}>
          Add
        </button>
      </form>

      <div className="rr-tier-list">
        {tiers.map((tier) => (
          <div key={tier.label} className="rr-tier-row">
            <div
              className="rr-tier-label"
              style={{ backgroundColor: tier.color }}
            >
              {tier.label}
            </div>
            <div className="rr-tier-words">
              {tier.words.length === 0 ? (
                <span className="rr-tier-empty">—</span>
              ) : (
                tier.words.map((word) => (
                  <div key={word.id} className="rr-word">
                    <span className="rr-word-text">{word.text}</span>
                    <button
                      className={`rr-vote-btn ${votes[word.id] === "up" ? "voted-up" : ""}`}
                      onClick={() => handleVote(word.id, "up")}
                      aria-label="Upvote"
                    >
                      ▲
                    </button>
                    <span className="rr-score">{word.score}</span>
                    <button
                      className={`rr-vote-btn ${votes[word.id] === "down" ? "voted-down" : ""}`}
                      onClick={() => handleVote(word.id, "down")}
                      aria-label="Downvote"
                    >
                      ▼
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="rr-comments-section">
        <h2 className="accent-font">Comments</h2>
        <form className="rr-comment-form" onSubmit={handleSubmitComment}>
          <input
            className="rr-input"
            type="text"
            placeholder="Leave a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            maxLength={500}
          />
          <button
            className="rr-btn"
            type="submit"
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </form>
        <div className="rr-comments-list">
          {data.comments.length === 0 ? (
            <p style={{ opacity: 0.3, fontSize: "0.85rem", fontStyle: "italic" }}>
              No comments yet. Be the first!
            </p>
          ) : (
            data.comments.map((c) => (
              <div key={c.id} className="rr-comment">
                <span className="rr-comment-author">{c.author}</span>
                {c.text}
                <span className="rr-comment-time">{timeAgo(c.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
