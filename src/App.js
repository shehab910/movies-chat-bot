import ChatbotFlaotingBtn from "./components/ChatbotFlaotingBtn/ChatbotFlaotingBtn";
import './index.css';
import { discoverGeneral, fetchGenreIds } from "./utils/apiUtils";
import useEffectOnce from "./utils/useEffectOnce";

//TESTING
const ALL_GENRES = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Family", "Fantasy", "History", "Horror", "Music", "Mystery", "Romance", "Sci-Fi", "Short", "Sport", "Thriller", "War", "Western"];
const genres = ["Action", "comedy"];
const actorNames = ["Kevin Hart", "dwayne johnson"];

function App() {
  
  // useEffectOnce(() => {
  //   return async () => {
  //     const disMovies = await discoverGeneral({actorNames, genres});
  //     console.log(disMovies);
  //   };
  // })

  return (
    <div className="main-cointainer">
      <ChatbotFlaotingBtn />
    </div>
  )
}

export default App;
