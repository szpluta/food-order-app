import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="text-center text-sm py-5 mt-auto">
      <p>
        Meal Ordering App &copy; 2026 &middot; Design &amp; development by
        Szymon Pluta
      </p>
      <p className="text-xs mt-1">
        v<span className="text-[var(--accent)]">1.2</span> - TORTILLA,{" "}
        <Link
          className="hover:text-[var(--accent)] transition-colors"
          to="/changelog"
        >
          Changelog
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
