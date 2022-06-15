const axios = require("axios");

class MovieDbService {

    static baseUrl = "https://api.themoviedb.org/3";

    static searchByKeyword = async(keywords, language , page) => {
        const res = await axios
            .get(`${this.baseUrl}/search/movie/?api_key=${process.env.API_KEY}&query=${keywords}&language=${language}&page=${page}`);
        return res.data;
    }


    static searchById = async(id, language) => {
        const res = await axios
            .get(`${this.baseUrl}/movie/${id}?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    }

    static 

}

module.exports = MovieDbService;