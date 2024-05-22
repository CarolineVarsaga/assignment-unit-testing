import { IMovie } from "./../../models/Movie";

export const movies: IMovie[] = [
    { 
        Title: "Avengers", 
        imdbID: "1", 
        Type: "movie", 
        Poster: "N/A", 
        Year: "2012" 
    }, 
    { 
        Title: "Avengers", 
        imdbID: "2", 
        Type: "movie", 
        Poster: "N/A", 
        Year: "2018" 
    }, 
    { 
        Title: "Star Wars", 
        imdbID: "3", 
        Type: "movie", 
        Poster: "N/A", 
        Year: "1977" 
    }, 
    { 
        Title: "E.T. the Extra-Terrestrial", 
        imdbID: "4", 
        Type: "movie", 
        Poster: "N/A", 
        Year: "1982" 
    }
]

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise((resolve, reject) => {
        if (searchText === "") {
            reject([]);
        } else {
            resolve(movies);
        }
    });
}