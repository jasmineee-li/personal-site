export default function Friends() {
  const friends = [
    { name: "Sudarsh", url: "https://sudarsh.com/" },
    { name: "Jonee", url: "https://joneedssleep.github.io/" },
    { name: "Yixiong", url: "https://yixiong.dev/" },
    { name: "Parv Mahajan", url: "https://parvmahajan.com/" },
    { name: "Jason", url: "https://jason.ml/" },
  ];

  return (
    <div className="py-12 sm:py-16">
      <h1 className="text-xl font-medium mb-6 accent-font">Friends</h1>

      <ul className="list-disc pl-6 space-y-2 text-base leading-relaxed">
        {friends.map((friend) => (
          <li key={friend.url}>
            <a
              className="hyperlink"
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {friend.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
