const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Razorpay = require("razorpay");

require("dotenv").config();

const Booking = require("./models/Booking");

const app = express();

const PORT = process.env.PORT || 5000;

// =========================================================
// RAZORPAY SETUP
// =========================================================

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =========================================================
// MIDDLEWARE
// =========================================================

app.use(cors());
app.use(express.json());

// =========================================================
// ROOT API
// =========================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "IKOR Paradise Backend is running!",
  });
});

// =========================================================
// RAZORPAY - CREATE ORDER
// =========================================================

app.post("/api/create-order", async (req, res) => {
  try {
    const { amount, receipt } = req.body;

    const amountInPaise = Number(amount);

    // Amount validation
    if (
      !Number.isFinite(amountInPaise) ||
      !Number.isInteger(amountInPaise) ||
      amountInPaise < 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount. Minimum payment amount is ₹1.",
      });
    }

    const orderReceipt =
      receipt || `IKOR-${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: orderReceipt,
    });

    return res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Razorpay order creation failed:");

    if (error.statusCode) {
      console.error("Status:", error.statusCode);
    }

    console.error(error.message);

    if (error.statusCode === 401) {
      return res.status(401).json({
        success: false,
        message: "Razorpay authentication failed.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Unable to create Razorpay order.",
    });
  }
});

// =========================================================
// RAZORPAY - VERIFY PAYMENT
// =========================================================

app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // Required fields validation
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay payment verification details.",
      });
    }

    // Create signature
    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // Compare signatures safely
    const generatedBuffer = Buffer.from(
      generatedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      razorpay_signature,
      "utf8"
    );

    const signaturesMatch =
      generatedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        generatedBuffer,
        receivedBuffer
      );

    if (!signaturesMatch) {
      return res.status(400).json({
        success: false,
        message: "Payment signature verification failed.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully.",
      payment: {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      },
    });
  } catch (error) {
    console.error("Razorpay payment verification failed:");
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify payment.",
    });
  }
});

// =========================================================
// GET ALL BOOKINGS - ADMIN DASHBOARD
// =========================================================

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Failed to fetch bookings:");
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch bookings.",
    });
  }
});

// =========================================================
// UPDATE BOOKING STATUS - ADMIN
// =========================================================

app.put(
  "/api/bookings/:bookingId/status",
  async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Confirmed",
        "Cancelled",
        "Completed",
      ];

      if (
        !status ||
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid status. Allowed values are Pending, Confirmed, Cancelled or Completed.",
        });
      }

      const booking = await Booking.findOne({
        bookingId,
      });

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found.",
        });
      }

      booking.status = status;

      await booking.save();

      return res.status(200).json({
        success: true,
        message: `Booking status updated to ${status}.`,
        booking: {
          bookingId: booking.bookingId,
          name: booking.name,
          roomType: booking.roomType,
          status: booking.status,
        },
      });
    } catch (error) {
      console.error("Booking status update failed:");
      console.error(error.message);

      return res.status(500).json({
        success: false,
        message: "Unable to update booking status.",
      });
    }
  }
);

// =========================================================
// CREATE NEW BOOKING
// =========================================================

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      checkIn,
      checkOut,
      adults,
      children,
      roomType,
      occupancy,
      mealPlan,
      specialRequest,
      nights,
      pricePerNight,
      totalAmount,
    } = req.body;

    // Required fields
    if (
      !name ||
      !phone ||
      !email ||
      !checkIn ||
      !checkOut ||
      !roomType ||
      !occupancy ||
      !mealPlan
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required booking details.",
      });
    }

    // Phone validation
    if (!/^\d{10}$/.test(String(phone))) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid 10-digit phone number.",
      });
    }

    // Single occupancy
    if (occupancy === "Single") {
      if (
        Number(adults) !== 1 ||
        Number(children) !== 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Single Occupancy allows exactly 1 adult and 0 children.",
        });
      }
    }

    // Double occupancy
    if (occupancy === "Double") {
      if (
        Number(adults) !== 2 ||
        ![0, 1, 2].includes(Number(children))
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Double Occupancy allows exactly 2 adults and 0, 1 or 2 children.",
        });
      }
    }

    // Date validation
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (
      Number.isNaN(checkInDate.getTime()) ||
      Number.isNaN(checkOutDate.getTime())
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid check-in or check-out date.",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message:
          "Check-out must be after check-in.",
      });
    }

    // Generate booking ID
    const bookingId = `IKOR-${Date.now()}`;

    // Save booking
    const booking = await Booking.create({
      bookingId,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim().toLowerCase(),
      checkIn: checkInDate,
      checkOut: checkOutDate,
      adults: Number(adults),
      children: Number(children),
      roomType,
      occupancy,
      mealPlan,
      specialRequest: specialRequest || "",
      nights: Number(nights),
      pricePerNight: Number(pricePerNight),
      totalAmount: Number(totalAmount),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message:
        "Booking request submitted successfully.",
      booking: {
        bookingId: booking.bookingId,
        name: booking.name,
        roomType: booking.roomType,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        totalAmount: booking.totalAmount,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Booking creation failed:");
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to create booking.",
    });
  }
});

// =========================================================
// MONGODB CONNECTION
// =========================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log(
      "MongoDB connected successfully!"
    );

    app.listen(PORT, () => {
      console.log(
        `IKOR Paradise Backend running on port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:"
    );
    console.error(error.message);
  });