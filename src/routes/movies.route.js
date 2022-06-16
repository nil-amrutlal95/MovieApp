var express = require('express');
var MovieController = require('../controllers/movies.controller');
const router = express.Router();

router.get('/search/:search', MovieController.searchMovieByKeyword);

router.get('/id/:id', MovieController.searchMovieById);

router.get('/genres', MovieController.searchMovieGenres);

module.exports = router;
