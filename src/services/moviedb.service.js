const axios = require("axios");

class MovieDbService {

    static baseUrl = "https://api.themoviedb.org/3";

    static searchMovieByKeyword = async(keywords, language , page) => {
        const res = await axios
            .get(`${this.baseUrl}/search/movie/?api_key=${process.env.API_KEY}&query=${keywords}&language=${language}&page=${page}`);
        return res.data;
    }

    static searchSeriesByKeyword = async(keywords, language , page) => {
        const res = await axios
            .get(`${this.baseUrl}/search/tv/?api_key=${process.env.API_KEY}&query=${keywords}&language=${language}&page=${page}`);
        return res.data;
    }


    static searchMovieById = async(id, language) => {
        const res = await axios
            .get(`${this.baseUrl}/movie/${id}?api_key=${process.env.API_KEY}&language=${language}&&append_to_response=videos`);
        return res.data;
    }

    static searchSeriesById = async(id, language) => {
        const res = await axios
            .get(`${this.baseUrl}/tv/${id}?api_key=${process.env.API_KEY}&language=${language}&&append_to_response=videos`);
        return res.data;
    }





    


    static searchMovieGenres = async(language) => {
        const res = await axios
            .get(`${this.baseUrl}/genre/movie/list?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    }

    static searchSeriesGenres = async(language) => {
        const res = await axios
            .get(`${this.baseUrl}/genre/tv/list?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    }


    static getVideoById = async(id, language) => {
        const res = await axios
            .get(`${this.baseUrl}/movie/${id}/videos?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    }


    static discoverMovies = async() => {
    }

    static discoverSeries = async() => {

    }



}

module.exports = MovieDbService;