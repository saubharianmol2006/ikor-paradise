import "./Restaurant.css";
import restaurantImage from "../assets/images/restaurant-interior.jpg";

function Restaurant() {
  const menuItems = [
    {
      category: "STARTERS",
      items: [
        {
          name: "Paneer Tikka",
          description:
            "Soft paneer cubes marinated with aromatic spices and grilled to perfection.",
          price: "₹300",
        },
        {
          name: "Veg Spring Roll",
          description:
            "Crispy rolls filled with fresh vegetables and served with dip.",
          price: "₹220",
        },
        {
          name: "Chicken Tikka",
          description:
            "Tender chicken pieces marinated in Indian spices and grilled.",
          price: "₹340",
        },
      ],
    },

    {
      category: "MAIN COURSE",
      items: [
        {
          name: "Paneer Butter Masala",
          description:
            "Rich and creamy tomato gravy with soft paneer and aromatic spices.",
          price: "₹310",
        },
        {
          name: "Dal Makhani",
          description:
            "Slow-cooked black lentils finished with butter and cream.",
          price: "₹229",
        },
        {
          name: "Chicken Curry",
          description:
            "Traditional Indian chicken curry prepared with authentic spices.",
          price: "₹380",
        },
      ],
    },

    {
      category: "RICE & BREAD",
      items: [
        {
          name: "Veg Biryani",
          description:
            "Fragrant basmati rice cooked with vegetables and traditional spices.",
          price: "₹250",
        },
        {
          name: "Chicken Biryani",
          description:
            "Aromatic basmati rice layered with tender chicken and rich spices.",
          price: "₹360",
        },
        {
          name: "Butter Naan",
          description:
            "Soft tandoori naan finished with a touch of butter.",
          price: "₹90",
        },
      ],
    },
  ];

  return (
    <section
      id="restaurant"
      className="restaurant-section"
    >

      {/* ================= HEADING ================= */}

      <div className="restaurant-heading">

        <p className="section-small-title">
          TASTE THE DIFFERENCE
        </p>

        <h2>
          Our Restaurant
        </h2>

        <p>
          Delicious food, warm hospitality and memorable dining
          experiences — all under one roof at IKOR Paradise.
        </p>

      </div>


      {/* ================= RESTAURANT CONTENT ================= */}

      <div className="restaurant-content">

        {/* ================= IMAGE ================= */}

        <div className="restaurant-intro">

          <div className="restaurant-image-box">

            <img
              src={restaurantImage}
              alt="IKOR Paradise Restaurant"
            />

            <div className="restaurant-image-overlay">

              <span>
                IKOR
              </span>

              <strong>
                PARADISE
              </strong>

              <p>
                HOTEL • BANQUET • RESTAURANT
              </p>

            </div>

          </div>

        </div>


        {/* ================= MENU ================= */}

        <div className="menu-container">

          {menuItems.map((menu, index) => (

            <div
              className="menu-category"
              key={index}
            >

              <h3>
                {menu.category}
              </h3>

              <div className="menu-items">

                {menu.items.map((item, itemIndex) => (

                  <div
                    className="menu-item"
                    key={itemIndex}
                  >

                    <div className="menu-item-info">

                      <h4>
                        {item.name}
                      </h4>

                      <p>
                        {item.description}
                      </p>

                    </div>

                    <div className="menu-price">
                      {item.price}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ================= BOTTOM ================= */}

      <div className="restaurant-bottom">

        <p>
          Experience authentic flavours and quality ingredients
          at IKOR Paradise Restaurant.
        </p>


        {/* ================= FULL MENU PDF ================= */}

       <button
  type="button"
  className="restaurant-menu-link"
  onClick={() => {
    window.open("/Menu%20Ikor%20Paradise.pdf", "_blank");
  }}
  style={{
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "15px 32px",
    background: "#b88935",
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.8px",
    border: "1px solid #b88935",
    borderRadius: "2px",
    boxShadow:
      "0 6px 18px rgba(0, 0, 0, 0.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }}
>
  VIEW FULL MENU
</button>

      </div>

    </section>
  );
}

export default Restaurant;