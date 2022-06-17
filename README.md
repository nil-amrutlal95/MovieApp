# MovieApp

This is application's goal is to provide movie and series information

## Install

    npm install

## Run the app

    npm start
    npm run dev

## Run the tests (integration testing)

    npm test

# REST API

The API runs on http://localhost:6060

## Search Movies & Series By Keyword

### Requests

`GET movies/search/:search` 
`GET series/search/:search` 

### Seach Parameters
    search: must be present

### Optional Query Parameters
    sortBy: Sorts the output data. Possible values: title, id, popularity (default value is popularity)
    orderBy: Sorts in that particular order. Possible values: asc, desc (default value is desc)
    lang: Language in which data will be displyed (default value is en)
    page: Results page returned (default value is 1)

    
    Functionality : Search movie/series by keyword(s)
    Example Movie Endpoint: http://localhost:6600/movies/search/jaws?page=3&sortBy=title&order=desc&lang=pt
    Example Movie Endpoing: http://localhost:6600/series/search/Breaking
    

## Search Movies & Series By ID

### Requests
    
`GET movies/id/:id`
`GET series/id/:id`

### Seach Parameters
    id: must be integer

### Optional Query Parameters
    lang: Language in which data will be displyed (default value is en)
    
    
    Functionality: Search movies/series by ID
    Example Movie Endpoint: http://localhost:6600/movies/id/11?lang=pt
    Example Series Endpoint: http://localhost:6600/series/id/1396
    
 
## Search Movies & Series Genres

### Requests
    
`GET movies/genres`
`GET series/genres`


### Optional Query Parameters
    lang: Language in which data will be displyed (default value is en)
    
    
    Functionality: Search movies's or series' genres
    Example Movie Endpoint: http://localhost:6600/movies/genres
    Example Series Endpoint: http://localhost:6600/movies/genres
    

## Response

    Status: 200 OK
    Content-Type: application/json
    Response: { status: int, error: boolean, data: array }
    
    Status: 501 Internal Error
    Content-Type: application/json
    Response: { status: int, error: boolean, message: string }
    
    Status: 404 Not Found
    Content-Type: application/json
    Response: { status: int, error: boolean, message: string }
    
### Notes 
- The sorting options for the search endpoints (both movies and series) only work within the page. It does not sort all results, but only the results displayed on that particular page.
    
