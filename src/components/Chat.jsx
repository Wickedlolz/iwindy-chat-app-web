import React from 'react';
import { styled } from 'styled-components';

import Messages from './Messages';
import Input from './Input';

import CamImage from '../assets/cam.png';
import AddImage from '../assets/add.png';
import MoreImage from '../assets/more.png';

const Chat = () => {
    return (
        <Container>
            <ChatInfo>
                <Username>Jenny</Username>
                <ChatIcons>
                    <Image src={CamImage} alt="cam image" loading="lazy" />
                    <Image src={AddImage} alt="add image" loading="lazy" />
                    <Image src={MoreImage} alt="more image" loading="lazy" />
                </ChatIcons>
            </ChatInfo>
            <Messages />
            <Input />
        </Container>
    );
};

export default Chat;

const Container = styled.div`
    flex: 2;
`;

const ChatInfo = styled.div`
    height: 50px;
    background-color: #5d5b8d;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: lightgray;
`;

const Username = styled.span``;

const ChatIcons = styled.div`
    display: flex;
    gap: 10px;
`;

const Image = styled.img`
    height: 24px;
    cursor: pointer;
`;
