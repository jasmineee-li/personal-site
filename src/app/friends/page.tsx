export default function Friends() {
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
    { name: "Chandhana", url: "https://chandhana.com/#🌔" },
  ];

  function displayUrl(url: string) {
    return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  }

  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-2 accent-font">Friends</h1>
      <p className="mb-10 text-gray-500 italic">work in progress :)</p>

      <div className="space-y-5">
        {friends.map((friend) => (
          <a
            key={friend.url}
            className="block group"
            href={friend.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-base font-semibold accent-font group-hover:text-gray-300 transition-colors">
              {friend.name}
            </span>
            <span className="ml-2 text-sm text-gray-500 font-mono">
              {displayUrl(friend.url)} →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
