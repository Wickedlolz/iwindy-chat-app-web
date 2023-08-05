import React, { useState } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useChatContext } from '../contexts/ChatContext';
import { styled } from 'styled-components';

import ProfileModal from './ProfileModal';

const Navbar = () => {
    const { currentUser, logOut } = useFirebaseContext();
    const { dispatch } = useChatContext();
    const [openProfile, setOpenProfile] = useState(false);

    const handleLogout = async () => {
        dispatch({ type: 'CLEAR_USER' });
        await logOut();
    };

    const handleOpenProfile = () => {
        setOpenProfile((state) => !state);
    };

    return (
        <Nav>
            {openProfile && <ProfileModal />}
            <Logo>iWindy Chat</Logo>
            <User>
                <Image
                    src={currentUser?.photoURL}
                    alt="user avatar"
                    loading="lazy"
                    onClick={handleOpenProfile}
                />
                <Username>{currentUser?.displayName}</Username>
                <Button onClick={handleLogout}>Logout</Button>
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
    cursor: default;
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
    cursor: pointer;
`;

const Username = styled.span``;

const Button = styled.button`
    background-color: #5d5b8d;
    color: #ddddf7;
    font-size: 10px;
    border: none;
    cursor: pointer;
    margin-left: 15px;
    border-radius: 5px;

    &:hover {
        background-color: #717093;
    }
`;
