import React, { useState, createContext, useEffect } from 'react';
import { AxiosResponse } from 'axios';
import axios from '../constants/axios';

export const myContext = createContext({});

export default function Context({ children }: any) {
	const [userObject, setUserObject] = useState<any>();

	useEffect(() => {
		refreshUser();
	}, []);

	const refreshUser = () => {
		axios
			.get('/getuser', { withCredentials: true })
			.then((res: AxiosResponse) => {
				console.log(res);
				if (res.data) {
					setUserObject(res.data);
				}
			});
	};

	return (
		<myContext.Provider value={{ userObject, refreshUser }}>
			{children}
		</myContext.Provider>
	);
}
