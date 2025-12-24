"use client";
import Link from "next/link";
import "./Navbar.css";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="grid-navbar">
      <div className="grid-navbar-content">
        <div className="grid-navbar-left">
          <Link href="/" className="grid-navbar-cell">
            Jasmine Li
          </Link>
        </div>
        <div className="grid-navbar-right">
          <Link
            href="/"
            className={`grid-navbar-cell ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`grid-navbar-cell ${
              pathname === "/projects" ? "active" : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/writing"
            className={`grid-navbar-cell ${
              pathname === "/writing" ? "active" : ""
            }`}
          >
            Writing
          </Link>
          <Link
            href="/now"
            className={`grid-navbar-cell ${
              pathname === "/now" ? "active" : ""
            }`}
          >
            Now
          </Link>
          <Link
            href="/resume"
            className={`grid-navbar-cell ${
              pathname === "/resume" ? "active" : ""
            }`}
          >
            Resume
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
