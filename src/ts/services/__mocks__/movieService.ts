import { IMovie } from "./../../models/Movie";

export const getData = async (searchText: string): Promise<IMovie[]> => {
    if (searchText === 'Avengers') {
        return Promise.resolve([
            { Title: 'The Avengers', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A', Year: '2012' },
            { Title: 'The Avengers', imdbID: 'tt2395427', Type: 'movie', Poster: 'N/A', Year: '2015' },
            { Title: 'The Avengers', imdbID: 'tt4154756', Type: 'movie', Poster: 'N/A', Year: '2018' } 
        ]);
    } else if (searchText === 'Spider-man') {
        return Promise.resolve([
            { Title: 'Spider-Man', imdbID: 'tt0145487', Type: 'movie', Poster: 'url4', Year: '2002' },
            { Title: 'Spider-Man 2', imdbID: 'tt0316654', Type: 'movie', Poster: 'url5', Year: '2004' },
            { Title: 'Spider-Man 3', imdbID: 'tt0413300', Type: 'movie', Poster: 'url6', Year: '2007' }
        ]);
    } else {
        return Promise.resolve([]); 
    }
};