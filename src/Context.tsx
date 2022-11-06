import React, { useState, createContext, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

export const myContext = createContext({});

export default function Context({ children }: any) {
	const [userObject, setUserObject] = useState<any>();

	useEffect(() => {
		axios
			.get('http://localhost:4000/getuser', { withCredentials: true })
			.then((res: AxiosResponse) => {
				if (res.data) {
					setUserObject(res.data);
				}
			});
	}, []);

	return <myContext.Provider value={userObject}>{children}</myContext.Provider>;
}
