import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { myContext } from '../context/UserContext';

const AuthRoute = () => {
	const { signedIn } = useContext(myContext) as any;
	return signedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;