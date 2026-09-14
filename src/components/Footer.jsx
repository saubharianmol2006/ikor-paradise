import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>IKOR PARADISE</h2>

          <p className="footer-tagline">
            Good Food | Great Moments | Forever
          </p>

          <p>
            Hotel, Banquet & Restaurant in Aligarh.
            Experience comfort, delicious food and memorable celebrations
            under one roof.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="#about">About Us</a>
          <a href="#rooms">Rooms</a>
          <a href="#restaurant">Restaurant</a>
          <a href="#banquet">Banquet</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>

          <p>
            📍 Near HP Petrol Pump, Khair Bypass,
            Near Nada Chauraha, Aligarh
          </p>

          <a href="tel:+918859012000">
            📞 +91-8859012000
          </a>

          <a href="mailto:ikorparadise@gmail.com">
            ✉️ ikorparadise@gmail.com
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} IKOR PARADISE. All Rights Reserved.
        </p>

        <p>
          Hotel • Banquet • Restaurant
        </p>
      </div>
    </footer>
  );
}

export default Footer;
