var MovieService = require("../services/movies.service");

class MovieController {

    static searchMovieByKeyword = async (req, res) => {

        if(req.params.search === undefined){
            res.status(400).send({ error: true, message: "Missing Inputs"})
            return;
        }

        const data = await MovieService.searchByKeyword(req.params.search, req.query.lang, req.query.page);
        res.status(200).send(data);
    }


    static searchMovieById = async (req, res) => {
        
        if(req.params.id === null || !Number(req.params.id)?true:false) {
            console.log("null");
        }

        return req.params.id;
    }

}

module.exports = MovieController;