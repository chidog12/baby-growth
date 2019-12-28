const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");


const Baby = require("../../models/Baby");

// @route POST api/babies/post
// @desc create new baby
// @access Public
router.post("/post", (req, res) => {

    const newBaby = new Baby({
        name: req.body.name,
        age: req.body.age,
        parentId: req.body.parentId,
        weight: req.body.weight
    });

    newBaby
        .save()
        .then(baby => res.json(baby))
});

// @route GET api/babies/get
// @desc get list of all babies
// @access Public
router.get("/get", (req, res) => {
    Baby
        .find()
        .then(babies => res.json(babies))
});

// @route GET api/babies/get/parent/{parentId}
// @desc get list of all babies of specific parentId
// @access Public
router.get("/get/parent/:parentId", (req, res) => {
    Baby
        .find({parentId: req.params.parentId})
        .then(babies => res.json(babies))
});

// @route GET api/babies/get/baby/{_id}
// @desc get specific baby by their id
// @access Public
router.get("/get/baby/:id", (req, res) => {
    Baby
        .find({_id: req.params.id})
        .then(babies => res.json(babies))
});

// @route UPDATE api/babies/update/{_id}
// @desc update specific baby
// @access Public
router.put("/update/:id", (req, res) => {
    
    Baby
        .findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            age: req.body.age,
            parentId: req.body.parentId,
            weight: req.body.weight
        })
        .then(babies => res.json(babies))
});

module.exports = router;