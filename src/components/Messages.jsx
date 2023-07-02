import React from 'react';
import { styled } from 'styled-components';

import Message from './Message';

const Messages = () => {
    return (
        <Container>
            <Message isOwner={true} />
            <Message isOwner={false} />
            <Message isOwner={true} />
            <Message isOwner={false} />
            <Message isOwner={true} />
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
