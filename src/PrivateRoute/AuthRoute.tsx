import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUserContext } from '../types/maintypes';

const AuthRoute = () => {
	const { signedIn } = useContext(UserContext) as IUserContext;
	return signedIn ? <Navigate to="/" /> : <Outlet />;
};

export default AuthRoute;
