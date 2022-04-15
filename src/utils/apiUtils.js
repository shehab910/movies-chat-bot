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

export const discoverWithCast = async (actorNames) => {
   const actorIdsJoined = await fetchActorsIds(actorNames);
   const url = makeFetchUrl("discover/movie", { with_cast: actorIdsJoined });
   const res = await fetch(url);
   const disMovies = await res.json();
   return disMovies;
};
