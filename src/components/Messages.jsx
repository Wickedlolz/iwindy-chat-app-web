import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useChatContext } from '../contexts/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { styled } from 'styled-components';

import Message from './Message';

const Messages = () => {
    const { currentUser } = useFirebaseContext();
    const { chat } = useChatContext();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (chat?.chatId) {
            const unsubscribe = onSnapshot(
                doc(db, 'chats', chat.chatId),
                (doc) => {
                    if (doc.exists()) {
                        setMessages(doc.data().messages);
                    }
                }
            );
            return () => unsubscribe();
        }
    }, [chat?.chatId]);

    return (
        <Container>
            {messages.map((message) => (
                <Message
                    key={message?.id}
                    isOwner={message?.senderId !== currentUser?.uid}
                    message={message}
                />
            ))}
        </Container>
    );
};

export default Messages;

const Container = styled.div`
    background-color: #ddddf7;
    padding: 10px;
    height: calc(100% - 100px);
    overflow: scroll;
`;
