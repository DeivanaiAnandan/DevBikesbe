const  mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    image: {
        type: String,
        required: true,
      },

    pricePerHour: {
      type: Number,
      required: true,
    },

    // mileage: {
    //   type: Number,
    //   required: true,
    // },

    bookedTimeSlots: [{
        from: {
            type: Date,
            default: null,
          },
          to: {
            type: Date,
            default: null,
          }
    }]
   
  },{timestamps : true});
  
  const bikes = mongoose.model("bikes", bikeSchema);
  
  module.exports = bikes;