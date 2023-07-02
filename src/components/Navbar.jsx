import React from 'react';
import { styled } from 'styled-components';

const Navbar = () => {
    return (
        <Nav>
            <Logo>iWindy Chat</Logo>
            <User>
                <Image
                    src="https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg"
                    alt="user avatar"
                    loading="lazy"
                />
                <Username>Jenny</Username>
                <Button>Logout</Button>
            </User>
        </Nav>
    );
};

export default Navbar;

const Nav = styled.div`
    display: flex;
    align-items: center;
    background-color: #2f2d52;
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: #ddddf7;
`;

const Logo = styled.span`
    font-weight: bold;
    font-size: 15px;
`;

const User = styled.div`
    display: flex;
    gap: 10px;
`;

const Image = styled.img`
    background-color: #ddddf7;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
`;

const Username = styled.span``;

const Button = styled.button`
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 10px;
    border: none;
    cursor: pointer;
`;
