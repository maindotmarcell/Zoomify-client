import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { IUserContext } from '../types/maintypes';

const PrivateRoute = () => {
	const { signedIn } = useContext(UserContext) as IUserContext;

	return signedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
