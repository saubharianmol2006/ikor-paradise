import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-overlay">
        <div className="hero-content">

          <p className="hero-small-text">
            WELCOME TO
          </p>

          <h1>
            IKOR <span>PARADISE</span>
          </h1>

          <p className="hero-description">
            Hotel & Banquet • Restaurant
          </p>

          <p className="hero-tagline">
            Good Food | Great Moments | Forever
          </p>

          <div className="hero-buttons">
            <button className="hero-primary-btn">
              Book Your Stay
            </button>

            <button className="hero-secondary-btn">
              Explore Rooms
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
