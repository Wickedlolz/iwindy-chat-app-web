import React from 'react';
import { styled } from 'styled-components';

import Navbar from '../components/Navbar';
import Search from '../components/Search';
import Chats from '../components/Chats';

const Sidebar = () => {
    return (
        <Container>
            <Navbar />
            <Search />
            <Chats />
        </Container>
    );
};

export default Sidebar;

const Container = styled.div`
    flex: 1;
    background-color: #3e3c61;
`;
