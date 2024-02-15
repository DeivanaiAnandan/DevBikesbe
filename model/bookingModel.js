const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema(
  {
    bike: { type: mongoose.Schema.Types.ObjectID, ref: "bikes" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: {
      from: { type: String },
      to: { type: String },
    },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    // mileage: {
    //     type: Number,
    //     required: true,
    //   },
    transactionId: { type: String },
    ridingGearsRequired: { type: Boolean }
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("bookings", bookingSchema);

module.exports = bookingModel;
