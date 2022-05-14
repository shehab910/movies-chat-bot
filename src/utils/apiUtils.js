import makeFetchUrl from "../utils/makeFetchUrl";

const genreIdsMap = {};


export const fetchActorsIds = async (actorNames) => {
   let actorsIds = [];
   for (let i = 0; i < actorNames.length; i++) {
      const actor = actorNames[i];
      const encodedName = encodeURIComponent(actor);
      const personUrl = makeFetchUrl("search/person", {
         query: encodedName,
      });
      const response = await fetch(personUrl);
      const data = await response.json();
      actorsIds = [...actorsIds, data.results[0].id];
   }
   const actorIdsJoined = actorsIds.join(",");
   return actorIdsJoined;
};

export const fetchMovieCredits = async (movieId) => {
   const movieCreditsUrl = makeFetchUrl(`/movie/${movieId}/credits`);
   const res = await fetch(movieCreditsUrl);
   const data = await res.json();
   console.log(data);
   return data;
};

export const fetchMovieTrailerURL = async (movieId) => {
   const movieTrailerUrl = makeFetchUrl(`/movie/${movieId}/videos`);
   const res = await fetch(movieTrailerUrl);
   const data = await res.json();
   const result = data.results.find((result) => result.type === "Trailer");
   const youtubeURL = `https://www.youtube.com/watch?v=${result.key}`;
   console.log(youtubeURL);
   return youtubeURL;
};

export const fetchGenreIdsMap = async () => {
   const genreUrl = makeFetchUrl("/genre/movie/list");
   const response = await fetch(genreUrl);
   const data = await response.json();
   data.genres.forEach((genreAndID) => genreIdsMap[genreAndID.name.toLowerCase()] = genreAndID.id);
}

export const getGenreIds = async (genreNames) => {
   if(genreNames.length === 0) 
      await fetchGenreIdsMap();
   //make sure format is correct
   genreNames = genreNames.map((genre) => genre.trim().toLowerCase());
   const genreIds = genreNames.map((genreName) =>  genreIdsMap[genreName.toLowerCase()] );

   const genreIdsJoined = genreIds.join(",");
   return genreIdsJoined;
}

export const getGenreNames = async (genreIds) => {
   if(genreIds.length === 0) 
      await fetchGenreIdsMap();
   const genreNames = genreIds.map((genreId) => Object.keys(genreIdsMap).find(key => genreIdsMap[key] === genreId));
   return genreNames;
}

export const discoverWithCast = async (actorNames) => {
   const actorIdsJoined = await fetchActorsIds(actorNames);
   const url = makeFetchUrl("discover/movie", { with_cast: actorIdsJoined });
   const res = await fetch(url);
   const disMovies = await res.json();
   return disMovies;
};

export const discoverGeneral = async ({ actorNames, genres, realeseDateGT, resultsLimit = 5}) => {
   const actorIdsJoined = actorNames === undefined ? undefined : await fetchActorsIds(actorNames);
   const genreIdsJoined = genres === undefined ? undefined : await getGenreIds(genres);
   // console.log(actorIdsJoined);
   const queryParams = {};
   if (actorIdsJoined) 
      queryParams.with_cast = actorIdsJoined;
   if (genreIdsJoined)
      queryParams.with_genres = genreIdsJoined;
   // if (realeseDateGT)
   //    queryParams["release_date.gte"] = realeseDateGT;

   const url = makeFetchUrl("discover/movie", queryParams);
   console.log(url);
   const res = await fetch(url);
   const disMovies = await res.json();
   disMovies.results = disMovies.results.slice(0, resultsLimit);
   return disMovies;

}
