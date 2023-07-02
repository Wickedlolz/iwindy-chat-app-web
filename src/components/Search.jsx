import React from 'react';
import { styled } from 'styled-components';

const Search = () => {
    return (
        <Container>
            <SearchForm>
                <Input placeholder="Find a user.." />
            </SearchForm>
            <UserChat>
                <Image
                    src="https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg"
                    alt="user avatar"
                    loading="lazy"
                />
                <UserChatInfo>
                    <DisplayName>Jenny</DisplayName>
                </UserChatInfo>
            </UserChat>
        </Container>
    );
};

export default Search;

const Container = styled.div`
    border-bottom: 1px solid gray;
`;

const SearchForm = styled.div`
    padding: 10px;
`;

const Input = styled.input`
    background-color: transparent;
    border: none;
    color: #fff;
    outline: none;

    &::placeholder {
        color: lightgray;
    }
`;

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

const UserChatInfo = styled.div``;

const DisplayName = styled.span``;
