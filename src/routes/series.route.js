const express = require('express');
const SeriesController = require("../controllers/series.controller");
const router = express.Router();



router.get('/search/:search', SeriesController.searchSeriesByKeyword);

router.get('/id/:id', SeriesController.searchSeriesById);

router.get('/genres' , SeriesController.searchSeriesGenres);

module.exports = router;
