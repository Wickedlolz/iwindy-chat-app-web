import React, { useState } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useChatContext } from '../contexts/ChatContext';
import {
    updateDoc,
    doc,
    arrayUnion,
    Timestamp,
    serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../firebase-config';
import { v4 } from 'uuid';
import { styled } from 'styled-components';

import AddImage from '../assets/img.png';
import AttachImage from '../assets/attach.png';

const Input = () => {
    const { currentUser } = useFirebaseContext();
    const { chat } = useChatContext();
    const [text, setText] = useState('');
    const [image, setImage] = useState();

    const handleSend = async () => {
        if (image) {
            const storageRef = ref(storage, `/images/${v4()}`);
            const uploadTask = uploadBytesResumable(storageRef, image);
            uploadTask.on(
                (error) => {},
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        async (downloadUrl) => {
                            await updateDoc(doc(db, 'chats', chat.chatId), {
                                messages: arrayUnion({
                                    id: v4(),
                                    text,
                                    senderId: currentUser.uid,
                                    date: Timestamp.now(),
                                    image: downloadUrl,
                                }),
                            });
                        }
                    );
                }
            );
        } else {
            await updateDoc(doc(db, 'chats', chat.chatId), {
                messages: arrayUnion({
                    id: v4(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
            [chat.chatId + '.lastMessage']: {
                text,
            },
            [chat.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', chat.user.uid), {
            [chat.chatId + '.lastMessage']: {
                text,
            },
            [chat.chatId + '.date']: serverTimestamp(),
        });

        setText('');
        setImage(null);
    };

    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <Container>
            <InputField
                type="text"
                placeholder="Type something..."
                value={text}
                onChange={(event) => setText(event.target.value)}
                onKeyDown={handleEnter}
            />
            <Send>
                <Image src={AttachImage} alt="attach image" loading="lazy" />
                <InputFile
                    type="file"
                    id="file"
                    onChange={(event) => setImage(event.target.files[0])}
                />
                <LabelImage htmlFor="file">
                    <Image src={AddImage} alt="add image" loading="lazy" />
                </LabelImage>
                <Button onClick={handleSend}>Send</Button>
            </Send>
        </Container>
    );
};

export default Input;

const Container = styled.div`
    height: 50px;
    background-color: #fff;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InputField = styled.input`
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
        color: lightgray;
    }
`;

const InputFile = styled.input`
    display: none;
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
        color: lightgray;
    }
`;

const Send = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Image = styled.img`
    width: 40px;
    height: 24px;
    cursor: pointer;
`;

const LabelImage = styled.label``;

const Button = styled.button`
    border: none;
    padding: 5px 10px;
    color: #fff;
    background-color: #8da4f1;
    border-radius: 4px;
`;
