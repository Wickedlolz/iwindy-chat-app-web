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
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    box-shadow: -1px 0px 3px 3px rgba(0, 0, 0, 0.29);
    -webkit-box-shadow: -1px 0px 3px 3px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: -1px 0px 3px 3px rgba(0, 0, 0, 0.29);
`;
