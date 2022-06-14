var MovieDbService = require("./moviedb.service");

class MovieService {

    static baseUrl = "https://api.themoviedb.org/3/";
    static apiKey = process.env.PORT; 

    static searchByKeyword = async(keywords, language = "en", page = 1) =>{
        const searchResult = await MovieDbService.searchByKeyword(keywords, language, page);
        console.log(searchResult);
        const resultPage = searchResult.page;
        console.log(resultPage);
        const movieList = searchResult.results.map((movie, index) => {
            const container = {};
            container.id = movie.id;
            container.title = movie.title;
            container.overview = movie.overview;
            container.popularity = movie.popularity;
            return container;
        })
        return {movieList, resultPage};
    }

}

module.exports = MovieService;