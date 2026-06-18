import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header
      className="flex items-center justify-between px-6 h-16"
      style={{
        background: "var(--bg-dark)",
        color: "var(--text-light)",
        fontFamily: "var(--font-main)",
      }}
    >
      <div
        className="font-bold text-lg"
        style={{ fontSize: "var(--fs-lg)" }}
      >
        Excel System
      </div>

     
      <nav className="flex gap-6 text-sm">
        <Link
          to="/"
          className="transition opacity-80 hover:opacity-100"
          style={{ fontSize: "var(--fs-base)" }}
        >
          Excel
        </Link>

        <Link
          to="/products"
          className="transition opacity-80 hover:opacity-100"
          style={{ fontSize: "var(--fs-base)" }}
        >
          Товары
        </Link>
      </nav>
    </header>
  );
};

export default Header;