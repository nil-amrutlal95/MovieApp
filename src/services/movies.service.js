var MovieDbService = require("./moviedb.service");

class MovieService {

    searchByKeyword = async(keywords, sortBy = "popularity" , order = "desc", language = "en", page = 1) =>{
        const searchResult = await MovieDbService.searchByKeyword(keywords, language, page);
        const resultPage = searchResult.page;
        const totalResults = searchResult.total_results;
        const totalPages = searchResult.total_pages
        const movieList = searchResult.results.map((movie) => {
            const container = {};
            container.id = movie.id? movie.id : "";
            container.title = movie.title? movie.title : "";
            container.overview = movie.overview? movie.overview : "";
            container.popularity = movie.popularity? movie.popularity : "";
            return container;
        })

        //Sort Results if needed
        if(sortBy !== "popularity" ||  order !== "desc"){
            movieList.sort(this.compareValues(sortBy , order));
        }
        return {movieList, resultPage, totalPages, totalResults};
    }

    searchById = async(id, language= "en") => {
        const searchResult = await MovieDbService.searchById(id, language);
        const container = {};
        container.title = searchResult.title ? searchResult.title : "";
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
        container.runtime = searchResult.runtime? searchResult.runtime : "";
 
        // return searchResult;
        return container;
    }

    





    compareValues = (key, order = 'asc') => {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }
    
          const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
          const varB = (typeof b[key] === 'string')? b[key].toUpperCase() : b[key];
          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return (
            (order === 'desc') ? (comparison * -1) : comparison
          );
        };
      }

}

module.exports = MovieService;