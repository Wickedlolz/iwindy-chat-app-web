import React, { useRef, useEffect } from 'react';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import { useChatContext } from '../contexts/ChatContext';
import { styled } from 'styled-components';

const Message = ({ isOwner, message }) => {
    const { currentUser } = useFirebaseContext();
    const { chat } = useChatContext();
    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]);

    return (
        <MessageContainer owner={isOwner} ref={ref}>
            <MessageInfo>
                <Image
                    isAvatar={true}
                    src={
                        message?.senderId === currentUser?.uid
                            ? currentUser.photoURL
                            : chat.user.photoURL
                    }
                    alt="user image"
                    loading="lazy"
                />
                <Time>
                    {new Date(
                        message.date.seconds * 1000 +
                            message.date.nanoseconds / 1e6
                    ).toLocaleString()}
                </Time>
            </MessageInfo>
            <MessageContent owner={isOwner}>
                <MessageText owner={isOwner}>{message?.text}</MessageText>
                {message?.image && (
                    <Image
                        src={message.image}
                        alt="received image"
                        loading="lazy"
                    />
                )}
            </MessageContent>
        </MessageContainer>
    );
};

export default Message;

const MessageContainer = styled.div`
    display: flex;
    gap: 20px;
    flex-direction: ${(props) => (!props.owner ? 'row-reverse' : 'row')};
    margin-bottom: 15px;
`;

const MessageInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: gray;
    font-weight: 300;
    margin-bottom: 20px;
`;

const MessageContent = styled.div`
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: ${(props) => (!props.owner ? 'flex-end' : '')};
`;

const Image = styled.img`
    width: ${(props) => (props.isAvatar ? '40px' : '50%')};
    height: ${(props) => (props.isAvatar ? '40px' : '')};
    border-radius: ${(props) => (props.isAvatar ? '50%' : '')};
    object-fit: cover;
`;

const Time = styled.p`
    text-align: center;
    font-size: 9px;
    margin-top: 3px;
`;

const MessageText = styled.p`
    background-color: #fff;
    padding: 10px 20px;
    max-width: max-content;
    border-radius: ${(props) =>
        !props.owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'};
`;
