import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import styled from 'styled-components';

import AddImage from '../assets/addAvatar.png';

const Register = () => {
    const navigate = useNavigate();
    const { signUp } = useFirebaseContext();
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signUp(displayName, email, password, file);
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Logo>iWidy Chat</Logo>
                <Title>Register</Title>
                <Form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Display Name"
                    />
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <Input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        isFile={true}
                        id="file"
                    />
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
