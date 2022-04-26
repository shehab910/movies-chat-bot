import ChatbotFlaotingBtn from "./components/ChatbotFlaotingBtn/ChatbotFlaotingBtn";
import GuessMovie from "./components/GuessMovie";
import RecommendMovie from "./components/RecommendMovie";
import './index.css';

function App() {

  return (
    <div className="main-cointainer">
      <RecommendMovie />
      <hr />
      <GuessMovie />
      <ChatbotFlaotingBtn/>
    </div>
  )
}

export default App;
