import { handleSubmit, movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";
import * as functions from "../ts/services/movieService";
import * as htmlFunctions from "../ts/htmlFunctions";

describe("functions tests", () => {
    let mockedGetData: jest.SpyInstance<Promise<IMovie[]>, [string]>; 
    let mockedCreateHtml: jest.SpyInstance<void>; 
    let mockedDisplayNoResult: jest.SpyInstance<void>;

    beforeEach(() => {
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;
        mockedGetData = jest.spyOn(functions, "getData");
        mockedCreateHtml = jest.spyOn(htmlFunctions, "createHtml");
        mockedDisplayNoResult = jest.spyOn(htmlFunctions, "displayNoResult");
    })

    afterEach(() => {
        jest.restoreAllMocks();
      });

    test("it should sort movies in descending order", () => {
        const movies = [
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }, 
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'}
        ]

        const sortedMovies = movieSort(movies, true);

        expect(sortedMovies).toEqual([
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'},
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }            
        ])
    })

    test("it should sort movies in ascending order", () => {
        const movies = [
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }, 
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'}
        ]

        const sortedMovies = movieSort(movies, false);

        expect(sortedMovies).toEqual([
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' },  
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'},
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' }           
        ])
    })

    test("it should return 0 when titles are in equal order", () => {
        const movies = [
            { Title: 'The Avengers', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A', Year: '2012' },
            { Title: 'The Avengers', imdbID: 'tt2395427', Type: 'movie', Poster: 'N/A', Year: '2015' },
            { Title: 'The Avengers', imdbID: 'tt4154756', Type: 'movie', Poster: 'N/A', Year: '2018' } 
        ]

        const sortedMovies = movieSort(movies);

        expect(sortedMovies).toEqual([
            { Title: 'The Avengers', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A', Year: '2012' },
            { Title: 'The Avengers', imdbID: 'tt2395427', Type: 'movie', Poster: 'N/A', Year: '2015' },
            { Title: 'The Avengers', imdbID: 'tt4154756', Type: 'movie', Poster: 'N/A', Year: '2018' }           
        ])
    })

    test("it should call createHtml with movies when getData resolves with movies", async () => {
        const movies: IMovie[] = [
            { Title: 'Movie 1', imdbID: 'id1', Type: 'movie', Poster: 'url1', Year: '2021' },
            { Title: 'Movie 2', imdbID: 'id2', Type: 'movie', Poster: 'url2', Year: '2022' }
        ];
        mockedGetData.mockResolvedValueOnce(movies); 

        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).toHaveBeenCalledWith(movies, expect.any(HTMLDivElement));
        expect(mockedDisplayNoResult).not.toHaveBeenCalled(); 
      }); 
    
    test("it should call displayNoResult when getData rejects", async () => {
        mockedGetData.mockRejectedValueOnce(new Error('error')); 
        
        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).not.toHaveBeenCalled();
        expect(mockedDisplayNoResult).toHaveBeenCalledWith(expect.any(HTMLDivElement)); 
    })
})