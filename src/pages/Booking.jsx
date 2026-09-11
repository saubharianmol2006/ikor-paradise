import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();

  const passedBookingData = location.state?.bookingData;

  const [bookingData, setBookingData] = useState({
    checkIn: passedBookingData?.checkIn || "",
    checkOut: passedBookingData?.checkOut || "",
    adults: passedBookingData?.adults || "2",
    children: passedBookingData?.children || "0",
    roomType: passedBookingData?.roomType || "Deluxe Room",
    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });

  const [message, setMessage] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();

    currentDate.setHours(0, 0, 0, 0);

    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);

    if (checkInDate < currentDate) {
      setMessage("Please select a valid check-in date.");
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

      {/* ================= HEADER ================= */}

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


      {/* ================= MAIN CONTAINER ================= */}

      <div className="booking-page-container">

        {/* ================= BOOKING FORM ================= */}

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          {/* ================= STAY DETAILS ================= */}

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
                  Select your preferred dates and room.
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

              <div className="booking-form-group full-width">

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

                  <option value="Family Room">
                    Family Room
                  </option>

                </select>

              </div>

            </div>

          </div>


          {/* ================= GUEST DETAILS ================= */}

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


          {/* ================= SPECIAL REQUEST ================= */}

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


          {/* ================= SUCCESS / ERROR MESSAGE ================= */}

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


          {/* ================= SUBMIT AREA ================= */}

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


        {/* ================= RIGHT SIDE ================= */}

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