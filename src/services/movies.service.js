const MovieDbService = require('./moviedb.service');
const CommonService = require('./common.service');

class MovieService {
    type = 'movie';
    genresDictionary = new Object();

    searchByKeyword = async (keywords, sortBy = 'popularity', order = 'desc', language = 'en', page = 1) => {
        const searchResult = await MovieDbService.searchByKeyword(this.type, keywords, language, page);
        const resultPage = searchResult.page ? searchResult.page : page;
        const totalResults = searchResult.total_results ? searchResult.total_results : '';
        const totalPages = searchResult.total_pages ? searchResult.total_pages : page;
        const movieList = searchResult.results.map((movie) => {
            const container = {};
            container.id = movie.id ? movie.id : '';
            container.title = movie.title ? movie.title : '';
            container.overview = movie.overview ? movie.overview : '';
            container.popularity = movie.popularity ? movie.popularity : '';
            return container;
        });

        movieList.sort(CommonService.compareValues(sortBy, order));

        return { movieList, resultPage, totalPages, totalResults };
    };

    searchById = async (id, language = 'en') => {
        const searchResult = await MovieDbService.searchById(this.type, id, language);
        const container = {};
        container.title = searchResult.title ? searchResult.title : '';
        container.overview = searchResult.overview ? searchResult.overview : '';
        container.genres = searchResult.genres.map((genre) => {
            return genre.name ? genre.name : '';
        });
        container.popularity = searchResult.popularity ? searchResult.popularity : '';
        container.adult = searchResult.adult;
        container.homepage = searchResult.homepage ? searchResult.homepage : '';
        container.producers = searchResult.production_companies.map((production_company) => {
            return production_company.name ? production_company.name : '';
        });
        container.videos = searchResult.videos.results.map((video) => {
            if (video.site && video.site.toLowerCase() === 'youtube') {
                return {
                    name: video.name,
                    site: video.site,
                    type: video.type,
                    url: `https://youtube.com/watch?v=${video.key}`,
                };
            }
        });
        container.runtime = searchResult.runtime ? searchResult.runtime : '';

        return container;
    };

    searchMovieGenres = async function (language = 'en') {
        const searchResult = await MovieDbService.searchGenres(this.type, language);
        const container = {};
        container.genres = searchResult.genres.map((genre) => {
            this.genresDictionary[genre.name] = genre.id;
            return genre.name;
        });
        return container;
    };
}

module.exports = MovieService;
