import { Link } from "react-router-dom";
import "./Rooms.css";

import roomImage from "../assets/images/room-deluxe.jpg";
import bathroomImage from "../assets/images/bathroom.jpg";

function Rooms() {
  const rooms = [
    {
      name: "Deluxe Room",
      price: "Contact for Price",
      image: roomImage,
      description:
        "A comfortable and elegant room designed for a relaxing and peaceful stay.",
      features: [
        "King Bed",
        "AC",
        "Free Wi-Fi",
        "Room Service",
      ],
    },
    {
      name: "Executive Room",
      price: "Contact for Price",
      image: roomImage,
      description:
        "Experience extra comfort and premium facilities in our executive room.",
      features: [
        "King Bed",
        "AC",
        "TV",
        "Breakfast",
      ],
    },
    {
      name: "Family Room",
      price: "Contact for Price",
      image: roomImage,
      description:
        "A spacious room perfect for families, offering comfort and convenience.",
      features: [
        "Large Space",
        "AC",
        "Free Wi-Fi",
        "Breakfast",
      ],
    },
  ];

  return (
    <section
      id="rooms"
      className="rooms-section"
    >

      {/* ================= HEADING ================= */}

      <div className="rooms-heading">

        <p className="section-small-title">
          STAY WITH US
        </p>

        <h2>
          Our Rooms
        </h2>

        <p>
          Comfortable rooms, elegant interiors and everything you need
          for a memorable stay at IKOR Paradise.
        </p>

      </div>


      {/* ================= ROOMS ================= */}

      <div className="rooms-container">

        {rooms.map((room, index) => (

          <div
            className="room-card"
            key={index}
          >

            {/* IMAGE */}

            <div className="room-image">

              <img
                src={room.image}
                alt={room.name}
              />

              <div className="room-image-overlay">

                <span>
                  IKOR PARADISE
                </span>

              </div>

            </div>


            {/* CONTENT */}

            <div className="room-content">

              <h3>
                {room.name}
              </h3>

              <p className="room-description">
                {room.description}
              </p>


              {/* FEATURES */}

              <div className="room-features">

                {room.features.map(
                  (feature, featureIndex) => (

                    <span key={featureIndex}>
                      ✓ {feature}
                    </span>

                  )
                )}

              </div>


              {/* BOTTOM */}

              <div className="room-bottom">

                <div>

                  <small>
                    Room Rate
                  </small>

                  <strong>
                    {room.price}
                  </strong>

                </div>


                <Link
                  to="/booking"
                  state={{
                    bookingData: {
                      roomType: room.name,
                    },
                  }}
                  className="room-book-link"
                >

                  <button>
                    BOOK NOW
                  </button>

                </Link>

              </div>

            </div>

          </div>

        ))}

      </div>


      {/* ================= EXTRA IMAGE ================= */}

      <div className="room-extra-image">

        <img
          src={bathroomImage}
          alt="IKOR Paradise Bathroom"
        />

        <div>

          <p className="section-small-title">
            COMFORT & QUALITY
          </p>

          <h3>
            Designed For Your Comfort
          </h3>

          <p>
            Enjoy clean, modern and comfortable spaces with
            thoughtful facilities for a pleasant stay.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Rooms;