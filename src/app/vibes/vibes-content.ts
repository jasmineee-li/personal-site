// Curated, non-image vibes (quotes, links, videos).
// Plain images dropped into public/vibes/ are picked up automatically by the
// page and merged into this feed by date — no need to list them here.

export type VibeItem =
  | { type: "image"; date: string; src: string; alt?: string }
  | { type: "quote"; date: string; lines: string[]; attribution: string }
  | {
      type: "video";
      date: string;
      url: string;
      videoId: string;
      title: string;
      source: string;
    };

export const curatedVibes: VibeItem[] = [
  {
    type: "video",
    date: "2026-06-27T12:02:00.000Z",
    url: "https://www.youtube.com/watch?v=hg7qdowoemo",
    videoId: "hg7qdowoemo",
    title: "love is evil",
    source: "Slavoj Žižek",
  },
  {
    type: "quote",
    date: "2026-06-27T12:01:00.000Z",
    lines: [
      "“Oh, Septimus!—can you bear it? All the lost plays of the Athenians! Two hundred at least by Aeschylus, Sophocles, Euripides—thousands of poems—Aristotle’s own library brought to Egypt by [Cleopatra’s] ancestors. How can we sleep for grief?”",
      "“By counting our stock. Seven plays from Aeschylus, seven from Sophocles, nineteen from Euripides, my lady! You should no more grieve for the rest than for a buckle lost from your first shoe, or for your lesson book which will be lost when you are old. We shed as we pick up, like travellers who must carry everything in their arms, and what we let fall will be picked up by those behind. The procession is very long and life is very short. We die on the march. But there is nothing outside the march so nothing can be lost to it. The missing plays of Sophocles will turn up piece by piece, or be written again in another language. Ancient cures for diseases will reveal themselves once more. Mathematical discoveries glimpsed and lost to view will have their time again. You do not suppose, my lady, that if all of Archimedes had been hiding in the great library of Alexandria, we should be at a loss for a corkscrew?”",
    ],
    attribution: "Arcadia, Tom Stoppard",
  },
];
