var express = require('express');
var MovieController = require("../controllers/movies.controller");
var router = express.Router();

router.get('/search/:search', MovieController.searchMovieByKeyword);

router.get('/id/:id', MovieController.searchMovieById)

module.exports = router;