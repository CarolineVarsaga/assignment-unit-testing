import { getData } from "../ts/services/movieService";
import axios from "axios";
import { IMovie } from "../ts/models/Movie";

describe("getData tests", () => {    
    test("it should fetch data from API and return movies", async () => {
        const mockedAxios = jest.spyOn(axios, "get");
        const movies: IMovie[] = [
            { Title: 'Spider-Man', imdbID: 'tt0145487', Type: 'movie', Poster: 'url4', Year: '2002' },
            { Title: 'Spider-Man 2', imdbID: 'tt0316654', Type: 'movie', Poster: 'url5', Year: '2004' },
            { Title: 'Spider-Man 3', imdbID: 'tt0413300', Type: 'movie', Poster: 'url6', Year: '2007' }
        ]
        const response = { data: { Search: movies }}
        mockedAxios.mockResolvedValueOnce(response)

        const searchText = 'Spiderman'; 
        const result = await getData(searchText); 

        expect(result).toHaveLength(3); 
    })

    it('should return an empty array when the API call fails', async () => {
        const mockedAxios = jest.spyOn(axios, "get");
        mockedAxios.mockRejectedValueOnce([])
        
        const searchText = '';
        const result = await getData(searchText)

        expect(result).toHaveLength(0);
      });
})