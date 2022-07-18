class ActionProvider {
   constructor(createChatbotMessage, setStateFunc, createClientMessage) {
      this.createChatbotMessage = createChatbotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
   }

   handleHello() {
      const message = this.createChatbotMessage("Hello to you too");
      this.addMessagetoState(message);
   }

   handleRecommendMovies() {
      this.addMessagetoState(this.createChatbotMessage("commands:"));
      this.addMessagetoState(
         this.createChatbotMessage(
            "actor: recommends movies with actors you like"
         )
      );
      this.addMessagetoState(
         this.createChatbotMessage(
            "genre: recommends movies with genres you like"
         )
      );
      this.addMessagetoState(
         this.createChatbotMessage(
            "search: after you enter your favorite actors and genres enter search to see movies that fit your taste"
         )
      );
      this.addMessagetoState(
         this.createChatbotMessage(
            "simillar: recommends movies simillar to the movie you enter"
         )
      );
   }

   handleFindByActors() {
      const message = this.createChatbotMessage(
         "Enter the actors each in a line, then enter 'search'"
      );

      this.reset();
      this.setState((prev) => ({
         ...prev,
         gettingActorNames: true,
         actorNames: [],
      }));

      this.addMessagetoState(message);
   }

   handleFindByGenres() {
      const message = this.createChatbotMessage(
         "Enter the genres each in a line, then enter 'search'"
      );

      this.reset();
      this.setState((prev) => ({ ...prev, gettingGenres: true, genres: [] }));

      this.addMessagetoState(message);
   }

   handleSimillarMovies() {
      const message = this.createChatbotMessage(
         "Enter a movie you like to get recommendations!"
      );
      this.reset();
      this.setState((prev) => ({ ...prev, gettingMovie: true, movie: [] }));
      this.addMessagetoState(message);
   }

   handleSearch() {
      const message = this.createChatbotMessage(
         "Here are some movies with all the actors you entered",
         {
            widget: "RecommendMovies",
         }
      );
      this.addMessagetoState(message);
   }

   addMessagetoState = (message) => {
      // console.log(message);
      this.setState((prev) => {
         // console.log(prev);
         return {
            ...prev,
            messages: [...prev.messages, message],
         };
      });
   };
   reset() {
      this.setState((prev) => ({
         ...prev,
         gettingActorNames: false,
         gettingGenres: false,
         gettingMovie: false,
         movie: [],
      }));
   }
}

export default ActionProvider;
