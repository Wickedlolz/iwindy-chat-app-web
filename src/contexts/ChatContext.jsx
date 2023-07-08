import React, { createContext, useContext, useReducer } from 'react';
import { useFirebaseContext } from './FirebaseContext';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useFirebaseContext();
    const INITIAL_STATE = {
        chatId: null,
        user: {},
    };

    const chatReducer = (state, action) => {
        switch (action.type) {
            case 'CHANGE_USER':
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid
                            ? currentUser.uid + action.payload.uid
                            : action.payload.uid + currentUser.uid,
                };
            case 'CLEAR_USER':
                return INITIAL_STATE;
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    return (
        <ChatContext.Provider value={{ chat: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChatContext = () => {
    const state = useContext(ChatContext);
    return state;
};
