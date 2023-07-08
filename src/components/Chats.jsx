import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useChatContext } from '../contexts/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase-config';
import { styled } from 'styled-components';

const Chats = () => {
    const { currentUser } = useFirebaseContext();
    const { dispatch } = useChatContext();
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (currentUser?.uid) {
            const unsubscribe = onSnapshot(
                doc(db, 'userChats', currentUser.uid),
                (doc) => {
                    setChats(doc.data());
                }
            );

            return () => unsubscribe();
        }
    }, [currentUser?.uid]);

    const handleSelect = (userInfo) => {
        dispatch({ type: 'CHANGE_USER', payload: userInfo });
    };

    return (
        <Container>
            {chats &&
                Object.entries(chats)
                    ?.sort((a, b) => b[1].date - a[1].date)
                    .map((chat) => (
                        <UserChat
                            key={chat[0]}
                            onClick={() => handleSelect(chat[1]?.userInfo)}
                        >
                            <Image
                                src={chat[1]?.userInfo?.photoURL}
                                alt="user avatar"
                                loading="lazy"
                            />
                            <UserChatInfo>
                                <DisplayName>
                                    {chat[1]?.userInfo?.displayName}
                                </DisplayName>
                                <LastMessage>
                                    {chat[1]?.lastMessage?.text}
                                </LastMessage>
                            </UserChatInfo>
                        </UserChat>
                    ))}
        </Container>
    );
};

export default Chats;

const Container = styled.div``;

const UserChat = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
    cursor: pointer;

    &:hover {
        background-color: #2f2d52;
    }
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
`;

const UserChatInfo = styled.div`
    font-size: 18px;
    font-weight: 500;
`;

const DisplayName = styled.span``;

const LastMessage = styled.p`
    font-size: 14px;
    color: lightgray;
`;
