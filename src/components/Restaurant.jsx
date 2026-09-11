import { useState } from "react";
import "./Restaurant.css";
import restaurantImage from "../assets/images/restaurant-interior.jpg";

function Restaurant() {
  const [showMenu, setShowMenu] = useState(false);

  const menuItems = [
    {
      category: "STARTERS",
      items: [
        {
          name: "Paneer Tikka",
          description:
            "Soft paneer cubes marinated with aromatic spices and grilled to perfection.",
          price: "₹280",
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
          price: "₹320",
        },
        {
          name: "Dal Makhani",
          description:
            "Slow-cooked black lentils finished with butter and cream.",
          price: "₹260",
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
          price: "₹280",
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
          price: "₹60",
        },
      ],
    },
  ];

  return (
    <section id="restaurant" className="restaurant-section">

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

        <button
          type="button"
          onClick={() => setShowMenu(true)}
        >
          VIEW FULL MENU
        </button>

      </div>


      {/* ================= FULL MENU MODAL ================= */}

      {showMenu && (

        <div
          className="menu-modal-overlay"
          onClick={() => setShowMenu(false)}
        >

          <div
            className="menu-modal"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="menu-modal-header">

              <div>

                <p className="section-small-title">
                  IKOR PARADISE
                </p>

                <h2>
                  Restaurant Menu
                </h2>

                <p>
                  HOTEL • BANQUET • RESTAURANT
                </p>

              </div>

              <button
                type="button"
                className="menu-close-btn"
                onClick={() => setShowMenu(false)}
                aria-label="Close menu"
              >
                ✕
              </button>

            </div>


            {/* MENU LIST */}

            <div className="menu-modal-content">

              {menuItems.map((menu, index) => (

                <div
                  className="modal-menu-category"
                  key={index}
                >

                  <h3>
                    {menu.category}
                  </h3>

                  {menu.items.map((item, itemIndex) => (

                    <div
                      className="modal-menu-item"
                      key={itemIndex}
                    >

                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          {item.description}
                        </p>

                      </div>

                      <strong>
                        {item.price}
                      </strong>

                    </div>

                  ))}

                </div>

              ))}

            </div>


            {/* FOOTER */}

            <div className="menu-modal-footer">

              <p>
                For today's menu, special requests or table
                enquiries, please contact us.
              </p>

              <a href="tel:+918859012000">
                📞 +91-8859012000
              </a>

            </div>

          </div>

        </div>

      )}

    </section>
  );
}

export default Restaurant;