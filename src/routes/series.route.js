var express = require('express');
var SeriesController = require("../controllers/series.controller");
var router = express.Router();

router.get('/search/:search', SeriesController.searchMovieByKeyword);

router.get('/id/:id', SeriesController.searchMovieById)

module.exports = router;