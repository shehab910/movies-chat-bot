import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    initialMessages: [
        createChatBotMessage('Hi, how can I help you'),
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
    }
}

export default config;