import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const passedBookingData = location.state?.bookingData;

  const [bookingData, setBookingData] = useState({
    checkIn: passedBookingData?.checkIn || "",
    checkOut: passedBookingData?.checkOut || "",
    adults: passedBookingData?.adults || "2",
    children: passedBookingData?.children || "0",

    roomType: passedBookingData?.roomType || "Deluxe Room",

    occupancy: "Double",
    mealPlan: "Room Only",

    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });

  const [message, setMessage] = useState("");

  /*
    IMPORTANT:
    Book Now se aayi Router state ko use karne ke baad
    history state clear kar dete hain.

    Isse browser refresh karne par purani booking details
    dobara automatically nahi aayengi.
  */
  useEffect(() => {
    if (location.state?.bookingData) {
      navigate(location.pathname, {
        replace: true,
        state: null,
      });
    }
  }, [location, navigate]);

  const today = new Date().toISOString().split("T")[0];

  /* =====================================================
     ROOM TARIFF
  ===================================================== */

  const roomRates = {
    "Deluxe Room": {
      Single: {
        "Room Only": 1999,
        Breakfast: 2249,
        Dinner: 2349,
        "BF & Dinner": 2599,
        "BF, Lunch & Dinner": 2899,
      },

      Double: {
        "Room Only": 2499,
        Breakfast: 2749,
        Dinner: 2845,
        "BF & Dinner": 3099,
        "BF, Lunch & Dinner": 3300,
      },
    },

    "Executive Room": {
      Single: {
        "Room Only": 2499,
        Breakfast: 2749,
        Dinner: 2849,
        "BF & Dinner": 3099,
        "BF, Lunch & Dinner": 3399,
      },

      Double: {
        "Room Only": 2999,
        Breakfast: 3259,
        Dinner: 3349,
        "BF & Dinner": 3599,
        "BF, Lunch & Dinner": 3899,
      },
    },
  };

  const currentRate =
    roomRates[bookingData.roomType]?.[bookingData.occupancy]?.[
      bookingData.mealPlan
    ] || 0;

  /* =====================================================
     DATE CALCULATION
  ===================================================== */

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      return 0;
    }

    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);

    const difference =
      checkOut.getTime() - checkIn.getTime();

    const nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();

  const roomTotal = currentRate * nights;

  const totalAmount = roomTotal;

  /* =====================================================
     HANDLE CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  /* =====================================================
     SUBMIT
  ===================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    const checkInDate = new Date(
      bookingData.checkIn
    );

    const checkOutDate = new Date(
      bookingData.checkOut
    );

    if (checkInDate < currentDate) {
      setMessage(
        "Please select a valid check-in date."
      );
      return;
    }

    if (checkOutDate <= checkInDate) {
      setMessage(
        "Check-out date must be after check-in date."
      );
      return;
    }

    if (bookingData.phone.length !== 10) {
      setMessage(
        "Please enter a valid 10 digit phone number."
      );
      return;
    }

    setMessage(
      `Thank you ${bookingData.name}! Your booking request has been received. Our team will contact you shortly.`
    );
  };

  return (
    <div className="booking-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="booking-page-header">

        <Link
          to="/"
          className="booking-back-link"
        >
          ← Back to IKOR Paradise
        </Link>

        <p className="booking-small-title">
          IKOR PARADISE
        </p>

        <h1>
          Book Your Stay
        </h1>

        <p>
          Experience comfortable rooms, warm hospitality and
          memorable moments at IKOR Paradise.
        </p>

      </div>


      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}

      <div className="booking-page-container">

        {/* =====================================================
            BOOKING FORM
        ===================================================== */}

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          {/* =====================================================
              01 STAY DETAILS
          ===================================================== */}

          <div className="form-section">

            <div className="form-section-title">

              <span>
                01
              </span>

              <div>

                <h2>
                  Stay Details
                </h2>

                <p>
                  Select your preferred dates, room and meal plan.
                </p>

              </div>

            </div>


            <div className="booking-form-grid">

              {/* CHECK IN */}

              <div className="booking-form-group">

                <label>
                  CHECK IN
                </label>

                <input
                  type="date"
                  name="checkIn"
                  value={bookingData.checkIn}
                  min={today}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* CHECK OUT */}

              <div className="booking-form-group">

                <label>
                  CHECK OUT
                </label>

                <input
                  type="date"
                  name="checkOut"
                  value={bookingData.checkOut}
                  min={
                    bookingData.checkIn || today
                  }
                  onChange={handleChange}
                  required
                />

              </div>


              {/* ADULTS */}

              <div className="booking-form-group">

                <label>
                  ADULTS
                </label>

                <select
                  name="adults"
                  value={bookingData.adults}
                  onChange={handleChange}
                >

                  <option value="1">
                    1 Adult
                  </option>

                  <option value="2">
                    2 Adults
                  </option>

                  <option value="3">
                    3 Adults
                  </option>

                  <option value="4">
                    4 Adults
                  </option>

                  <option value="5">
                    5 Adults
                  </option>

                  <option value="6">
                    6 Adults
                  </option>

                </select>

              </div>


              {/* CHILDREN */}

              <div className="booking-form-group">

                <label>
                  CHILDREN
                </label>

                <select
                  name="children"
                  value={bookingData.children}
                  onChange={handleChange}
                >

                  <option value="0">
                    No Children
                  </option>

                  <option value="1">
                    1 Child
                  </option>

                  <option value="2">
                    2 Children
                  </option>

                  <option value="3">
                    3 Children
                  </option>

                  <option value="4">
                    4 Children
                  </option>

                </select>

              </div>


              {/* ROOM TYPE */}

              <div className="booking-form-group">

                <label>
                  ROOM TYPE
                </label>

                <select
                  name="roomType"
                  value={bookingData.roomType}
                  onChange={handleChange}
                >

                  <option value="Deluxe Room">
                    Deluxe Room
                  </option>

                  <option value="Executive Room">
                    Executive Room
                  </option>

                </select>

              </div>


              {/* OCCUPANCY */}

              <div className="booking-form-group">

                <label>
                  OCCUPANCY
                </label>

                <select
                  name="occupancy"
                  value={bookingData.occupancy}
                  onChange={handleChange}
                >

                  <option value="Single">
                    Single
                  </option>

                  <option value="Double">
                    Double
                  </option>

                </select>

              </div>


              {/* MEAL PLAN */}

              <div className="booking-form-group full-width">

                <label>
                  MEAL PLAN
                </label>

                <select
                  name="mealPlan"
                  value={bookingData.mealPlan}
                  onChange={handleChange}
                >

                  <option value="Room Only">
                    Room Only
                  </option>

                  <option value="Breakfast">
                    Breakfast
                  </option>

                  <option value="Dinner">
                    Dinner
                  </option>

                  <option value="BF & Dinner">
                    Breakfast & Dinner
                  </option>

                  <option value="BF, Lunch & Dinner">
                    Breakfast, Lunch & Dinner
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* =====================================================
              CURRENT RATE
          ===================================================== */}

          <div
            style={{
              marginBottom: "30px",
              padding: "24px",
              background: "#faf7f1",
              border: "1px solid #eadfcf",
            }}
          >

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >

              <div>

                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: "11px",
                    letterSpacing: "1.5px",
                    color: "#8b6327",
                    fontWeight: "700",
                    textTransform: "uppercase",
                  }}
                >
                  Selected Rate
                </p>

                <h3
                  style={{
                    margin: 0,
                    fontFamily: "Georgia, serif",
                    fontSize: "24px",
                    color: "#3d2b1f",
                  }}
                >
                  {bookingData.roomType}
                </h3>

                <p
                  style={{
                    margin: "7px 0 0",
                    fontSize: "13px",
                    color: "#777",
                  }}
                >
                  {bookingData.occupancy} •{" "}
                  {bookingData.mealPlan}
                </p>

              </div>


              <div
                style={{
                  textAlign: "right",
                }}
              >

                <small
                  style={{
                    display: "block",
                    color: "#777",
                    fontSize: "11px",
                    marginBottom: "4px",
                  }}
                >
                  PER NIGHT
                </small>

                <strong
                  style={{
                    fontSize: "25px",
                    color: "#b88935",
                  }}
                >
                  ₹{currentRate.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            {/* TOTAL */}

            {nights > 0 && (
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "18px",
                  borderTop: "1px solid #e5d9c7",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >

                <div>

                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: "#777",
                    }}
                  >
                    {nights}{" "}
                    {nights === 1
                      ? "Night"
                      : "Nights"}
                  </span>

                  <strong
                    style={{
                      fontSize: "15px",
                      color: "#4d3b2e",
                    }}
                  >
                    Estimated Room Total
                  </strong>

                </div>


                <strong
                  style={{
                    fontSize: "22px",
                    color: "#b88935",
                  }}
                >
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>

              </div>
            )}

          </div>


          {/* =====================================================
              02 GUEST DETAILS
          ===================================================== */}

          <div className="form-section">

            <div className="form-section-title">

              <span>
                02
              </span>

              <div>

                <h2>
                  Guest Details
                </h2>

                <p>
                  Please provide your contact information.
                </p>

              </div>

            </div>


            <div className="booking-form-grid">

              {/* NAME */}

              <div className="booking-form-group">

                <label>
                  FULL NAME
                </label>

                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />

              </div>


              {/* PHONE */}

              <div className="booking-form-group">

                <label>
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleChange}
                  placeholder="Enter 10 digit phone number"
                  maxLength="10"
                  inputMode="numeric"
                  required
                />

              </div>


              {/* EMAIL */}

              <div className="booking-form-group full-width">

                <label>
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />

              </div>

            </div>

          </div>


          {/* =====================================================
              03 SPECIAL REQUEST
          ===================================================== */}

          <div className="form-section">

            <div className="form-section-title">

              <span>
                03
              </span>

              <div>

                <h2>
                  Special Request
                </h2>

                <p>
                  Let us know if you have any special requirements.
                </p>

              </div>

            </div>


            <div className="booking-form-group">

              <label>
                MESSAGE
              </label>

              <textarea
                name="specialRequest"
                value={bookingData.specialRequest}
                onChange={handleChange}
                placeholder="Example: Early check-in, extra bed, birthday arrangement..."
                rows="5"
              ></textarea>

            </div>

          </div>


          {/* =====================================================
              BOOKING SUMMARY
          ===================================================== */}

          <div
            style={{
              padding: "25px",
              marginBottom: "30px",
              background: "#3d2b1f",
              color: "#fff",
            }}
          >

            <p
              style={{
                margin: "0 0 15px",
                fontSize: "11px",
                letterSpacing: "2px",
                color: "#d7b36a",
                fontWeight: "700",
              }}
            >
              BOOKING SUMMARY
            </p>


            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(2, minmax(0, 1fr))",
                gap: "14px 30px",
              }}
            >

              <div>

                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    opacity: 0.7,
                  }}
                >
                  ROOM
                </span>

                <strong>
                  {bookingData.roomType}
                </strong>

              </div>


              <div>

                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    opacity: 0.7,
                  }}
                >
                  OCCUPANCY
                </span>

                <strong>
                  {bookingData.occupancy}
                </strong>

              </div>


              <div>

                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    opacity: 0.7,
                  }}
                >
                  MEAL PLAN
                </span>

                <strong>
                  {bookingData.mealPlan}
                </strong>

              </div>


              <div>

                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    opacity: 0.7,
                  }}
                >
                  RATE / NIGHT
                </span>

                <strong>
                  ₹{currentRate.toLocaleString("en-IN")}
                </strong>

              </div>

            </div>


            {nights > 0 && (
              <div
                style={{
                  marginTop: "22px",
                  paddingTop: "18px",
                  borderTop:
                    "1px solid rgba(255,255,255,0.18)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >

                <span>
                  Total for {nights}{" "}
                  {nights === 1
                    ? "night"
                    : "nights"}
                </span>

                <strong
                  style={{
                    fontSize: "23px",
                    color: "#d7b36a",
                  }}
                >
                  ₹{totalAmount.toLocaleString("en-IN")}
                </strong>

              </div>
            )}

          </div>


          {/* =====================================================
              SUCCESS / ERROR MESSAGE
          ===================================================== */}

          {message && (
            <div
              className={
                message.startsWith("Thank you")
                  ? "booking-message success"
                  : "booking-message error"
              }
            >
              {message}
            </div>
          )}


          {/* =====================================================
              SUBMIT AREA
          ===================================================== */}

          <div className="booking-submit-area">

            <div>

              <p>
                Need help with your booking?
              </p>

              <a href="tel:+918859012000">
                +91-8859012000
              </a>

            </div>


            <button
              type="submit"
              className="booking-submit-btn"
            >
              REQUEST BOOKING
            </button>

          </div>

        </form>


        {/* =====================================================
            RIGHT SIDE
        ===================================================== */}

        <aside className="booking-info">

          {/* INFO CARD */}

          <div className="booking-info-card">

            <p className="booking-small-title">
              IKOR PARADISE
            </p>

            <h2>
              Your Comfort,
              <br />
              Our Priority
            </h2>

            <p>
              Enjoy a comfortable stay with thoughtful facilities,
              delicious dining and warm hospitality.
            </p>


            <div className="booking-info-list">

              <div>

                <span>
                  ✓
                </span>

                <p>
                  Comfortable Rooms
                </p>

              </div>


              <div>

                <span>
                  ✓
                </span>

                <p>
                  Restaurant Available
                </p>

              </div>


              <div>

                <span>
                  ✓
                </span>

                <p>
                  Banquet Hall
                </p>

              </div>


              <div>

                <span>
                  ✓
                </span>

                <p>
                  Parking Facility
                </p>

              </div>

            </div>


            <a
              href="tel:+918859012000"
              className="booking-call-btn"
            >
              CALL FOR ASSISTANCE
            </a>

          </div>


          {/* ADDRESS CARD */}

          <div className="booking-contact-card">

            <h3>
              Visit Us
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

          </div>


          {/* QUESTIONS CARD */}

          <div className="booking-contact-card booking-contact-highlight">

            <h3>
              Have Questions?
            </h3>

            <p>
              Our team is available to help you with
              room bookings, restaurant and banquet enquiries.
            </p>

            <a href="tel:+918859012000">
              📞 +91-8859012000
            </a>

          </div>

        </aside>

      </div>

    </div>
  );
}

export default Booking;