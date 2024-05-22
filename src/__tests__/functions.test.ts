import { handleSubmit, movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";
import * as functions from "../ts/services/movieService";
import * as htmlFunctions from "../ts/htmlFunctions";
import { movies } from "../ts/services/__mocks__/movieService";

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
        const sortedMovies = movieSort(movies, true);

        expect(sortedMovies).toEqual([
            { Title: "Avengers", imdbID: "1", Type: "movie", Poster: "N/A", Year: "2012" }, 
            { Title: "Avengers", imdbID: "2", Type: "movie", Poster: "N/A", Year: "2018" }, 
            { Title: "E.T. the Extra-Terrestrial", imdbID: "4", Type: "movie", Poster: "N/A", Year: "1982" },
            { Title: "Star Wars", imdbID: "3", Type: "movie", Poster: "N/A", Year: "1977" }      
        ])
    })

    test("it should sort movies in ascending order", () => {
        const sortedMovies = movieSort(movies, false);

        expect(sortedMovies).toEqual([
            { Title: "Star Wars", imdbID: "3", Type: "movie", Poster: "N/A", Year: "1977" },
            { Title: "E.T. the Extra-Terrestrial", imdbID: "4", Type: "movie", Poster: "N/A", Year: "1982" },
            { Title: "Avengers", imdbID: "1", Type: "movie", Poster: "N/A", Year: "2012" },
            { Title: "Avengers", imdbID: "2", Type: "movie", Poster: "N/A", Year: "2018" }             
        ])
    })

    test("it should return 0 when titles are in equal order", () => {
       const sortedMovies = movieSort(movies);

         expect(sortedMovies).toEqual([
            { Title: "Avengers", imdbID: "1", Type: "movie", Poster: "N/A", Year: "2012" }, 
            { Title: "Avengers", imdbID: "2", Type: "movie", Poster: "N/A", Year: "2018" }, 
            { Title: "E.T. the Extra-Terrestrial", imdbID: "4", Type: "movie", Poster: "N/A", Year: "1982" },
            { Title: "Star Wars", imdbID: "3", Type: "movie", Poster: "N/A", Year: "1977" }       
        ]) 
    })

    test("it should call createHtml with movies when getData resolves", async () => {
        mockedGetData.mockResolvedValueOnce(movies); 

        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).toHaveBeenCalledWith(movies, expect.any(HTMLDivElement));
        expect(mockedDisplayNoResult).not.toHaveBeenCalled(); 
      }); 

    test("it should call displayNoResult when getData returns an empty array", async () => {
        mockedGetData.mockResolvedValueOnce([]);

        await handleSubmit();

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).not.toHaveBeenCalled();
        expect(mockedDisplayNoResult).toHaveBeenCalledWith(expect.any(HTMLDivElement));
    });
    
    test("it should call displayNoResult when getData rejects", async () => {
        mockedGetData.mockRejectedValueOnce(new Error("error")); 

        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).not.toHaveBeenCalled();
        expect(mockedDisplayNoResult).toHaveBeenCalledWith(expect.any(HTMLDivElement)); 
    })
})