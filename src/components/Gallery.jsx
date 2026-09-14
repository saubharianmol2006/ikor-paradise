import "./Gallery.css";

import banquetHall from "../assets/images/banquet-hall.jpg";
import entrance from "../assets/images/entrance.jpg";
import exteriorSide from "../assets/images/exterior-side.jpg";
import reception from "../assets/images/reception.jpg";
import restaurant from "../assets/images/restaurant-interior.jpg";
import room from "../assets/images/room-deluxe.jpg";

import deluxe1 from "../assets/images/deluxe-1.jpg";
import deluxe2 from "../assets/images/deluxe-2.jpg";
import deluxe3 from "../assets/images/deluxe-3.jpg";

import executive1 from "../assets/images/executive-1.jpg";
import executive2 from "../assets/images/executive-2.jpg";

function Gallery() {
  const images = [
    {
      src: entrance,
      title: "Hotel Entrance",
    },
    {
      src: exteriorSide,
      title: "IKOR Paradise Exterior",
    },
    {
      src: reception,
      title: "Hotel Reception",
    },
    {
      src: room,
      title: "PACIFIC",
    },
    {
      src: deluxe1,
      title: "PACIFIC",
    },
    {
      src: deluxe2,
      title: "PACIFIC",
    },
    {
      src: deluxe3,
      title: "PACIFIC",
    },
    {
      src: executive1,
      title: "PRESIDENTIAL",
    },
    {
      src: executive2,
      title: "PRESIDENTIAL",
    },
    {
      src: restaurant,
      title: "Restaurant",
    },
    {
      src: banquetHall,
      title: "Banquet Hall",
    },
  ];

  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">

        {/* ================= HEADING ================= */}

        <div className="gallery-heading">
          <span className="section-subtitle">
            OUR GALLERY
          </span>

          <h2>
            Take a Look at IKOR Paradise
          </h2>

          <p>
            Explore our rooms, restaurant, banquet hall and beautiful
            surroundings.
          </p>
        </div>

        {/* ================= GALLERY ================= */}

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              className="gallery-item"
              key={index}
            >
              <img
                src={image.src}
                alt={image.title}
              />

              <div className="gallery-overlay">
                <h3>
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Gallery;
