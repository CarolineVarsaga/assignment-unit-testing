import { IMovie } from "./../../models/Movie";

export const movies: IMovie[] = [
    { 
        Title: "Avengers", 
        imdbID: "1", 
        Type: "movie", 
        Poster: "N/A", 
        Year: "2012" 
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