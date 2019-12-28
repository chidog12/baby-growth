const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");


const Appointment = require("../../models/Appointment");

// @route POST api/appointments/new
// @desc create new appointment
// @access Public
router.post("/post", (req, res) => {
    const newAppointment = new Appointment({
        parentId: req.body.parentId,
        babyId: req.body.babyId,
        date: req.body.date,
        done: req.body.done
    });

    newAppointment
        .save()
        .then(appointment => res.json(appointment))
});

// @route POST api/appointments/get
// @desc get list of all appointments
// @access Public
router.get("/get", (req, res) => {
    Appointment
        .find()
        .then(appointment => res.json(appointment))
});


// @route UPDATE api/appointments/update/{:_id}
// @desc update specific baby
// @access Public
router.put("/update/:id", (req, res) => {
    
    Appointment
        .findByIdAndUpdate(req.params.id, {
            parentId: req.body.parentId,
            babyId: req.body.babyId,
            date: req.body.date,
            done: req.body.done
        })
        .then(babies => res.json(babies))
});


module.exports = router;