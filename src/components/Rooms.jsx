import { useState } from "react";
import { Link } from "react-router-dom";
import "./Rooms.css";

import roomImage from "../assets/images/room-deluxe.jpg";
import deluxe1 from "../assets/images/deluxe-1.jpg";
import deluxe2 from "../assets/images/deluxe-2.jpg";
import deluxe3 from "../assets/images/deluxe-3.jpg";

import executive1 from "../assets/images/executive-1.jpg";
import executive2 from "../assets/images/executive-2.jpg";

function Rooms() {
  const rooms = [
    {
      name: "Deluxe Room",
      tariffName: "Pacific",

      price: "₹1,999 Single | ₹2,499 Double",

      images: [deluxe1, deluxe2, deluxe3],

      description:
        "A comfortable and elegant room designed for a relaxing and peaceful stay.",

      features: [
        "King Bed",
        "AC",
        "Free Wi-Fi",
        "24 Hrs Room Service",
      ],

      mealRates: [
        {
          name: "Breakfast",
          rate: "₹2,249 | ₹2,749",
        },
        {
          name: "Dinner",
          rate: "₹2,349 | ₹2,845",
        },
        {
          name: "BF & Dinner",
          rate: "₹2,599 | ₹3,099",
        },
        {
          name: "BF, Lunch & Dinner",
          rate: "₹2,899 | ₹3,300",
        },
      ],
    },

    {
      name: "Executive Room",
      tariffName: "Presidential",

      price: "₹2,499 Single | ₹2,999 Double",

      images: [roomImage, executive1, executive2],

      description:
        "Experience extra comfort and premium facilities in our executive room.",

      features: [
        "King Bed",
        "AC",
        "TV",
        "Free Wi-Fi",
      ],

      mealRates: [
        {
          name: "Breakfast",
          rate: "₹2,749 | ₹3,259",
        },
        {
          name: "Dinner",
          rate: "₹2,849 | ₹3,349",
        },
        {
          name: "BF & Dinner",
          rate: "₹3,099 | ₹3,599",
        },
        {
          name: "BF, Lunch & Dinner",
          rate: "₹3,399 | ₹3,899",
        },
      ],
    },
  ];

  const [activeImages, setActiveImages] = useState({
    0: 0,
    1: 0,
  });

  const changeImage = (roomIndex, direction) => {
    setActiveImages((prev) => {
      const currentIndex = prev[roomIndex] || 0;
      const totalImages = rooms[roomIndex].images.length;

      let newIndex = currentIndex + direction;

      if (newIndex < 0) {
        newIndex = totalImages - 1;
      }

      if (newIndex >= totalImages) {
        newIndex = 0;
      }

      return {
        ...prev,
        [roomIndex]: newIndex,
      };
    });
  };

  const selectImage = (roomIndex, imageIndex) => {
    setActiveImages((prev) => ({
      ...prev,
      [roomIndex]: imageIndex,
    }));
  };

  return (
    <section id="rooms" className="rooms-section">

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

        {rooms.map((room, roomIndex) => {

          const currentImage =
            activeImages[roomIndex] || 0;

          return (
            <div
              className="room-card"
              key={room.name}
            >

              {/* ================= IMAGE GALLERY ================= */}

              <div className="room-image">

                <img
                  src={room.images[currentImage]}
                  alt={`${room.name} ${currentImage + 1}`}
                />

                <div className="room-image-overlay">

                  <span>
                    IKOR PARADISE
                  </span>

                </div>


                {/* LEFT BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    changeImage(roomIndex, -1)
                  }
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0, 0, 0, 0.55)",
                    color: "#fff",
                    fontSize: "22px",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                  aria-label="Previous room photo"
                >
                  ‹
                </button>


                {/* RIGHT BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    changeImage(roomIndex, 1)
                  }
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "38px",
                    height: "38px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(0, 0, 0, 0.55)",
                    color: "#fff",
                    fontSize: "22px",
                    cursor: "pointer",
                    zIndex: 5,
                  }}
                  aria-label="Next room photo"
                >
                  ›
                </button>


                {/* DOTS */}

                <div
                  style={{
                    position: "absolute",
                    bottom: "15px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    display: "flex",
                    gap: "8px",
                    zIndex: 5,
                  }}
                >

                  {room.images.map((_, imageIndex) => (

                    <button
                      key={imageIndex}
                      type="button"
                      onClick={() =>
                        selectImage(
                          roomIndex,
                          imageIndex
                        )
                      }
                      aria-label={`View photo ${imageIndex + 1}`}
                      style={{
                        width:
                          currentImage === imageIndex
                            ? "22px"
                            : "9px",
                        height: "9px",
                        padding: 0,
                        border: "none",
                        borderRadius: "10px",
                        background:
                          currentImage === imageIndex
                            ? "#ffffff"
                            : "rgba(255,255,255,0.55)",
                        cursor: "pointer",
                        transition: "0.3s",
                      }}
                    />

                  ))}

                </div>

              </div>


              {/* ================= CONTENT ================= */}

              <div className="room-content">

                <h3>
                  {room.name}
                </h3>

                <p className="room-description">
                  {room.description}
                </p>


                {/* ================= FEATURES ================= */}

                <div className="room-features">

                  {room.features.map(
                    (feature, featureIndex) => (

                      <span key={featureIndex}>
                        ✓ {feature}
                      </span>

                    )
                  )}

                </div>


                {/* ================= ROOM RATE ================= */}

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


                {/* ================= MEAL TARIFF ================= */}

                <div
                  style={{
                    marginTop: "28px",
                    paddingTop: "24px",
                    borderTop: "1px solid #eadfcf",
                  }}
                >

                  <h4
                    style={{
                      margin: "0 0 8px",
                      fontSize: "16px",
                      color: "#8b6327",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    Tariff with Meals
                  </h4>

                  <p
                    style={{
                      margin: "0 0 18px",
                      fontSize: "12px",
                      color: "#777",
                    }}
                  >
                    Single | Double
                  </p>


                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0",
                    }}
                  >

                    {room.mealRates.map(
                      (meal, mealIndex) => (

                        <div
                          key={meal.name}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "15px",
                            padding: "11px 0",
                            borderBottom:
                              mealIndex !==
                              room.mealRates.length - 1
                                ? "1px solid #eee4d5"
                                : "none",
                          }}
                        >

                          <span
                            style={{
                              fontSize: "13px",
                              color: "#5f5143",
                            }}
                          >
                            {meal.name}
                          </span>

                          <strong
                            style={{
                              fontSize: "13px",
                              color: "#b88935",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {meal.rate}
                          </strong>

                        </div>

                      )
                    )}

                  </div>

                </div>


                {/* ================= EXTRA BED ================= */}

                <div
                  style={{
                    marginTop: "20px",
                    padding: "14px 16px",
                    background: "#faf6ef",
                    borderLeft: "3px solid #b88935",
                  }}
                >

                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#5f5143",
                    }}
                  >
                    <strong>
                      Extra Bed / Extra Pax:
                    </strong>{" "}
                    ₹700
                  </p>

                  <p
                    style={{
                      margin: "6px 0 0",
                      fontSize: "12px",
                      color: "#777",
                    }}
                  >
                    Taxes as Applicable*
                  </p>

                </div>

              </div>

            </div>
          );

        })}

      </div>


      {/* ================= FACILITIES ================= */}

      <div
        style={{
          maxWidth: "1100px",
          margin: "70px auto 0",
          padding: "45px 30px",
          background: "#faf7f1",
          borderTop: "1px solid #eadfcf",
          borderBottom: "1px solid #eadfcf",
        }}
      >

        <div
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >

          <p
            style={{
              margin: "0 0 8px",
              fontSize: "11px",
              letterSpacing: "3px",
              color: "#b88935",
              fontWeight: "700",
            }}
          >
            COMFORT & CONVENIENCE
          </p>

          <h3
            style={{
              margin: 0,
              fontFamily: "Georgia, serif",
              fontSize: "30px",
              fontWeight: "500",
              color: "#3d2b1f",
            }}
          >
            Room Facilities
          </h3>

        </div>


        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "20px 50px",
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>24 Hrs. Room Service</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>Conference Hall</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>Splendid Interiors</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>24 Hrs. Power Backup</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>Clean Bath</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>Valvet Parking</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>LED with Wi-Fi</span>
          </div>


          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#5f5143",
              fontSize: "14px",
            }}
          >
            <span>✓</span>
            <span>Free Wi-Fi</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Rooms;