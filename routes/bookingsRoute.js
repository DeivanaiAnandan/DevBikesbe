const express = require("express");
const router = express.Router();
const Booking = require("../model/bookingModel");
const Bike = require("../model/bikeModel");
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
  "sk_test_51OWapgSJm2ijl0R8CiH0f9JryLy0R2CpcXK39TgchVsKzuZ9fpEvwM72XmTlLh5SaOSs0s8IoTLYKq6jk0LBSzTv00I5TcSsgq"
);

router.post("/bookbike", async (req, res) => {
  const { token } = req.body;
  
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const payment = await stripe.paymentIntents.create(
      {
        amount: req.body.totalAmount * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    console.log(payment)
    if (payment) {
      req.body.transactionId = payment.id;
      
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const bike = await Bike.findOne({ _id: req.body.bike });
      bike.bookedTimeSlots.push(req.body.bookedTimeSlots);
      await bike.save();
      res.send("Your booking is successful");
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
   
    return res.status(400).json(error);
  }
});


router.get("/getallbookings", async(req, res) => {

  try {

      const bookings = await Booking.find().populate('bike')
      res.send(bookings)
      
  } catch (error) {
      return res.status(400).json(error);
  }

});       
        

module.exports = router;
