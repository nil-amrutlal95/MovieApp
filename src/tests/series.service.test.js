const SeriesService = require('../services/series.service');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
dotenv.config({ path: path.resolve(__dirname + './../config/.env') });

const seriesService = new SeriesService();

describe('Series Service: Search by keyword', () => {
    test('Data Type', async () => {
        const data = await seriesService.searchByKeyword('Breaking Bad');
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await seriesService.searchByKeyword('Friends');
        const keys = Object.keys(data);
        expect(keys.find((element) => element === 'seriesList'));
        expect(keys.find((element) => element === 'resultPage'));
        expect(keys.find((element) => element === 'totalPages'));
        expect(keys.find((element) => element === 'totalResults'));
    });
});

describe('Series Service: Search by ID', () => {
    test('Data Type', async () => {
        const data = await seriesService.searchById(11);
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await seriesService.searchById(15);
        const keys = Object.keys(data);
        expect(keys.find((element) => element === 'title'));
        expect(keys.find((element) => element === 'overview'));
        expect(keys.find((element) => element === 'genres'));
        expect(keys.find((element) => element === 'popularity'));
        expect(keys.find((element) => element === 'adult'));
        expect(keys.find((element) => element === 'homepage'));
        expect(keys.find((element) => element === 'producers'));
        expect(keys.find((element) => element === 'videos'));
        expect(keys.find((element) => element === 'episodes'));
        expect(keys.find((element) => element === 'seasons'));
    });
});

describe('Series Service: Get Genres', () => {
    test('Data Type', async () => {
        const data = await seriesService.searchSeriesGenres();
        expect(typeof data).toBe('object');
    });
    test('Data Fields', async () => {
        const data = await seriesService.searchSeriesGenres();
        expect(typeof data.genres[0]).toBe('string');
    });
});
