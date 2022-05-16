import { useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import {discoverGeneral, getGenreNames, fetchMovieTrailerURL} from '../utils/apiUtils'
import MovieCard from "./UI/MovieCard";

function RecommendMovie({actorNames, genres, realeseDateGT}) {
   const [discoverValue, setDiscoverValue] = useState("");


   useEffectOnce(() => {
      return async () => {
         const disMovies = await discoverGeneral({actorNames, genres, realeseDateGT});

         const mappedMovies = disMovies.results.map( movie => {
            
            const posterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
            const movieUrl = `https://www.themoviedb.org/movie/${movie.id}`;
            const movieDetails = {
               title: movie.original_title,
               desc: movie.overview,
               posterUrl,
               genreIds: movie.genre_ids,
               id: movie.id,
               voteAvg: movie.vote_average,
               voteCount: movie.vote_count,
               movieUrl,
            }
            return movieDetails;
         });

         for (let i = 0; i < mappedMovies.length; i++) {
            const movie = mappedMovies[i];
            const genres = await getGenreNames(movie.genreIds);
            movie.genres = genres;
            const ytTrailerURL = await fetchMovieTrailerURL(movie.id);
            movie.trailerURL = ytTrailerURL;
         }

         const moviesList = (
               <ul className="movie-list-container">
                  {mappedMovies.map(movie => (
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
