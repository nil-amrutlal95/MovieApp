var MovieService = require('../services/movies.service');

class MovieController {
    static movieService = new MovieService();

    static searchMovieByKeyword = async (req, res) => {

        /* Request Validation */

        if (req.params.search === undefined) {
            return res.status(400).send({ status: 400, error: true, message: 'Missing Inputs' });
        }

        if (req.query.sortBy && req.query.sortBy !== 'id' && req.query.sortBy !== 'title' && req.query.sortBy !== 'popularity') {
            return res.status(400).send({status: 400, error: true, message: 'Invalid sort'});
        }

        if (req.query.order && req.query.order !== 'desc' && req.query.order !== 'asc') {
            return res.status(400).send({status: 400, error: true, message: 'Invalid Order'});
        }

        /* Service Call */

        this.movieService.searchByKeyword(req.params.search, req.query.sortBy, req.query.order, req.query.lang, req.query.page)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });
    };

    static searchMovieById = async (req, res) => {

        /* Request Validation */

        if (req.params.id === null || !Number(req.params.id) ? true : false) {
            return res.status(400).send({ status: 400, error: true, message: 'Incorrect ID format'});
        }

        /* Service Call */

        this.movieService.searchById(req.params.id, req.query.lang)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });            
    };

    static searchMovieGenres = async (req, res) => {

        /* Service Call */
        
        await this.movieService.searchMovieGenres(req.query.lang)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });
    };
}

module.exports = MovieController;
