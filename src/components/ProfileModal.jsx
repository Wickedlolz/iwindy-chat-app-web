import React from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { styled } from 'styled-components';

const ProfileModal = () => {
    const { currentUser } = useFirebaseContext();

    return (
        <Container>
            <Image
                src={currentUser?.photoURL}
                alt={currentUser?.displayName}
                loading="lazy"
            />
            <Username>{currentUser?.displayName}</Username>
            <UserEmail>{currentUser?.email}</UserEmail>
            <Button>Edit</Button>
        </Container>
    );
};

export default ProfileModal;

const Container = styled.div`
    position: absolute;
    top: 45px;
    left: 250px;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    background-color: #ddddf7;
    color: #000;
    width: 150px;
    height: 200px;
`;

const Username = styled.p`
    margin-top: 5px;
    text-align: center;
    font-weight: bold;
`;

const UserEmail = styled.p`
    margin-top: 5px;
    font-size: 13px;
    text-align: center;
    border: 1px solid black;
    border-radius: 20px;
    width: 90%;
    margin-inline: auto;
    padding: 5px;
`;

const Image = styled.img`
    background-color: #ddddf7;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    margin-top: 5px;
    margin-inline: auto;
`;

const Button = styled.button`
    display: block;
    width: 90%;
    margin-top: 10px;
    margin-inline: auto;
    border: none;
    border-radius: 10px;
    outline: none;
    background-color: #5d5b8d;
    color: #fff;
    cursor: pointer;
    padding: 5px;

    &:hover {
        background-color: #717093;
    }
`;
