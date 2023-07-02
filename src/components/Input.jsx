import React from 'react';
import { styled } from 'styled-components';

import AddImage from '../assets/img.png';
import AttachImage from '../assets/attach.png';

const Input = () => {
    return (
        <Container>
            <InputField type="text" placeholder="Type something..." />
            <Send>
                <Image src={AttachImage} alt="attach image" loading="lazy" />
                <InputField type="file" id="file" isFile={true} />
                <LabelImage htmlFor="file">
                    <Image src={AddImage} alt="add image" loading="lazy" />
                </LabelImage>
                <Button>Send</Button>
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
    display: ${(props) => (props.isFile ? 'none' : '')};
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
