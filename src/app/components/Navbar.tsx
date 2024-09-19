import Link from "next/link";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="bg-[#F4F8F2] text-black p-4 mt-20">
      <div className="max-w-[720px] mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Jasmine Li 🌱
        </Link>
        <ul className="flex space-x-4">
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
          {/* <li className="hyperlink">
            <Link href="/research">research</Link>
          </li> */}
          <li>
            <Link href="/resume" className="nav-hyperlink">
              resume
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
