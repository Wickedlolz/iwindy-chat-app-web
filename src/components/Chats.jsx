import React from 'react';
import { styled } from 'styled-components';

const Chats = () => {
    return (
        <Container>
            <UserChat>
                <Image
                    src="https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg"
                    alt="user avatar"
                    loading="lazy"
                />
                <UserChatInfo>
                    <DisplayName>Jenny</DisplayName>
                    <LastMessage>Hello...</LastMessage>
                </UserChatInfo>
            </UserChat>
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
