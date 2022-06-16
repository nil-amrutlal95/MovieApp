const MovieDbService = require("./moviedb.service");
const CommonService = require("./common.service");

class SeriesService {

    genresDictionary = new Object();

    searchByKeyword = async(keywords, sortBy = "popularity" , order = "desc", language = "en", page = 1) =>{
        const searchResult = await MovieDbService.searchSeriesByKeyword(keywords, language, page);
        const resultPage = searchResult.page;
        const totalResults = searchResult.total_results;
        const totalPages = searchResult.total_pages
        const seriesList = searchResult.results.map((movie) => {
            const container = {};
            container.id = movie.id? movie.id : "";
            container.title = movie.name? movie.name : "";
            container.overview = movie.overview? movie.overview : "";
            container.popularity = movie.popularity? movie.popularity : "";
            return container;
        })

        //Sort Results if needed
        if(sortBy !== "popularity" ||  order !== "desc"){
            seriesList.sort(CommonService.compareValues(sortBy , order));
        }
        return {seriesList, resultPage, totalPages, totalResults};
    }

    searchById = async(id, language= "en") => {
        const searchResult = await MovieDbService.searchSeriesById(id, language);
        const container = {};
        container.title = searchResult.name ? searchResult.name : "";
        container.overview = searchResult.overview? searchResult.overview : ""
        container.genres = searchResult.genres.map((genre) => {
            return genre.name? genre.name : "";
        });
        container.popularity = searchResult.popularity? searchResult.popularity : "";
        container.adult = searchResult.adult;
        container.homepage = searchResult.homepage? searchResult.homepage : "";
        container.producers = searchResult.production_companies.map((production_company)=> { 
            return production_company.name? production_company.name : "";
        });
        container.videos = searchResult.videos.results.map((video) => {
          if(video.site && video.site.toLowerCase() === "youtube"){
            return {
              name : video.name,
              site: video.site,
              type: video.type,
              url : `https://youtube.com/watch?v=${video.key}`
            }
          }

        });
        container.episodes = searchResult.number_of_episodes? searchResult.number_of_episodes : "";
        container.seasons = searchResult.number_of_seasons? searchResult.number_of_seasons : "";
        container.test = searchResult.asakas;
 
        return container;
    }

    searchSeriesGenres = async function(language = "en"){
        const searchResult = await MovieDbService.searchSeriesGenres(language);
        const container = {};
        container.genres = searchResult.genres.map((genre) => {
            // this.genresDictionary.push({name : genre.name, id: genre.id});
            this.genresDictionary[genre.name] = genre.id;
            return genre.name;
        })
        return container;
    }

}

module.exports = SeriesService;