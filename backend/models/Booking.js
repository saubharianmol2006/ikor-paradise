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

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Booking", bookingSchema);