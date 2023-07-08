import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';

const AuthGuard = ({ children }) => {
    const { currentUser } = useFirebaseContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { replace: true });
            return;
        }
    }, [currentUser]);

    return children ? children : <Outlet />;
};

export default AuthGuard;
