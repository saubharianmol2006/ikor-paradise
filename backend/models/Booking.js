const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    checkIn: {
      type: Date,
      required: true,
    },

    checkOut: {
      type: Date,
      required: true,
    },

    adults: {
      type: Number,
      required: true,
    },

    children: {
      type: Number,
      required: true,
      default: 0,
    },

    roomType: {
      type: String,
      required: true,
      enum: ["Pacific", "Presidential"],
    },

    occupancy: {
      type: String,
      required: true,
      enum: ["Single", "Double"],
    },

    mealPlan: {
      type: String,
      required: true,
      enum: [
        "Room Only",
        "Breakfast",
        "Dinner",
        "BF & Dinner",
        "BF, Lunch & Dinner",
      ],
    },

    specialRequest: {
      type: String,
      trim: true,
      default: "",
    },

    nights: {
      type: Number,
      required: true,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    // Booking status - hotel/admin side
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },

    // Payment status - Razorpay side
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    // Razorpay order/payment details
    razorpayOrderId: {
      type: String,
      default: "",
    },

    razorpayPaymentId: {
      type: String,
      default: "",
    },

    razorpaySignature: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);