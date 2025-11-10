import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-[#F4F8F2] text-black p-4 sm:p-6 mt-6 sm:mt-10">
      <div className="max-w-[720px] mx-auto px-4">
        <hr className="border-t border-gray-300 mb-4" />{" "}
        {/* Horizontal separator */}
        <div className="mb-3 text-sm sm:text-base">jasminexinzeli at gmail</div> {/* Email */}
        <div className="flex flex-wrap gap-3 sm:gap-4 text-sm sm:text-base">
          <a href="https://jasminexli.substack.com" className="hyperlink">
            substack
          </a>
          <a
            href="https://www.linkedin.com/in/jasminexli/"
            className="hyperlink"
          >
            linkedin
          </a>
          <a href="https://x.com/jasminexli" className="hyperlink">
            twitter
          </a>
          <a href="https://github.com/jasmineee-li" className="hyperlink">
            github
          </a>
          <a
            href="https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en&authuser=1x"
            className="hyperlink"
          >
            google scholar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
