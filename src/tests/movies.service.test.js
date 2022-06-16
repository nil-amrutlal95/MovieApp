const MovieService = require('../services/movies.service');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
dotenv.config({ path: path.resolve(__dirname + './../config/.env') });

const movieService = new MovieService();

describe('Movie Service: Search by keyword', () => {
    test('Data Type', async () => {
        const data = await movieService.searchByKeyword('Titanic');
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await movieService.searchByKeyword('Godfather');
        const keys = Object.keys(data);
        expect(keys.find((element) => element === 'movieList'));
        expect(keys.find((element) => element === 'resultPage'));
        expect(keys.find((element) => element === 'totalPages'));
        expect(keys.find((element) => element === 'totalResults'));
    });
});

describe('Movie Service: Search by ID', () => {
    test('Data Type', async () => {
        const data = await movieService.searchById(11);
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await movieService.searchById(15);
        const keys = Object.keys(data);
        expect(keys.find((element) => element === 'title'));
        expect(keys.find((element) => element === 'overview'));
        expect(keys.find((element) => element === 'genres'));
        expect(keys.find((element) => element === 'popularity'));
        expect(keys.find((element) => element === 'adult'));
        expect(keys.find((element) => element === 'homepage'));
        expect(keys.find((element) => element === 'producers'));
        expect(keys.find((element) => element === 'videos'));
        expect(keys.find((element) => element === 'runtime'));
    });
});

describe('Movie Service: Get Genres', () => {
    test('Data Type', async () => {
        const data = await movieService.searchMovieGenres();
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await movieService.searchMovieGenres();
        expect(typeof data.genres[0]).toBe('string');
    });
});
