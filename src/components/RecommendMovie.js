import { useState } from "react";
import useEffectOnce from "../utils/useEffectOnce";
import {discoverGeneral} from '../utils/apiUtils'

function RecommendMovie({actorNames, genres, realeseDateGT}) {
   const [discoverValue, setDiscoverValue] = useState("");


   useEffectOnce(() => {
      return async () => {
         const disMovies = await discoverGeneral({actorNames, genres, realeseDateGT});
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
         <h2>Recommended Movies:</h2>
         {discoverValue}
      </>
   );
}

export default RecommendMovie;
