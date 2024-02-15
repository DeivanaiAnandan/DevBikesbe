const express = require('express')
const router =  express.Router();
const bikes = require("../model/bikeModel")


router.get("/getallbikes", async (req, res) => {
    try {
      const allBikes = await bikes.find();
      console.log(allBikes);
      res.send(allBikes);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});


router.post("/addbike", async (req, res)=>{
try {
const newbike = new bikes(req.body);
await newbike.save()
res.send("Bike added successfully")
} catch (error) {
  console.error(error);
  res.status(400).json(error);
}


})

router.post("/editbike", async (req, res)=>{
  try {
    const bike = await bikes.findOne({ _id: req.body._id });
    bike.name = req.body.name;
bike.image = req.body.image;
bike.pricePerHour = req.body.pricePerHour;
bike.mileage = req.body.mileage;

    await bike.save();

   
  res.send("Bike updated successfully")
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
  
  
  })

  router.post("/deletebike", async (req, res)=>{
    try {
      await bikes.findOneAndDelete({_id : req.body.bikeid})
    
    res.send("Bike deleted successfully")
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
    
    
    })
  module.exports =  router;