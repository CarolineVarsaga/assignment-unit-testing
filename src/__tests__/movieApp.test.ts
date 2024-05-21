import { init } from "../ts/movieApp";
import * as functions from "./../ts/functions";

describe("movieApp tests", () => {
   let mockedHandleSubmit: jest.SpyInstance<Promise<void>, []>;

    beforeEach(() => {
        mockedHandleSubmit = jest.spyOn(functions, "handleSubmit");        
        document.body.innerHTML = `
            <form id="searchForm">
                <input type="text" id="searchText" value="Avengers" placeholder="Skriv titel här" />
                <button type="submit" id="search">Sök</button>
            </form>
        `        
        init(); 
    })

    afterEach(() => {
        mockedHandleSubmit.mockRestore();
    });
    
    test("it should call handleSubmit when form is submitted", () => {     
       
        expect(mockedHandleSubmit).toHaveBeenCalled();
    })
})
