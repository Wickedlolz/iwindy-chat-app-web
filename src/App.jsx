import { Route, Routes } from 'react-router-dom';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { ChatContextProvider } from './contexts/ChatContext';
import { createGlobalStyle } from 'styled-components';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AuthGuard from './components/AuthGuard';

const App = () => {
    return (
        <FirebaseProvider>
            <ChatContextProvider>
                <GlobalStyles />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<AuthGuard />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                </Routes>
            </ChatContextProvider>
        </FirebaseProvider>
    );
};

export default App;

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Poppins', 'Roboto', sans-serif;
  }

  h1, h3, h3, h4 {
    font-family: 'Montserrat', sans-serif;
  }
`;
