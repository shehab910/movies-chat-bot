import makeFetchUrl from "../utils/makeFetchUrl";

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

export const fetchGenreIds = async (genreNames) => {
   //make sure format is correct
   genreNames = genreNames.map((genre) => genre.trim().toLowerCase());

   const genreUrl = makeFetchUrl("/genre/movie/list");
   const response = await fetch(genreUrl);
   const data = await response.json();

   const genreIdsMap = {};
   data.genres.forEach((genreAndID) => genreIdsMap[genreAndID.name.toLowerCase()] = genreAndID.id);
   
   const genreIds = genreNames.map((genreName) =>  genreIdsMap[genreName.toLowerCase()] );

   const genreIdsJoined = genreIds.join(",");
   return genreIdsJoined;
}

export const discoverWithCast = async (actorNames) => {
   const actorIdsJoined = await fetchActorsIds(actorNames);
   const url = makeFetchUrl("discover/movie", { with_cast: actorIdsJoined });
   const res = await fetch(url);
   const disMovies = await res.json();
   return disMovies;
};
export const discoverGeneral = async ({ actorNames, genres, realeseDateGT}) => {
   const actorIdsJoined = actorNames === undefined ? undefined : await fetchActorsIds(actorNames);
   const genreIdsJoined = genres === undefined ? undefined : await fetchGenreIds(genres);
   console.log(actorIdsJoined);
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
   return disMovies;

}
