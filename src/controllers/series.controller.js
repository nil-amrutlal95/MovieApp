var SeriesService = require("../services/series.service");

class SeriesController {

    static seriesService = new SeriesService();

    static searchSeriesByKeyword = async (req, res) => {

        if(req.params.search === undefined){
            res.status(400).send({  status: 400, error: true, message: "Missing Inputs"})
            return;
        }

        if(req.query.sortBy && req.query.sortBy !== "id"  && req.query.sortBy !== "title" && req.query.sortBy !== "popularity" ) {
            res.status(400).send({  status: 400, error: true, message: "Invalid sort"});
            return;
        }

        if(req.query.order && req.query.order !== "desc" && req.query.order !== "asc"){
            res.status(400).send({ status: 400 , error : true, message: "Invalid Order"})
        }


        const data = await this.seriesService.searchByKeyword(req.params.search, req.query.sortBy,
            req.query.order, req.query.lang, req.query.page);
        res.status(200).send({status: 200, error : false, data});
    }


    static searchSeriesById = async (req, res) => {
        
        if(req.params.id === null || !Number(req.params.id)?true:false) {
            res.status(400).send({error: true, message: "Incorrect ID format"});
        }

        const data = await this.seriesService.searchById(req.params.id, req.query.lang);
        return res.status(200).send(data);
    }

    static searchSeriesGenres = async (req, res) => {
        await this.seriesService.searchSeriesGenres(req.query.lang)
            .then((data) => {
                return res.status(200).send({status: 200, error: false, data});
            })
            .catch((err) => {
                return res.status(500).send({status: 500, error: true, message: err.message});
            })
    }

}

module.exports = SeriesController;