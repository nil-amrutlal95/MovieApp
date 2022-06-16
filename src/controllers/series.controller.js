var SeriesService = require('../services/series.service');

class SeriesController {
    static seriesService = new SeriesService();

    static searchSeriesByKeyword = async (req, res) => {

        /* Request Validation */

        if (req.params.search === undefined) {
            return res.status(400).send({status: 400, error: true, message: 'Missing Inputs'});
        }

        if (req.query.sortBy && req.query.sortBy !== 'id' && req.query.sortBy !== 'title' && req.query.sortBy !== 'popularity') {
            return res.status(400).send({status: 400, error: true, message: 'Invalid sort'
            });
        }

        if (req.query.order && req.query.order !== 'desc' && req.query.order !== 'asc') {
            return res.status(400).send({status: 400, error: true, message: 'Invalid Order'});
        }

        /* Service Call */

        this.seriesService.searchByKeyword(req.params.search, req.query.sortBy, req.query.order, req.query.lang, req.query.page)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });
    };

    static searchSeriesById = async (req, res) => {

        /* Request Validation */

        if (req.params.id === null || !Number(req.params.id) ? true : false) {
            return res.status(400).send({error: true, message: 'Incorrect ID format'});
        }

        /* Service Call */

        this.seriesService.searchById(req.params.id, req.query.lang)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });
    };

    static searchSeriesGenres = async (req, res) => {

        /* Service Call */

        await this.seriesService.searchSeriesGenres(req.query.lang)
            .then((data) => {
                return res.status(200).send({ status: 200, error: false, data });
            })
            .catch((err) => {
                return res.status(500).send({ status: 500, error: true, message: err.message });
            });
    };
}

module.exports = SeriesController;
