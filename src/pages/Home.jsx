import React from 'react';
import styled from 'styled-components';

import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

const Home = () => {
    return (
        <Container>
            <Wrapper>
                <Sidebar />
                <Chat />
            </Wrapper>
        </Container>
    );
};

export default Home;

const Container = styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    border: 1px solid #fff;
    border-radius: 10px;
    width: 80%;
    height: 80%;
    display: flex;
    overflow: hidden;
`;
