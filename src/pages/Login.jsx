import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';
import styled from 'styled-components';

const Login = () => {
    const navigate = useNavigate();
    const { signIn } = useFirebaseContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (email === '' || password === '') {
            return;
        }

        await signIn(email, password);
        navigate('/', { replace: true });
    };

    return (
        <Container>
            <Wrapper>
                <Logo>iWidy Chat</Logo>
                <Title>Login</Title>
                <Form onSubmit={handleSubmit}>
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

                    <Button>Sign In</Button>
                </Form>
                <LoginLink>
                    You don't have an account?{' '}
                    <Link to="/register">Register</Link>
                </LoginLink>
            </Wrapper>
            <Credentials>Made by: Viktor Dimitrov &copy;</Credentials>
        </Container>
    );
};

export default Login;

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

const Credentials = styled.p`
    position: absolute;
    bottom: 5px;
    font-size: 14px;
`;
