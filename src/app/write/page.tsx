"use client";
import { useState, useEffect, useRef } from "react";
import "./write.css";

interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  content: string;
}

export default function WritePage() {
  const [mode, setMode] = useState<"start" | "write">("start");
  const [selectedMinutes, setSelectedMinutes] = useState(5);
  const [customMinutes, setCustomMinutes] = useState("");
  const editorRef = useRef<HTMLDivElement>(null);
  const [remainingMs, setRemainingMs] = useState(0);
  const [currentSegmentMs, setCurrentSegmentMs] = useState(0);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [idleRatio, setIdleRatio] = useState(0);
  const [showIdleWarning, setShowIdleWarning] = useState(false);
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);

  const idleStartRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const idleTickerRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch Substack posts for calendar tracker
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
        setSubstackPosts(data.items);
        setPostsLoading(false);
      } catch (err) {
        console.error("Substack feed error:", err);
        setPostsLoading(false);
      }
    };
    fetchSubstackFeed();
  }, []);

  // Get dates that have posts
  const getPostDates = () => {
    const dates = new Set<string>();
    substackPosts.forEach((post) => {
      const date = new Date(post.pubDate);
      // Only include 2026 posts
      if (date.getFullYear() === 2026) {
        dates.add(date.toISOString().split("T")[0]); // YYYY-MM-DD format
      }
    });
    return dates;
  };

  const startWriting = () => {
    const minutes = customMinutes ? Number(customMinutes) : selectedMinutes;
    if (minutes > 0) {
      setRemainingMs(minutes * 60 * 1000);
      setCurrentSegmentMs(minutes * 60 * 1000);
      setMode("write");
      setTimeout(() => editorRef.current?.focus(), 100);
    }
  };

  const countWords = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).filter(Boolean).length;
  };

  const stopIdleWatch = () => {
    if (idleTickerRef.current) {
      clearInterval(idleTickerRef.current);
      idleTickerRef.current = null;
    }
    idleStartRef.current = null;
    setIdleRatio(0);
  };

  const triggerFail = () => {
    if (isFailed || isTimeUp) return;
    setIsFailed(true);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    stopIdleWatch();
    if (editorRef.current) editorRef.current.textContent = "";
    setWordCount(0);
    setShowIdleWarning(true);
    setTimeout(() => setShowIdleWarning(false), 1500);
  };

  const startIdleWatch = () => {
    stopIdleWatch();
    idleStartRef.current = Date.now();
    setIdleRatio(0);

    idleTickerRef.current = setInterval(() => {
      if (!idleStartRef.current) return;
      const elapsed = Date.now() - idleStartRef.current;
      const ratio = elapsed >= 3000 ? Math.min(1, (elapsed - 3000) / 2000) : 0;
      setIdleRatio(ratio);
      if (elapsed >= 5000) {
        triggerFail();
      }
    }, 80);
  };

  const handleEditorInput = () => {
    if (isTimeUp) return;
    if (!hasStarted) {
      setHasStarted(true);
    }
    const text = editorRef.current?.textContent || "";
    setWordCount(countWords(text));
    startIdleWatch();
  };

  const resetSession = () => {
    setMode("start");
    if (editorRef.current) editorRef.current.textContent = "";
    setWordCount(0);
    setRemainingMs(0);
    setCurrentSegmentMs(0);
    setIsTimeUp(false);
    setIsFailed(false);
    setHasStarted(false);
    stopIdleWatch();
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const saveText = () => {
    const text = editorRef.current?.textContent || "";
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "writing.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (!hasStarted || mode !== "write") return;

    const endTime = Date.now() + remainingMs;
    const segmentMs = currentSegmentMs || remainingMs;

    timerIntervalRef.current = setInterval(() => {
      const remaining = endTime - Date.now();
      setRemainingMs(remaining);

      if (remaining <= 0) {
        setRemainingMs(0);
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        stopIdleWatch();
        setIsTimeUp(true);
      }
    }, 200);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [hasStarted, mode]);

  const progressPercent =
    currentSegmentMs > 0
      ? Math.min(
          100,
          Math.max(
            0,
            ((currentSegmentMs - remainingMs) / currentSegmentMs) * 100
          )
        )
      : 0;

  const renderCalendar = () => {
    const postDates = getPostDates();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return (
      <div className="write-tracker">
        <h2 className="write-tracker-title">2026 Writing Tracker</h2>
        <div className="write-calendar-grid">
          {months.map((month, monthIndex) => {
            const daysInMonth = new Date(2026, monthIndex + 1, 0).getDate();
            const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

            return (
              <div key={month} className="write-month">
                <div className="write-month-name">{month}</div>
                <div className="write-days-grid">
                  {days.map((day) => {
                    const dateStr = `2026-${String(monthIndex + 1).padStart(
                      2,
                      "0"
                    )}-${String(day).padStart(2, "0")}`;
                    const hasPost = postDates.has(dateStr);
                    return (
                      <div
                        key={day}
                        className={`write-day-diamond ${
                          hasPost ? "filled" : ""
                        }`}
                        title={`${month} ${day}, 2026${hasPost ? " ✓" : ""}`}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (mode === "start") {
    return (
      <div className="write-start-screen">
        {!postsLoading && renderCalendar()}
        <div className="write-start-card">
          <h1>Dangerous Writing</h1>
          <p>
            Pick how long you want to keep typing. Pause for more than 5 seconds
            and your words vanish.
          </p>
          <div className="write-time-options">
            {[5, 10, 20, 40].map((min) => (
              <div
                key={min}
                className={`write-chip ${
                  selectedMinutes === min ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedMinutes(min);
                  setCustomMinutes("");
                  startWriting();
                }}
              >
                {min} minutes
              </div>
            ))}
          </div>
          <div className="write-custom-time">
            <span>or enter time:</span>
            <input
              type="number"
              min="1"
              placeholder="minutes"
              value={customMinutes}
              onChange={(e) => setCustomMinutes(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") startWriting();
              }}
            />
          </div>
          <button className="write-primary-btn" onClick={startWriting}>
            Start writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="write-editor-screen"
      style={{
        filter: `blur(${Math.pow(idleRatio, 0.6) * 3}px)`,
        boxShadow: `inset 0 0 0 14px rgba(217, 83, 79, ${
          0.15 + Math.pow(idleRatio, 0.6) * 0.45
        })`,
      }}
    >
      <div className="write-progress-track">
        <div
          className="write-progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <header className="write-header">
        <button className="write-icon-btn" onClick={resetSession}>
          ✕
        </button>
      </header>

      <div className="write-editor-wrapper">
        <div
          ref={editorRef}
          className="write-editor"
          contentEditable
          onInput={handleEditorInput}
          data-placeholder="Start typing..."
        />
        <div className={`write-idle-warning ${showIdleWarning ? "show" : ""}`}>
          You paused. Everything vanished.
        </div>
      </div>

      <div className="write-word-count">
        {wordCount} word{wordCount === 1 ? "" : "s"}
      </div>

      {isTimeUp && (
        <div className="write-time-up-panel">
          <button
            className="write-chip"
            onClick={() => {
              setRemainingMs(10 * 60 * 1000);
              setCurrentSegmentMs(10 * 60 * 1000);
              setIsTimeUp(false);
              setHasStarted(true);
              startIdleWatch();
              editorRef.current?.focus();
            }}
          >
            +10 min
          </button>
          <button
            className="write-chip"
            onClick={() => {
              setRemainingMs(20 * 60 * 1000);
              setCurrentSegmentMs(20 * 60 * 1000);
              setIsTimeUp(false);
              setHasStarted(true);
              startIdleWatch();
              editorRef.current?.focus();
            }}
          >
            +20 min
          </button>
          <button className="write-save-btn" onClick={saveText}>
            Save
          </button>
        </div>
      )}

      {isFailed && (
        <div className="write-overlay">
          <div className="write-fail-overlay">
            <h2>You failed...</h2>
            <button onClick={resetSession}>Try again</button>
          </div>
        </div>
      )}
    </div>
  );
}
