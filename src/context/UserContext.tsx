import React, { useState, createContext, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import axios from '../constants/axios';
import { IUser } from '../types/maintypes';

export const UserContext = createContext({});

export default function Context({ children }: React.PropsWithChildren) {
	const [userObject, setUserObject] = useState<IUser>();
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		refreshUser();
	}, []);

	const refreshUser = () => {
		axios
			.get('/auth/getuser', { withCredentials: true })
			.then((res: AxiosResponse) => {
				console.log(res);
				if (res.data) {
					setUserObject(res.data);
					setSignedIn(true);
				}
			});
	};

	return (
		<UserContext.Provider
			value={{ userObject, refreshUser, signedIn, setSignedIn }}
		>
			{children}
		</UserContext.Provider>
	);
}
