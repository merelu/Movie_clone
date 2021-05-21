const { Favorite } = require("../models/Favorite");
const express = require("express");

const router = express.Router();

router.get("/favoriteNumber/movieId/:movieId", (req, res, next) => {});

module.exports = router;
