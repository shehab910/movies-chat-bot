import { useEffect, useMemo, useState } from "react";
const MAIN_URL = "https://api.themoviedb.org/3/";

function RecommendMovie() {
   const [discoverValue, setDiscoverValue] = useState("");

   const actorNames = useMemo(
      () => [
         "scarlett johansson",
         "robert downey jr",
         "chris evans",
         "mark ruffalo",
      ],
      []
   );
   useEffect(() => {
      fetchActorsIds(actorNames);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   async function fetchActorsIds(arr) {
      let actorsArr = [];
      for (let i = 0; i < arr.length; i++) {
         const actor = arr[i];
         const encodedName = encodeURIComponent(actor);
         const personUrl = `${MAIN_URL}search/person?query=${encodedName}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`;
         const response = await fetch(personUrl);
         const data = await response.json();
         actorsArr = [...actorsArr, data.results[0].id];
      }
      const actorsJoined = actorsArr.join(",");
      discoverWithCast(actorsJoined);
   }

   const discoverWithCast = async (actorsJoined) => {
      const url = `${MAIN_URL}discover/movie?with_cast=${actorsJoined}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_video=false&page=1`;
      const res = await fetch(url);
      const dis = await res.json();
      setDiscoverValue(
         dis.results.map((movie, index) => {
            return (
               <div key={index}>
                  <p>{movie.original_title}</p>
               </div>
            );
         })
      );
   };
   
   return (
      <>
         <div>RecommendMovie</div>
         {discoverValue}
      </>
   );
}

export default RecommendMovie;
