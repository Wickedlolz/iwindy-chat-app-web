import React, { useState, useEffect } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    serverTimestamp,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { db } from '../firebase-config';
import { styled } from 'styled-components';

const Search = () => {
    const { currentUser } = useFirebaseContext();
    const [username, setUsername] = useState('');
    const [foundedUser, setFoundedUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (username === '') {
            setFoundedUser(null);
            setError(false);
        }
    }, [username]);

    const handleSearch = async () => {
        const queryString = query(
            collection(db, 'users'),
            where('displayName', '==', username)
        );

        try {
            const querySnapshot = await getDocs(queryString);

            if (querySnapshot.empty) {
                setError(true);
            } else {
                querySnapshot.forEach((doc) => {
                    setFoundedUser(doc.data());
                });
                setError(false);
            }
        } catch (error) {
            setError(true);
        }
    };

    const handleSelect = async () => {
        const combinedIds =
            currentUser.uid > foundedUser.uid
                ? currentUser.uid + foundedUser.uid
                : foundedUser.uid + currentUser.uid;

        try {
            const response = await getDoc(doc(db, 'chats', combinedIds));
            if (!response.exists()) {
                await setDoc(doc(db, 'chats', combinedIds), { messages: [] });
                await updateDoc(doc(db, 'userChats', currentUser.uid), {
                    [combinedIds + '.userInfo']: {
                        uid: foundedUser.uid,
                        displayName: foundedUser.displayName,
                        photoURL: foundedUser.photoURL,
                    },
                    [combinedIds + '.data']: serverTimestamp(),
                });
                await updateDoc(doc(db, 'userChats', foundedUser.uid), {
                    [combinedIds + '.userInfo']: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combinedIds + '.data']: serverTimestamp(),
                });
            }

            setFoundedUser(null);
            setUsername('');
        } catch (error) {
            console.log('error from selected user: ', error);
        }
    };

    const handleEnter = (event) => {
        if (event.code === 'Enter') {
            handleSearch();
        }
    };

    return (
        <Container>
            <SearchForm>
                <Input
                    placeholder="Find a user.."
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    onKeyDown={handleEnter}
                />
            </SearchForm>
            {error && <ErrorText>User not found!</ErrorText>}
            {foundedUser && (
                <UserChat onClick={handleSelect}>
                    <Image
                        src={foundedUser?.photoURL}
                        alt="user avatar"
                        loading="lazy"
                    />
                    <UserChatInfo>
                        <DisplayName>{foundedUser?.displayName}</DisplayName>
                    </UserChatInfo>
                </UserChat>
            )}
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

const ErrorText = styled.p`
    color: red;
    text-align: center;
`;
