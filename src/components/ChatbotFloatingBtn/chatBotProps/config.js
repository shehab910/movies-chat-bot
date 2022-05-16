import { createChatBotMessage } from "react-chatbot-kit";
import RecommendMovie from "../../RecommendMovie";

const config = {
    initialMessages: [
        createChatBotMessage('Hi, how can I help you'),
        createChatBotMessage('Type "recommend" to display commands'),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: '#376B7E',
        },
        chatButton: {
            backgroundColor: '#5ccc9d',
        }
    },
    customElements: {
        header: () => <div></div>,
        userAvatar: () => <div></div>,
    },
    state: {
        actorNames: [],
        gettingActorNames: false,
        genres: [],
        gettingGenres: false,
    },
    widgets: [
        {
            widgetName: 'RecommendMovies',
            widgetFunc: (props) => <RecommendMovie {...props} />,
            mapStateToProps: ["actorNames", "genres"],
        }
    ]
}

export default config;