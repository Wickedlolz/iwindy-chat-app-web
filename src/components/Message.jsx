import React from 'react';
import { styled } from 'styled-components';

const Message = ({ isOwner }) => {
    return (
        <MessageContainer owner={isOwner}>
            <MessageInfo>
                <Image
                    isAvatar={true}
                    src="https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg"
                    alt="user image"
                    loading="lazy"
                />
                <Time>Just now</Time>
            </MessageInfo>
            <MessageContent owner={isOwner}>
                <MessageText owner={isOwner}>Hello...</MessageText>
                <Image
                    src="https://cdn.pixabay.com/photo/2023/05/23/10/45/girl-8012460_1280.jpg"
                    alt="received image"
                    loading="lazy"
                />
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

const Time = styled.span``;

const MessageText = styled.p`
    background-color: #fff;
    padding: 10px 20px;
    max-width: max-content;
    border-radius: ${(props) =>
        !props.owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'};
`;
