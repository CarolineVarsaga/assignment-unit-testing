import { init } from "../ts/movieApp";
import * as functions from "./../ts/functions";

describe("movieApp tests", () => {
    let mockedHandleSubmit: jest.SpyInstance<Promise<void>, []>;

    beforeEach( () => {
        document.body.innerHTML = `
            <form id="searchForm">
                <input type="text" id="searchText" placeholder="Skriv titel här" />
                <button type="submit" id="search">Sök</button>
            </form>
        `; 

        mockedHandleSubmit = jest.spyOn(functions, "handleSubmit").mockReturnValue(new Promise<void>((resolve) => {
            resolve();
        }));
    });

    afterEach(() => {
        mockedHandleSubmit.mockRestore();
    }); 

    test("it should call handleSubmit when form is submitted", () =>{
        const form = document.querySelector("#searchForm") as HTMLFormElement;

        init();       
        
        form.dispatchEvent(new Event("submit"));
    
        expect(mockedHandleSubmit).toHaveBeenCalledTimes(1);
    });
});