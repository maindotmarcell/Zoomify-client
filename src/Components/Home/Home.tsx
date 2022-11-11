import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { IUser } from '../../types/maintypes';

export default function Home() {
	const { userObject } = useContext(myContext) as any;
	return (
		<div>
			{userObject ? (
				<h1>Welcome back {userObject.username}</h1>
			) : (
				<h1>Welcome to the website anonymous user</h1>
			)}
		</div>
	);
}
