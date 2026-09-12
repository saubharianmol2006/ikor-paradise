import "./Gallery.css";

import banquetHall from "../assets/images/banquet-hall.jpg";
import entrance from "../assets/images/entrance.jpg";
import exteriorSide from "../assets/images/exterior-side.jpg";
import reception from "../assets/images/reception.jpg";
import restaurant from "../assets/images/restaurant-interior.jpg";
import room from "../assets/images/room-deluxe.jpg";

import deluxe1 from "../assets/images/deluxe-1.jpg.jpeg";
import deluxe2 from "../assets/images/deluxe-2.jpg.jpeg";
import deluxe3 from "../assets/images/deluxe-3.jpg.jpeg";

import executive1 from "../assets/images/executive-1.jpg.jpeg";
import executive2 from "../assets/images/executive-2.jpg.jpeg";

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
      title: "Deluxe Room",
    },
    {
      src: deluxe1,
      title: "Deluxe Room",
    },
    {
      src: deluxe2,
      title: "Deluxe Room",
    },
    {
      src: deluxe3,
      title: "Deluxe Room",
    },
    {
      src: executive1,
      title: "Executive Room",
    },
    {
      src: executive2,
      title: "Executive Room",
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
    <section
      className="gallery-section"
      id="gallery"
    >
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