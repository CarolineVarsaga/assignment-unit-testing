import { createHtml } from "../ts/htmlFunctions";
import { displayNoResult } from "../ts/htmlFunctions";
import { movies } from "../ts/services/__mocks__/movieService";

describe("htmlFunctions tests", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
  });

  test("it should create and append movie elements to container", () => {
    createHtml(movies, container);
  
    expect(container.children.length).toBe(4);

    for (let i = 0; i < movies.length; i++) {
      const movieDiv = container.children[i] as HTMLDivElement;
      const title = movieDiv.querySelector("h3") as HTMLHeadingElement;
      const img = movieDiv.querySelector("img") as HTMLImageElement;
      
      expect(movieDiv.classList.contains("movie")).toBe(true); 
      expect(title.textContent).toBe(movies[i].Title); 
      expect(img.src).toContain(movies[i].Poster); 
      expect(img.alt).toBe(movies[i].Title);
    }
  });
  
  test("it should append the no result-message to an existing container", () => {    
    displayNoResult(container);

    expect(container.children.length).toBe(1); 
    expect(container.children[0].tagName).toBe("P"); 
    expect(container.children[0].textContent).toBe("Inga sökresultat att visa");
  });
});