import "./Footer.css";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 mt-16 py-8" style={{ background: 'var(--background)' }}>
      <div className="max-w-[720px] mx-auto px-6">
        <div className="text-sm text-gray-600 mb-3">
          jasmine xinze li [at] gmail [dot] com
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
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
