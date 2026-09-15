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

    roomType: passedBookingData?.roomType || "Pacific",

    occupancy: "Double",
    mealPlan: "Room Only",

    name: "",
    phone: "",
    email: "",
    specialRequest: "",
  });

  const [message, setMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
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

  // Load Razorpay Standard Checkout script once
  useEffect(() => {
    if (window.Razorpay) return;

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => {
      console.log("Razorpay Checkout loaded successfully.");
    };

    script.onerror = () => {
      console.error("Unable to load Razorpay Checkout.");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const today = new Date().toISOString().split("T")[0];

  /* =====================================================
     ROOM TARIFF
  ===================================================== */

  const roomRates = {
    Pacific: {
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

    Presidential: {
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
     OCCUPANCY CHANGE
  ===================================================== */

  const handleOccupancyChange = (e) => {
    const value = e.target.value;

    setBookingData((prev) => ({
      ...prev,
      occupancy: value,
      adults: value === "Single" ? "1" : "2",
      children: value === "Single" ? "0" : prev.children,
    }));

    setMessage("");
  };

  /* =====================================================
     SUBMIT BOOKING
  ===================================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const checkInDate = new Date(bookingData.checkIn);
    const checkOutDate = new Date(bookingData.checkOut);

    /* CHECK-IN VALIDATION */

    if (
      !bookingData.checkIn ||
      Number.isNaN(checkInDate.getTime())
    ) {
      setMessage("Please select a valid check-in date.");
      return;
    }

    if (checkInDate < currentDate) {
      setMessage("Please select a valid check-in date.");
      return;
    }

    /* CHECK-OUT VALIDATION */

    if (
      !bookingData.checkOut ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      setMessage("Please select a valid check-out date.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setMessage(
        "Check-out date must be after check-in date."
      );
      return;
    }

    /* PHONE VALIDATION */

    if (!/^\d{10}$/.test(bookingData.phone)) {
      setMessage(
        "Please enter a valid 10 digit phone number."
      );
      return;
    }

    /* SINGLE OCCUPANCY */

    if (bookingData.occupancy === "Single") {
      if (
        bookingData.adults !== "1" ||
        bookingData.children !== "0"
      ) {
        setMessage(
          "Single Occupancy allows only 1 adult and 0 children."
        );
        return;
      }
    }

    /* DOUBLE OCCUPANCY */

    if (bookingData.occupancy === "Double") {
      if (
        bookingData.adults !== "2" ||
        !["0", "1", "2"].includes(bookingData.children)
      ) {
        setMessage(
          "Double Occupancy allows 2 adults and 0, 1 or 2 children."
        );
        return;
      }
    }

    /* TERMS */

    if (!termsAccepted) {
      setMessage(
        "Please accept the Terms & Conditions before submitting your booking request."
      );
      return;
    }

    /* NIGHT VALIDATION */

    if (nights <= 0) {
      setMessage(
        "Please select valid check-in and check-out dates."
      );
      return;
    }

    /* RATE VALIDATION */

    if (currentRate <= 0) {
      setMessage(
        "Unable to calculate the selected room rate."
      );
      return;
    }

    /* =====================================================
       RAZORPAY PAYMENT + BOOKING
    ===================================================== */

    try {
      setIsSubmitting(true);
      setMessage("");

      // Razorpay checkout script check
      if (!window.Razorpay) {
        throw new Error(
          "Razorpay checkout is not loaded. Please refresh the page and try again."
        );
      }

      const razorpayKey =
        import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error(
          "Razorpay configuration is missing. Please check the frontend .env file."
        );
      }

      /* =====================================================
         STEP 1: CREATE RAZORPAY ORDER
      ===================================================== */

      const orderResponse = await fetch(
        "https://ikor-paradise.onrender.com/api/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: Math.round(totalAmount * 100),
            receipt: `IKOR-${Date.now()}`,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(
          orderData.message ||
            "Unable to create payment order."
        );
      }

      /* =====================================================
         STEP 2: SAVE BOOKING BEFORE OPENING RAZORPAY
      ===================================================== */

      const bookingId = `IKOR-${Date.now()}`;

      const bookingResponse = await fetch(
        "https://ikor-paradise.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            bookingId,

            name: bookingData.name.trim(),

            phone: bookingData.phone.trim(),

            email: bookingData.email.trim(),

            checkIn: bookingData.checkIn,

            checkOut: bookingData.checkOut,

            adults: Number(bookingData.adults),

            children: Number(bookingData.children),

            roomType: bookingData.roomType,

            occupancy: bookingData.occupancy,

            mealPlan: bookingData.mealPlan,

            specialRequest:
              bookingData.specialRequest.trim(),

            nights,

            pricePerNight: currentRate,

            totalAmount,

            razorpayOrderId: orderData.order_id,

            paymentStatus: "Pending",
          }),
        }
      );

      const savedBookingData =
        await bookingResponse.json();

      if (
        !bookingResponse.ok ||
        !savedBookingData.success
      ) {
        throw new Error(
          savedBookingData.message ||
            "Unable to save booking details."
        );
      }

      console.log(
        "Booking saved before payment:",
        savedBookingData.booking
      );

      /* =====================================================
         STEP 3: OPEN RAZORPAY CHECKOUT
      ===================================================== */

      await new Promise((resolve, reject) => {
        const options = {
          key: razorpayKey,

          amount: orderData.amount,

          currency:
            orderData.currency || "INR",

          name: "IKOR PARADISE",

          description: `${bookingData.roomType} - ${bookingData.occupancy} Booking`,

          order_id: orderData.order_id,

          prefill: {
            name: bookingData.name.trim(),

            email: bookingData.email.trim(),

            contact: bookingData.phone.trim(),
          },

          notes: {
            bookingId,

            roomType: bookingData.roomType,

            occupancy: bookingData.occupancy,

            checkIn: bookingData.checkIn,

            checkOut: bookingData.checkOut,
          },

          theme: {
            color: "#b88935",
          },

          /* =================================================
             PAYMENT SUCCESS
          ================================================= */

          handler: async (paymentResponse) => {
            try {
              // Verify payment signature on backend
              const verifyResponse = await fetch(
                "https://ikor-paradise.onrender.com/api/verify-payment",
                {
                  method: "POST",

                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    bookingId,

                    razorpay_order_id:
                      paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                      paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                      paymentResponse.razorpay_signature,
                  }),
                }
              );

              const verifyData =
                await verifyResponse.json();

              if (
                !verifyResponse.ok ||
                !verifyData.success
              ) {
                throw new Error(
                  verifyData.message ||
                    "Payment verification failed."
                );
              }

              setMessage(
                `Payment successful! Thank you ${bookingData.name}. Your booking is confirmed for processing. Booking ID: ${bookingId}.`
              );

              setTermsAccepted(false);

              resolve();
            } catch (verificationError) {
              reject(verificationError);
            }
          },

          /* =================================================
             RAZORPAY CLOSED / BACK BUTTON
          ================================================= */

          modal: {
            ondismiss: () => {
              reject(
                new Error(
                  `Payment was cancelled or not completed. Your booking details are saved with Booking ID: ${bookingId}.`
                )
              );
            },
          },
        };

        const razorpayCheckout =
          new window.Razorpay(options);

        /* =================================================
           PAYMENT FAILED
        ================================================= */

        razorpayCheckout.on(
          "payment.failed",
          (response) => {
            reject(
              new Error(
                `Payment failed. Your booking details are saved with Booking ID: ${bookingId}. ${
                  response.error?.description || ""
                }`
              )
            );
          }
        );

        razorpayCheckout.open();
      });
    } catch (error) {
      console.error(
        "Booking/payment submission failed:",
        error
      );

      setMessage(
        error.message ||
          "Unable to complete payment and booking. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
                  disabled
                >

                  <option value="1">
                    1 Adult
                  </option>

                  <option value="2">
                    2 Adults
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
                  disabled={
                    bookingData.occupancy === "Single"
                  }
                >

                  <option value="0">
                    No Children
                  </option>

                  <option
                    value="1"
                    disabled={
                      bookingData.occupancy === "Single"
                    }
                  >
                    1 Child
                  </option>

                  <option
                    value="2"
                    disabled={
                      bookingData.occupancy === "Single"
                    }
                  >
                    2 Children
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

                  <option value="Pacific">
                    PACIFIC ROOM
                  </option>

                  <option value="Presidential">
                    PRESIDENTIAL ROOM
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
                  onChange={handleOccupancyChange}
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
                message.startsWith("Payment successful")
                  ? "booking-message success"
                  : "booking-message error"
              }
            >
              {message}
            </div>

          )}


          {/* =====================================================
              TERMS & CONDITIONS
          ===================================================== */}

          <div
            className="booking-terms"
            style={{
              marginBottom: "24px",
              padding: "16px 18px",
              background: "#faf7f1",
              border: "1px solid #eadfcf",
            }}
          >

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                cursor: "pointer",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#4d3b2e",
              }}
            >

              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => {
                  setTermsAccepted(e.target.checked);
                  setMessage("");
                }}
                style={{
                  marginTop: "4px",
                  width: "17px",
                  height: "17px",
                  flexShrink: 0,
                  accentColor: "#b88935",
                }}
              />

              <span>
                I agree to the{" "}
                <strong>
                  Terms & Conditions
                </strong>{" "}
                of IKOR Paradise.
                I confirm that the booking details provided by me are correct.
              </span>

            </label>

          </div>


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
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "PROCESSING PAYMENT..."
                : "PAY & REQUEST BOOKING"}
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