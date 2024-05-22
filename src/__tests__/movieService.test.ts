import { movies } from "../ts/services/__mocks__/movieService";
import { getData } from "../ts/services/movieService";
import axios from "axios";

describe("getData tests", () => {    

    afterEach(() => {
        jest.clearAllMocks();
      });

    test("it should fetch data from API and return movies", async () => {
        const mockedAxios = jest.spyOn(axios, "get");
        const response = { data: { Search: movies }}
        mockedAxios.mockResolvedValueOnce(response)

        const searchText = "Avengers"; 
        const result = await getData(searchText); 

        expect(result).toHaveLength(4); 

        const hasExactTitle = result.some(movie => movie.Title === "Avengers");
        expect(hasExactTitle).toBe(true);
    })

    test("it should return an empty array when the API call fails", async () => {
        const mockedAxios = jest.spyOn(axios, "get");
        const response = { data: { Search: [] } };
        mockedAxios.mockRejectedValueOnce(response)
        
        const searchText = "";
        const result = await getData(searchText)

        expect(result).toHaveLength(0);
    });
})