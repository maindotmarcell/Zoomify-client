import React, { useContext } from 'react';
import { myContext } from '../../Context';
import { IUser } from '../../types/maintypes';

export default function Home() {
	const context = useContext(myContext) as IUser;
	return (
		<div>
			{context ? (
				<h1>Welcome back {context.username}</h1>
			) : (
				<h1>Welcome to the website anonymous user</h1>
			)}
		</div>
	);
}
