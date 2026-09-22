import "./friends.css";

const friends = [
  { name: "Sudarsh", url: "https://sudarsh.com/" },
  { name: "Jo", url: "https://joneedssleep.github.io/" },
  { name: "Yixiong", url: "https://yixiong.dev/" },
  { name: "Parv", url: "https://parvmahajan.com/" },
  { name: "Jason", url: "https://jason.ml/" },
  { name: "Sujai", url: "https://sujai1.github.io/" },
  { name: "Vincent", url: "https://vvvincent.me/" },
  { name: "Richard", url: "https://notrichardren.github.io/" },
  { name: "Pauline", url: "https://www.paulinewee.com/" },
  { name: "Andy", url: "https://yeedrag.github.io/" },
  { name: "Chandhana", url: "http://chandhana.com/#%F0%9F%8C%91" },
  { name: "Malaika", url: "https://malaikaaiyar.me/" },
  { name: "Samuel", url: "https://www.samuelratnam.xyz/now" },
  { name: "Atharva", url: "https://anihalani.com/" },
];

function Persimmon() {
  return (
    <svg
      className="friend-icon"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      aria-hidden="true"
    >
      <ellipse cx="12" cy="13.5" rx="9.5" ry="8.5" fill="#ef8f2e" />
      <ellipse cx="9.5" cy="11" rx="3.2" ry="2" fill="#f6ab55" opacity="0.7" />
      <path
        d="M12 4.2 L13.6 7.4 L17 8.2 L14.2 10 L14.4 13.2 L12 11.6 L9.6 13.2 L9.8 10 L7 8.2 L10.4 7.4 Z"
        fill="#5f8f3e"
      />
      <circle cx="12" cy="8.6" r="1" fill="#3f6428" />
    </svg>
  );
}

export default function Friends() {
  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-2 accent-font">Friends</h1>
      <p className="mb-10 text-gray-500 italic">work in progress :)</p>

      <ul className="friend-grid">
        {friends.map((friend) => (
          <li key={friend.url}>
            <a
              className="friend-link"
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              title={friend.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            >
              <Persimmon />
              <span className="friend-name accent-font">{friend.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
