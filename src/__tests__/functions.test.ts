import { handleSubmit, movieSort } from "../ts/functions";
import { IMovie } from "../ts/models/Movie";
import * as functions from "../ts/services/movieService";
import * as htmlFunctions from "../ts/htmlFunctions";
import { movies } from "../ts/services/__mocks__/movieService";

describe("functions tests", () => {
    let mockedGetData: jest.SpyInstance<Promise<IMovie[]>, [string]>; 
    let mockedCreateHtml: jest.SpyInstance<void>; 
    let mockedDisplayNoResult: jest.SpyInstance<void>;
    let mockedMovies = movies; 

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
        mockedMovies = [...movies];
    })

    afterEach(() => {
        jest.restoreAllMocks();
        mockedMovies = []; 
    });

    test("it should sort movies in ascending order", () => {
        const sortedMovies = movieSort(mockedMovies, false); 
        const expectedTitles = ["Star Wars", "E.T. the Extra-Terrestrial", "Avengers", "Avengers"];

        for (let i = 0; i < expectedTitles.length; i++) {
            expect(sortedMovies[i].Title).toBe(expectedTitles[i]);
        }

        const sortedTitles = sortedMovies.map(movie => movie.Title);
        expect(sortedTitles).toEqual(expectedTitles);
        expect(sortedMovies[0].Title).toBe(mockedMovies[0].Title);
    })

    test("it should sort movies in descending order", () => {      
        const sortedMovies = movieSort(mockedMovies, true); 
        const expectedTitles = ["Avengers", "Avengers", "E.T. the Extra-Terrestrial", "Star Wars"];

        for (let i = 0; i < expectedTitles.length; i++) {
            expect(sortedMovies[i].Title).toBe(expectedTitles[i]);
        }

        const sortedTitles = sortedMovies.map(movie => movie.Title);
        expect(sortedTitles).toEqual(expectedTitles);
        expect(sortedMovies[0].Title).toBe(mockedMovies[0].Title);
    })    

    test("it should return 0 when titles are in equal order", () => {
        const sortedMovies = movieSort(mockedMovies); 
        const expectedTitles = ["Avengers", "Avengers", "E.T. the Extra-Terrestrial", "Star Wars"];

        for (let i = 0; i < expectedTitles.length; i++) {
            expect(sortedMovies[i].Title).toBe(expectedTitles[i]);
        }

        const sortedTitles = sortedMovies.map(movie => movie.Title);
        expect(sortedTitles).toEqual(expectedTitles);
        expect(sortedMovies[0].Title).toBe(mockedMovies[0].Title);
    })

    test("it should call createHtml with movies when getData resolves", async () => {   
        const container = document.getElementById("movie-container") as HTMLDivElement;      
        mockedGetData.mockResolvedValueOnce(movies);         

        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).toHaveBeenCalledWith(movies, container);
        expect(mockedDisplayNoResult).not.toHaveBeenCalled(); 
      }); 

    test("it should call displayNoResult when getData returns an empty array", async () => {
        const container = document.getElementById("movie-container") as HTMLDivElement; 
        mockedGetData.mockResolvedValueOnce([]);

        await handleSubmit();

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).not.toHaveBeenCalled();
        expect(mockedDisplayNoResult).toHaveBeenCalledWith(container);
    });
    
    test("it should call displayNoResult when getData rejects", async () => {
        const container = document.getElementById("movie-container") as HTMLDivElement; 
        mockedGetData.mockRejectedValueOnce(new Error("error")); 

        await handleSubmit(); 

        expect(mockedGetData).toHaveBeenCalled();
        expect(mockedCreateHtml).not.toHaveBeenCalled();
        expect(mockedDisplayNoResult).toHaveBeenCalledWith(container); 
    })
})