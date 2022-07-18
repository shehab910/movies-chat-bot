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
      const message = this.createChatbotMessage(
         "commands: \nactor \ngenre \nsearch \nsimillar"
      );
      this.addMessagetoState(message);
   }

   handleFindByActors() {
      const message = this.createChatbotMessage(
         "Enter the actors each in a line then search"
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
         "Enter the genres each in a line"
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
