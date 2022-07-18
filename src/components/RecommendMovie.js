import { useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import {
   discoverGeneral,
   getGenreNames,
   fetchMovieTrailerURL,
   getSimillarMovies,
} from "../utils/apiUtils";
import MovieCard from "./UI/MovieCard";

function RecommendMovie(props) {
   const [discoverValue, setDiscoverValue] = useState("");
   const { actorNames, genres, realeseDateGT } = props;
   const [movieName] = props.movie;

   useEffectOnce(() => {
      // console.log("------------------");
      // console.log(realeseDateGT);
      // console.log(movie);
      return async () => {
         let movies;
         if (props.movie.length === 0) {
            console.log(actorNames);
            movies = await discoverGeneral({
               actorNames,
               genres,
               realeseDateGT,
            });
         } else {
            movies = await getSimillarMovies(movieName);
            console.log(movies);
         }

         // const movies = await discoverGeneral({
         //    actorNames,
         //    genres,
         //    realeseDateGT,
         // });

         // const movies = await getSimillarMovies(movieName);

         const mappedMovies = movies.results.map((movie) => {
            const posterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            const movieDetails = {
               title: movie.original_title,
               desc: movie.overview,
               posterUrl,
               genreIds: movie.genre_ids,
               id: movie.id,
               voteAvg: movie.vote_average,
               voteCount: movie.vote_count,
            };
            return movieDetails;
         });
         console.log(mappedMovies);

         for (let i = 0; i < mappedMovies.length; i++) {
            const movie = mappedMovies[i];
            const genres = await getGenreNames(movie.genreIds);
            // console.log(movie.genreIds);
            // console.warn(genres);
            movie.genres = genres;
            const ytTrailerURL = await fetchMovieTrailerURL(movie.id);
            movie.trailerURL = ytTrailerURL;
         }

         const moviesList = (
            <ul className="movie-list-container">
               {mappedMovies.map((movie) => (
                  <MovieCard key={movie.id} movieDetails={movie} />
               ))}
            </ul>
         );
         setDiscoverValue(moviesList);
      };
   });

   return (
      <>
         <h2>Recommended Movies:</h2>
         {discoverValue}
      </>
   );
}

export default RecommendMovie;
