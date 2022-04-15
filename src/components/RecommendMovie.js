import { useMemo, useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import {discoverWithCast} from '../utils/apiUtils'

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

   useEffectOnce(() => {
      return async () => {
         const disMovies = await discoverWithCast(actorNames);
         setDiscoverValue(
            disMovies.results.map((movie, index) => {
               return (
                  <div key={index}>
                     <p>{movie.original_title}</p>
                  </div>
               );
            })
         );
      };
   });

   return (
      <>
         <div>RecommendMovie</div>
         {discoverValue}
      </>
   );
}

export default RecommendMovie;
