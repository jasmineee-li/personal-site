import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function GET() {
  const supabase = getSupabase();
  const [wordsRes, commentsRes] = await Promise.all([
    supabase.from("words").select("id, text, score").order("score", { ascending: false }),
    supabase.from("comments").select("id, text, author, created_at").order("created_at", { ascending: false }).limit(100),
  ]);

  if (wordsRes.error || commentsRes.error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }

  return NextResponse.json({
    words: wordsRes.data.map((w) => ({ id: w.id, text: w.text, score: w.score })),
    comments: commentsRes.data.map((c) => ({
      id: c.id,
      text: c.text,
      author: c.author,
      createdAt: c.created_at,
    })),
  });
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();
  const body = await req.json();

  switch (body.action) {
    case "vote": {
      const { wordId, delta } = body;
      if (!wordId || typeof delta !== "number" || delta < -2 || delta > 2) {
        return NextResponse.json({ error: "Invalid vote" }, { status: 400 });
      }

      // Atomic score increment via RPC or raw update
      const { error } = await supabase.rpc("increment_score", {
        word_id: wordId,
        amount: delta,
      });

      if (error) {
        // Fallback if RPC doesn't exist yet — read-modify-write
        const { data: word } = await supabase
          .from("words")
          .select("score")
          .eq("id", wordId)
          .single();
        if (!word) {
          return NextResponse.json({ error: "Word not found" }, { status: 404 });
        }
        const { error: updateErr } = await supabase
          .from("words")
          .update({ score: word.score + delta })
          .eq("id", wordId);
        if (updateErr) {
          return NextResponse.json({ error: "Update failed" }, { status: 500 });
        }
        return NextResponse.json({ ok: true, score: word.score + delta });
      }

      return NextResponse.json({ ok: true });
    }

    case "submit": {
      const { text } = body;
      if (!text || typeof text !== "string" || text.length > 200) {
        return NextResponse.json({ error: "Invalid word" }, { status: 400 });
      }
      const id = `w${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const { error } = await supabase
        .from("words")
        .insert({ id, text: text.slice(0, 200), score: 0 });

      if (error) {
        return NextResponse.json({ error: "Insert failed" }, { status: 500 });
      }
      return NextResponse.json({ id, text: text.slice(0, 200), score: 0 });
    }

    case "comment": {
      const { text, author } = body;
      if (!text || typeof text !== "string" || text.length > 500) {
        return NextResponse.json({ error: "Invalid comment" }, { status: 400 });
      }
      const id = `c${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const authorName =
        typeof author === "string" && author.trim()
          ? author.trim().slice(0, 50)
          : "anon";

      const { data, error } = await supabase
        .from("comments")
        .insert({ id, text: text.slice(0, 500), author: authorName })
        .select("id, text, author, created_at")
        .single();

      if (error || !data) {
        return NextResponse.json({ error: "Insert failed" }, { status: 500 });
      }
      return NextResponse.json({
        id: data.id,
        text: data.text,
        author: data.author,
        createdAt: data.created_at,
      });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}
