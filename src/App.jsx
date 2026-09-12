import Navbar from "./components/Navbar";
import Rooms from "./components/Rooms";
import Restaurant from "./components/Restaurant";
import Banquet from "./components/Banquet";
import Booking from "./pages/Booking";
import BookingSearch from "./components/BookingSearch";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

import entranceImage from "./assets/images/entrance.jpg";
import exteriorSideImage from "./assets/images/exterior-side.jpg";
import officialPoster from "./assets/images/official-poster.jpg";
import receptionImage from "./assets/images/reception.jpg";
import deluxe1Image from "./assets/images/deluxe-1.jpg";
import executive1Image from "./assets/images/executive-1.jpg";
import bathroomRealImage from "./assets/images/bathroom-real.jpg";
import restaurantImage from "./assets/images/restaurant-interior.jpg";
import banquetHallImage from "./assets/images/banquet-hall.jpg";
import ScrollToTop from "./ScrollToTop";


/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  return (
    <>
      <Navbar />

      <main>

        {/* =====================================================
            HERO
        ===================================================== */}

        <section id="home" className="home-section">

          <div className="hero-content">

            <p className="welcome-text">
              WELCOME TO
            </p>

            <h1>IKOR</h1>

            <h2>PARADISE</h2>

            <p className="hotel-text">
              HOTEL & BANQUET • RESTAURANT
            </p>

            <p className="tagline">
              Good Food | Great Moments | Forever
            </p>

            <div className="hero-buttons">

              <Link to="/booking">
                <button>
                  BOOK YOUR STAY
                </button>
              </Link>

              <a href="#about">
                <button className="outline-btn">
                  EXPLORE
                </button>
              </a>

            </div>

          </div>


          {/* =====================================================
              BOOKING SEARCH
          ===================================================== */}

          <BookingSearch />

        </section>


        {/* =====================================================
            ABOUT
        ===================================================== */}

        <section id="about" className="about-section">

          <div className="about-content">

            <p className="section-small-title">
              ABOUT IKOR PARADISE
            </p>

            <h2>
              Where Every Occasion
              <br />
              Feels Special
            </h2>

            <p className="about-text">
              Welcome to IKOR Paradise, a destination where comfort,
              delicious food and memorable celebrations come together.
              We offer a warm and elegant environment for guests looking
              for a relaxing stay, a delightful dining experience or a
              special celebration.
            </p>

            <p className="about-text">
              From comfortable rooms to beautiful banquet spaces and
              delicious restaurant experiences, our goal is to make
              every visit comfortable, memorable and truly special.
            </p>

            <Link to="/booking">
              <button className="read-more-btn">
                DISCOVER MORE
              </button>
            </Link>

          </div>


          <div className="about-card">

            <img
              src={receptionImage}
              alt="IKOR Paradise Reception"
            />

            <div className="about-card-overlay">

              <span>
                IKOR
              </span>

              <strong>
                PARADISE
              </strong>

            </div>

          </div>

        </section>


        {/* =====================================================
            ROOMS
        ===================================================== */}

        <Rooms />


        {/* =====================================================
            RESTAURANT
        ===================================================== */}

        <Restaurant />


        {/* =====================================================
            BANQUET
        ===================================================== */}

        <Banquet />


        {/* =====================================================
            SERVICES
        ===================================================== */}

        <section
          id="services"
          className="services-section"
        >

          <p className="section-small-title">
            WHAT WE OFFER
          </p>

          <h2>
            Everything You Need
          </h2>


          <div className="services-container">

            <div className="service-card">

              <div className="service-icon">
                🛏️
              </div>

              <h3>
                Comfortable Rooms
              </h3>

              <p>
                Elegant and comfortable rooms designed
                for a peaceful stay.
              </p>

            </div>


            <div className="service-card">

              <div className="service-icon">
                🍽️
              </div>

              <h3>
                Restaurant
              </h3>

              <p>
                Delicious food and memorable dining
                experiences for every guest.
              </p>

            </div>


            <div className="service-card">

              <div className="service-icon">
                🎉
              </div>

              <h3>
                Banquet Hall
              </h3>

              <p>
                A beautiful venue for weddings, parties
                and special celebrations.
              </p>

            </div>


            <div className="service-card">

              <div className="service-icon">
                🚗
              </div>

              <h3>
                Safe Parking
              </h3>

              <p>
                Convenient parking facilities for
                hotel and restaurant guests.
              </p>

            </div>

          </div>

        </section>


        {/* =====================================================
            GALLERY
        ===================================================== */}

        <section
          id="gallery"
          className="gallery-section"
        >

          <div className="gallery-heading">

            <p className="section-small-title">
              EXPERIENCE IKOR PARADISE
            </p>

            <h2>
              Our Gallery
            </h2>

            <p>
              Explore the ambience, comfort and beautiful
              spaces of IKOR Paradise.
            </p>

          </div>


          <div className="gallery-grid">

            {/* HOTEL ENTRANCE */}

            <div className="gallery-item gallery-large">

              <img
                src={entranceImage}
                alt="IKOR Paradise Entrance"
              />

              <div className="gallery-caption">
                Hotel Entrance
              </div>

            </div>


            {/* HOTEL EXTERIOR */}

            <div className="gallery-item">

              <img
                src={exteriorSideImage}
                alt="IKOR Paradise Exterior"
              />

              <div className="gallery-caption">
                Hotel Exterior
              </div>

            </div>


            {/* HOTEL RECEPTION */}

            <div className="gallery-item">

              <img
                src={receptionImage}
                alt="IKOR Paradise Reception"
              />

              <div className="gallery-caption">
                Hotel Reception
              </div>

            </div>


            {/* DELUXE ROOM - ONLY ONE PHOTO */}

            <div className="gallery-item">

              <img
                src={deluxe1Image}
                alt="IKOR Paradise Deluxe Room"
              />

              <div className="gallery-caption">
                Deluxe Room
              </div>

            </div>


            {/* EXECUTIVE ROOM - ONLY ONE PHOTO */}

            <div className="gallery-item">

              <img
                src={executive1Image}
                alt="IKOR Paradise Executive Room"
              />

              <div className="gallery-caption">
                Executive Room
              </div>

            </div>


            {/* BATHROOM - ACTUAL PHOTO */}

            <div className="gallery-item">

              <img
                src={bathroomRealImage}
                alt="IKOR Paradise Bathroom"
              />

              <div className="gallery-caption">
                Premium Bathroom
              </div>

            </div>


            {/* RESTAURANT */}

            <div className="gallery-item">

              <img
                src={restaurantImage}
                alt="IKOR Paradise Restaurant"
              />

              <div className="gallery-caption">
                Restaurant
              </div>

            </div>


            {/* BANQUET HALL */}

            <div className="gallery-item">

              <img
                src={banquetHallImage}
                alt="IKOR Paradise Banquet Hall"
              />

              <div className="gallery-caption">
                Banquet Hall
              </div>

            </div>


            {/* IKOR PARADISE POSTER */}

            <div className="gallery-item">

              <img
                src={officialPoster}
                alt="IKOR Paradise"
              />

              <div className="gallery-caption">
                IKOR Paradise
              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CONTACT
        ===================================================== */}

        <section
          id="contact"
          className="contact-section"
        >

          <div className="contact-heading">

            <p className="section-small-title">
              GET IN TOUCH
            </p>

            <h2>
              Contact IKOR Paradise
            </h2>

            <p>
              Have a question or planning a stay or celebration?
              Get in touch with our team.
            </p>

          </div>


          <div className="contact-container">


            <div className="contact-card">

              <div className="contact-icon">
                📍
              </div>

              <h3>
                Our Location
              </h3>

              <p>
                Near HP Petrol Pump,
                <br />
                Khair Bypass,
                <br />
                Near Nada Chauraha,
                <br />
                Aligarh
              </p>

              <a
                href="https://www.google.com/maps/search/?api=1&query=IKOR+Paradise+Aligarh"
                target="_blank"
                rel="noreferrer"
              >
                <button>
                  VIEW ON MAP
                </button>
              </a>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                📞
              </div>

              <h3>
                Call Us
              </h3>

              <p>
                +91-8859012000
              </p>

              <a href="tel:+918859012000">
                <button>
                  CALL NOW
                </button>
              </a>

              <a
                href="https://wa.me/918859012000"
                target="_blank"
                rel="noreferrer"
              >
                <button className="whatsapp-btn">
                  WHATSAPP
                </button>
              </a>

            </div>


            <div className="contact-card">

              <div className="contact-icon">
                ✉️
              </div>

              <h3>
                Email Us
              </h3>

              <p>
                ikorparadise@gmail.com
              </p>

              <a href="mailto:ikorparadise@gmail.com">
                <button>
                  SEND EMAIL
                </button>
              </a>

            </div>

          </div>


          {/* CONTACT FORM */}

          <div className="contact-form-wrapper">

            <div className="contact-form-heading">

              <p className="section-small-title">
                SEND AN ENQUIRY
              </p>

              <h3>
                We Would Love To Hear From You
              </h3>

              <p>
                Fill in your details and our team can get back
                to you regarding rooms, restaurant or banquet enquiries.
              </p>

            </div>


            <form
              className="contact-form"
              onSubmit={(e) => {

                e.preventDefault();

                const form = e.target;

                const name = form.querySelector(
                  'input[type="text"]'
                ).value;

                const messageBox = document.createElement("div");

                messageBox.className = "enquiry-success";

                messageBox.innerHTML = `
                  <strong>Thank You, ${name}!</strong>
                  <span>
                    Your enquiry has been received successfully.
                    Our team will contact you shortly.
                  </span>
                `;

                form.appendChild(messageBox);

                form.reset();

                setTimeout(() => {
                  messageBox.remove();
                }, 6000);

              }}
            >

              <div className="form-row">

                <div className="form-group">

                  <label>
                    YOUR NAME
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    placeholder="Enter email address"
                  />

                </div>


                <div className="form-group">

                  <label>
                    ENQUIRY TYPE
                  </label>

                  <select defaultValue="">

                    <option value="" disabled>
                      Select enquiry
                    </option>

                    <option value="room">
                      Room Booking
                    </option>

                    <option value="restaurant">
                      Restaurant
                    </option>

                    <option value="banquet">
                      Banquet Hall
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-group">

                <label>
                  MESSAGE
                </label>

                <textarea
                  rows="5"
                  placeholder="Write your message..."
                ></textarea>

              </div>


              <button
                type="submit"
                className="enquiry-submit"
              >
                SEND ENQUIRY
              </button>

            </form>

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <footer className="footer">

          <div className="footer-content">

            <div className="footer-brand">

              <h2>
                IKOR
              </h2>

              <h3>
                PARADISE
              </h3>

              <p>
                HOTEL • BANQUET • RESTAURANT
              </p>

            </div>


            <div className="footer-links">

              <a href="#home">
                Home
              </a>

              <a href="#about">
                About Us
              </a>

              <a href="#rooms">
                Rooms
              </a>

              <a href="#restaurant">
                Restaurant
              </a>

              <a href="#banquet">
                Banquet
              </a>

              <a href="#gallery">
                Gallery
              </a>

              <a href="#contact">
                Contact
              </a>

            </div>


            <div className="footer-contact">

              <p>
                📞 +91-8859012000
              </p>

              <p>
                ✉️ ikorparadise@gmail.com
              </p>

              <p>
                📍 Aligarh, Uttar Pradesh
              </p>

            </div>

          </div>


          <div className="footer-bottom">

            <p>
              © 2026 IKOR Paradise. All Rights Reserved.
            </p>

            <p>
              Good Food | Great Moments | Forever
            </p>

          </div>

        </footer>

      </main>


      {/* =====================================================
          FLOATING CONTACT BUTTONS
      ===================================================== */}

      <div className="floating-contact">

        <a
          href="tel:+918859012000"
          className="floating-call"
          aria-label="Call IKOR Paradise"
          title="Call IKOR Paradise"
        >
          📞
        </a>


        <a
          href="https://wa.me/918859012000"
          target="_blank"
          rel="noreferrer"
          className="floating-whatsapp"
          aria-label="WhatsApp IKOR Paradise"
          title="WhatsApp IKOR Paradise"
        >
          💬
        </a>

      </div>

    </>
  );
}


/* =========================================================
   APP ROUTING
========================================================= */

function App() {

  return (
    <BrowserRouter>

      <ScrollToTop />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/booking"
          element={<Booking />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;