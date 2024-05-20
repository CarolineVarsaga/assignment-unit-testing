import { movieSort } from "../ts/functions";

describe("functions tests", () => {
    test("it should sort movies in descending order", () => {
        const movies = [
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }, 
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'}
        ]

        const sortedMovies = movieSort(movies, true);

        expect(sortedMovies).toEqual([
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'},
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }            
        ])
    })

    test("it should sort movies in ascending order", () => {
        const movies = [
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' },
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' }, 
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'}
        ]

        const sortedMovies = movieSort(movies, false);

        expect(sortedMovies).toEqual([
            { Title: 'Star Wars', imdbID: 'tt0076759', Type: 'movie', Poster: 'N/A', Year: '1977' },  
            { Title: 'E.T. the Extra-Terrestrial', imdbID: 'tt0083866', Type: 'movie', Poster: 'N/A', Year: '1982'},
            { Title: 'Avengers: Endgame', imdbID: 'tt4154796', Type: 'movie', Poster: 'N/A', Year: '2019' }           
        ])
    })

    test("it should sort return 0 when titles are in equal order", () => {
        const movies = [
            { Title: 'The Avengers', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A', Year: '2012' },
            { Title: 'The Avengers', imdbID: 'tt2395427', Type: 'movie', Poster: 'N/A', Year: '2015' },
            { Title: 'The Avengers', imdbID: 'tt4154756', Type: 'movie', Poster: 'N/A', Year: '2018' } 
        ]

        const sortedMovies = movieSort(movies);

        expect(sortedMovies).toEqual([
            { Title: 'The Avengers', imdbID: 'tt0848228', Type: 'movie', Poster: 'N/A', Year: '2012' },
            { Title: 'The Avengers', imdbID: 'tt2395427', Type: 'movie', Poster: 'N/A', Year: '2015' },
            { Title: 'The Avengers', imdbID: 'tt4154756', Type: 'movie', Poster: 'N/A', Year: '2018' }           
        ])
    })
})