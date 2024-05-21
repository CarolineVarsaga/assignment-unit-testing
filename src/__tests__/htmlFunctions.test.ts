import { IMovie } from "../ts/models/Movie";
import { createHtml } from "../ts/htmlFunctions";
import { displayNoResult } from "../ts/htmlFunctions";

describe("createHtml", () => {
    let container: HTMLDivElement;
    let movies: IMovie[];
  
    beforeEach(() => {
      container = document.createElement("div");
      movies = [
        { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' },  
        { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'},
        { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' }  
      ];
    });
  
    test("it should create and append movie elements to container", () => {
      createHtml(movies, container);
  
      for (let i = 0; i < movies.length; i++) {
        const movieElement = container.children[i];
        expect(movieElement.tagName).toBe("DIV");
        expect(movieElement.classList.contains("movie")).toBe(true);
  
        const titleElement = movieElement.querySelector("h3");
        const imgElement = movieElement.querySelector("img");
  
        expect(titleElement).not.toBeNull();
        expect(titleElement?.innerHTML).toBe(movies[i].Title);
  
        expect(imgElement).not.toBeNull();
        expect(imgElement?.src).toContain(movies[i].Poster);
        expect(imgElement?.alt).toBe(movies[i].Title);

        expect(container.children.length).toBe(movies.length);
      }
    });

    test('should create and append a no result message to the container', () => {
        displayNoResult(container);
    
        expect(container.children.length).toBe(1);
    
        const noMessageElement = container.children[0];
        expect(noMessageElement.tagName).toBe('P');
        expect(noMessageElement.innerHTML).toBe('Inga sökresultat att visa');
      });
    
      test('should append the no result message to an existing container', () => {
        const existingElement = document.createElement('div');
        container.appendChild(existingElement);
    
        displayNoResult(container);
    
        expect(container.children.length).toBe(2);
    
        const noMessageElement = container.children[1];
        expect(noMessageElement.tagName).toBe('P');
        expect(noMessageElement.innerHTML).toBe('Inga sökresultat att visa');
      });
  });