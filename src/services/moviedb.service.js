const axios = require('axios');

class MovieDbService {
    static baseUrl = 'https://api.themoviedb.org/3';

    static searchByKeyword = async (type, keywords, language, page) => {
        const res = await axios.get(
            `${this.baseUrl}/search/${type}/?api_key=${process.env.API_KEY}&query=${keywords}&language=${language}&page=${page}`
        );
        return res.data;
    };

    static searchById = async (type, id, language) => {
        const res = await axios.get(`${this.baseUrl}/${type}/${id}?api_key=${process.env.API_KEY}&language=${language}&&append_to_response=videos`);
        return res.data;
    };

    static searchGenres = async (type, language) => {
        const res = await axios.get(`${this.baseUrl}/genre/${type}/list?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    };

    static getVideoById = async (id, language) => {
        const res = await axios.get(`${this.baseUrl}/movie/${id}/videos?api_key=${process.env.API_KEY}&language=${language}`);
        return res.data;
    };
}

module.exports = MovieDbService;
