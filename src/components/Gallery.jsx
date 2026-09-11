import "./Gallery.css";

import banquetHall from "../assets/images/banquet-hall.jpg";
import entrance from "../assets/images/entrance.jpg";
import exteriorSide from "../assets/images/exterior-side.jpg";
import reception from "../assets/images/reception.jpg";
import restaurant from "../assets/images/restaurant-interior.jpg";
import room from "../assets/images/room-deluxe.jpg";

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

        <div className="gallery-heading">
          <span className="section-subtitle">OUR GALLERY</span>

          <h2>Take a Look at IKOR Paradise</h2>

          <p>
            Explore our rooms, restaurant, banquet hall and beautiful
            surroundings.
          </p>
        </div>

        <div className="gallery-grid">
          {images.map((image, index) => (
            <div className="gallery-item" key={index}>
              <img src={image.src} alt={image.title} />

              <div className="gallery-overlay">
                <h3>{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Gallery;