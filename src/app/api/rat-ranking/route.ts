import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "rat-ranking.json");

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

const SEED_WORDS: Word[] = [
  // S tier
  { id: "s1", text: "Honk!", score: 60 },
  { id: "s2", text: "Backchain", score: 57 },
  { id: "s3", text: "Non-trivial", score: 55 },
  { id: "s4", text: "Something like this", score: 53 },
  { id: "s5", text: "AISIs", score: 51 },
  { id: "s6", text: "something something…", score: 50 },
  // A tier
  { id: "a1", text: "Prior", score: 48 },
  { id: "a2", text: "Update", score: 46 },
  { id: "a3", text: "Heuristic", score: 44 },
  { id: "a4", text: "Counterfactual", score: 43 },
  { id: "a5", text: "Nerd sniped", score: 42 },
  { id: "a6", text: "Directionally", score: 41 },
  { id: "a7", text: "+1 / -1", score: 40 },
  { id: "a8", text: "A priori", score: 39 },
  { id: "a9", text: "Revealed preferences", score: 38 },
  { id: "a10", text: "Utils", score: 37 },
  { id: "a11", text: '"we should find Jasmine-shaped people"', score: 35 },
  // B tier
  { id: "b1", text: "Pareto", score: 30 },
  { id: "b2", text: "'I claim that'", score: 28 },
  { id: "b3", text: "From first principles", score: 26 },
  { id: "b4", text: "GDM", score: 24 },
  { id: "b5", text: "Plausible", score: 20 },
  // C tier
  { id: "c1", text: "A priori", score: 15 },
  { id: "c2", text: "this", score: 10 },
  // D tier
  { id: "d1", text: "'Seems good'", score: 8 },
  { id: "d2", text: "'Seems right'", score: 5 },
  { id: "d3", text: "p(doom)", score: 2 },
  // E tier
  { id: "e1", text: "Orthogonal", score: -5 },
  // F tier
  { id: "f1", text: "'Or something' 😭", score: -11 },
  { id: "f2", text: "'I guess'", score: -13 },
  { id: "f3", text: "+10", score: -14 },
  { id: "f4", text: "-10", score: -15 },
  { id: "f5", text: "Trivial", score: -16 },
  { id: "f6", text: "Forwardchain", score: -18 },
  { id: "f7", text: "idk man (in an argument)", score: -20 },
];

function getData(): Data {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    const data: Data = { words: SEED_WORDS, comments: [] };
    saveData(data);
    return data;
  }
}

function saveData(data: Data) {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = getData();
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = getData();

  switch (body.action) {
    case "vote": {
      const { wordId, delta } = body;
      if (!wordId || typeof delta !== "number" || delta < -2 || delta > 2) {
        return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
      }
      const word = data.words.find((w) => w.id === wordId);
      if (!word) {
        return NextResponse.json({ error: "Word not found" }, { status: 404 });
      }
      word.score += delta;
      saveData(data);
      return NextResponse.json({ ok: true, score: word.score });
    }

    case "submit": {
      const { text } = body;
      if (!text || typeof text !== "string" || text.length > 200) {
        return NextResponse.json({ error: "Invalid word" }, { status: 400 });
      }
      const word: Word = {
        id: `w${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        text: text.slice(0, 200),
        score: 0,
      };
      data.words.push(word);
      saveData(data);
      return NextResponse.json(word);
    }

    case "comment": {
      const { text, author } = body;
      if (!text || typeof text !== "string" || text.length > 500) {
        return NextResponse.json(
          { error: "Invalid comment" },
          { status: 400 }
        );
      }
      const comment: Comment = {
        id: `c${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
        text: text.slice(0, 500),
        author:
          typeof author === "string" && author.trim()
            ? author.trim().slice(0, 50)
            : "anon",
        createdAt: new Date().toISOString(),
      };
      data.comments.unshift(comment);
      saveData(data);
      return NextResponse.json(comment);
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
