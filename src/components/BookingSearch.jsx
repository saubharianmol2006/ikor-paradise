import { useState } from "react";
import { Link } from "react-router-dom";

function BookingSearch() {
  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const today = new Date().toISOString().split("T")[0];

  const handleCheck = (e) => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      e.preventDefault();

      setError("Please select your check-in and check-out dates.");

      return;
    }

    if (bookingData.checkOut <= bookingData.checkIn) {
      e.preventDefault();

      setError("Check-out date must be after check-in date.");

      return;
    }
  };

  return (
    <div className="booking-box">

      {/* CHECK IN */}

      <div className="booking-field">

        <label>
          CHECK IN
        </label>

        <input
          type="date"
          name="checkIn"
          value={bookingData.checkIn}
          min={today}
          onChange={handleChange}
        />

      </div>


      {/* CHECK OUT */}

      <div className="booking-field">

        <label>
          CHECK OUT
        </label>

        <input
          type="date"
          name="checkOut"
          value={bookingData.checkOut}
          min={bookingData.checkIn || today}
          onChange={handleChange}
        />

      </div>


      {/* ADULTS */}

      <div className="booking-field">

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

      <div className="booking-field">

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


      {/* BUTTON */}

      <Link
        to="/booking"
        state={{ bookingData }}
        className="availability-link"
        onClick={handleCheck}
      >

        <button
          type="button"
          className="availability-btn"
        >
          CHECK AVAILABILITY
        </button>

      </Link>


      {/* ERROR */}

      {error && (
        <p className="booking-search-error">
          {error}
        </p>
      )}

    </div>
  );
}

export default BookingSearch;