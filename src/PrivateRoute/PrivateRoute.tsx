import { Flex } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { myContext } from '../context/UserContext';

const PrivateRoute = () => {
	const { signedIn } = useContext(myContext) as any;
	const { userObject } = useContext(myContext) as any;

	if (signedIn) {
		return signedIn ? <Outlet /> : <Navigate to="/login" />;
	} else {
		return <Flex></Flex>;
	}
};

export default PrivateRoute;
