import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import logoImage from "../assets/images/ikor-logo.jpg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}

        <div className="navbar-logo">

          <Link
            to="/"
            aria-label="IKOR Paradise Home"
            onClick={closeMenu}
          >

            <img
              src={logoImage}
              alt="IKOR Paradise"
              className="navbar-logo-image"
            />

          </Link>

        </div>


        {/* MOBILE MENU BUTTON */}

        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>


        {/* NAVIGATION */}

        <nav
          className={`navbar-menu ${
            menuOpen ? "navbar-menu-open" : ""
          }`}
        >

          <a href="/#home" onClick={closeMenu}>
            Home
          </a>

          <a href="/#about" onClick={closeMenu}>
            About Us
          </a>

          <a href="/#rooms" onClick={closeMenu}>
            Rooms
          </a>

          <a href="/#restaurant" onClick={closeMenu}>
            Restaurant
          </a>

          <a href="/#banquet" onClick={closeMenu}>
            Banquet
          </a>

          <a href="/#gallery" onClick={closeMenu}>
            Gallery
          </a>

          <a href="/#contact" onClick={closeMenu}>
            Contact
          </a>

        </nav>


        {/* BOOK NOW */}

        <Link
          to="/booking"
          className="navbar-book-link"
          onClick={closeMenu}
        >

          <button className="book-btn">
            Book Now
          </button>

        </Link>

      </div>

    </header>
  );
}

export default Navbar;
