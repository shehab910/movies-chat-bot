const COMMANDS = ["actor", "genre", "recommend", "hello", "simillar"];
class MessageParser {
   constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
   }

   parse(message) {
      message = message.toLowerCase();

      if (COMMANDS.includes(message)) {
         if (message.includes("hello")) this.actionProvider.handleHello();

         if (message.includes("actor"))
            this.actionProvider.handleFindByActors();

         if (message.includes("genre"))
            this.actionProvider.handleFindByGenres();

         if (message.includes("recommend"))
            this.actionProvider.handleRecommendMovies();
         if (message.includes("simillar"))
            this.actionProvider.handleSimillarMovies();
      } else {
         if (this.state.gettingMovie) {
            this.state.movie.push(message);
            this.actionProvider.handleSearch();
         }
         if (this.state.gettingActorNames && !message.includes("search")) {
            this.state.actorNames.push(message);
         }
         if (this.state.gettingGenres && !message.includes("search")) {
            this.state.genres.push(message);
         }
         if (
            (this.state.gettingActorNames || this.state.gettingGenres) &&
            message.includes("search")
         ) {
            this.actionProvider.reset();
            this.actionProvider.handleSearch();
         }
      }
   }
}

export default MessageParser;
