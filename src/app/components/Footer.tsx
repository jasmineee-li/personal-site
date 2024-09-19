import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-[#F4F8F2] text-black p-4 mt-10">
      <div className="max-w-[720px] mx-auto">
        <hr className="border-t border-gray-300 mb-4" />{" "}
        {/* Horizontal separator */}
        <div className="mb-2">jasminexinzeli at gmail</div> {/* Email */}
        <div>
          <a href="https://jasminexli.substack.com" className="hyperlink mr-4">
            substack
          </a>
          <a
            href="https://www.linkedin.com/in/jasminexli/"
            className="hyperlink mr-4"
          >
            linkedin
          </a>
          <a href="https://x.com/jasminexli" className="hyperlink mr-4">
            twitter
          </a>
          <a href="https://github.com/jasmineee-li" className="hyperlink mr-4">
            github
          </a>
          <a
            href="https://scholar.google.com/citations?user=LSidePQAAAAJ&hl=en&authuser=1x"
            className="hyperlink mr-4"
          >
            google scholar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
