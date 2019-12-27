const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");


const Appointment = require("../../models/Appointment");

// @route POST api/appointments/new
// @desc create new appointment
// @access Public
router.post("/post", (req, res) => {

});

// @route POST api/appointments/get
// @desc create new appointment
// @access Public
router.get("/get", (req, res) => {

});


module.exports = router;