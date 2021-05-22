const { Favorite } = require("../models/Favorite");
const express = require("express");

const router = express.Router();

router.get("/favoriteNumber/movieId/:movieId", (req, res, next) => {
  // mongoDB에서 favorite 숫자를 가져오기

  Favorite.find({
    movieId: req.params.movieId,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
});

router.post("/favorited", (req, res) => {
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    let result = false;
    if (info.length !== 0) {
      result = true;
    }
    res.status(200).json({ success: true, favorited: result });
  });
});

router.post("/addToFavorite", (req, res) => {
  const favorite = new Favorite(req.body);

  favorite.save((err, doc) => {
    if (err) return res.status(401).json({ success: false, err });
    return res.status(200).json({ success: true, doc });
  });
});

router.delete("/removeFromFavorite", (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

module.exports = router;
