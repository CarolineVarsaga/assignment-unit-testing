import { getData } from "../ts/services/movieService";

describe("getData tests", () => {
    test("it should return data from the API", async () => {
        const searchText = "Avengers";    
        const response = await getData(searchText);    

        expect(response.length).toBeGreaterThan(0);
    })

    test("it should return falsy for an ivalid search text", async () => {
        const searchText = ''; 
        const response = await getData(searchText);   

        expect(response).toBeFalsy(); 
    })
})