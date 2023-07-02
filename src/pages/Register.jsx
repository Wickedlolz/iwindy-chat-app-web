import React from 'react';
import styled from 'styled-components';

import AddImage from '../assets/addAvatar.png';

const Register = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Container>
            <Wrapper>
                <Logo>iWidy Chat</Logo>
                <Title>Register</Title>
                <Form onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Display Name" />
                    <Input type="email" placeholder="Email" />
                    <Input type="password" placeholder="Password" />
                    <Input type="file" isFile={true} id="file" />
                    <ImageLabel htmlFor="file">
                        <Image src={AddImage} alt="add image" loading="lazy" />
                        <Title>Add an avatar</Title>
                    </ImageLabel>
                    <Button>Sign Up</Button>
                </Form>
                <LoginLink>You do have an account? Login</LoginLink>
            </Wrapper>
        </Container>
    );
};

export default Register;

const Container = styled.div`
    background-color: #a7bcff;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    background-color: #fff;
    padding: 20px 60px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Logo = styled.span`
    color: #5d5b8d;
    font-weight: bold;
    font-size: 24px;
`;

const Title = styled.span`
    color: #5d5b8d;
    font-size: 12px;
`;

const Input = styled.input`
    width: 300px;
    display: ${(props) => (props.isFile ? 'none' : '')};
    padding: 15px;
    border: none;
    outline: none;
    border-bottom: 1px solid #a7bcff;

    &::placeholder {
        color: rgb(175, 175, 175);
    }
`;

const ImageLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Button = styled.button`
    background-color: #7b96ec;
    color: #fff;
    padding: 10px;
    font-weight: bold;
    border: none;
    cursor: pointer;
`;

const Image = styled.img`
    width: 32px;
`;

const LoginLink = styled.p`
    color: #5d5d8d;
    font-size: 12px;
    margin-top: 10px;
`;
