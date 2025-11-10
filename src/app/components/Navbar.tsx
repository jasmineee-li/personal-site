import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-[#F4F8F2] text-black p-4 mt-6 sm:mt-10 w-full">
      <ul className="flex flex-row flex-wrap justify-center gap-3 sm:gap-4">
        <li>
          <Link href="/" className="nav-hyperlink">
            home
          </Link>
        </li>
        <li>
          <Link href="/projects" className="nav-hyperlink">
            projects
          </Link>
        </li>
        <li>
          <Link href="/writing" className="nav-hyperlink">
            writing
          </Link>
        </li>
        <li>
          <Link href="/resume" className="nav-hyperlink">
            resume
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
