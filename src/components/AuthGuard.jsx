import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '../contexts/FirebaseContext';

const AuthGuard = ({ children }) => {
    const { user } = useFirebaseContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }
    }, [user]);

    return children ? children : <Outlet />;
};

export default AuthGuard;
