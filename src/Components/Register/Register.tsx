import axios from '../../constants/axios';
import React, { FormEvent, useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './Register.module.css';
import { myContext } from '../../Context';

function Register() {
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { refreshUser } = useContext(myContext) as any;

	const register = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				'/auth/local/register',
				{
					email,
					username,
					password,
				},
				{ withCredentials: true }
			);
			console.log(response);
			refreshUser();
		} catch (err) {
			console.log(err);
		}
	};
	const googleLogin = () => {
		window.open('http://localhost:4000/auth/google', '_self');
	};

	return (
		<div className={styles.loginPage}>
			<h1>Register</h1>
			<form onSubmit={register}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<input
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				></input>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<input type="submit" value="Register" />
			</form>
			<div className={styles.loginForm}>
				<h3>Or login with:</h3>
				<div className={styles.googleContainer} onClick={googleLogin}>
					<p>
						<FcGoogle size="2rem" />
						Login with Google
					</p>
				</div>
			</div>
		</div>
	);
}

export default Register;
