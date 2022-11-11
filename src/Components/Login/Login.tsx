import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './Login.module.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const login = async (event: FormEvent) => {
		event.preventDefault();
		try {
			axios.post(
				'/login',
				{
					email,
					password,
				},
				{ withCredentials: true }
			);
		} catch (err) {}
	};

	const googleLogin = () => {
		window.open('http://localhost:4000/auth/google', '_self');
	};

	return (
		<div className={styles.loginPage}>
			<h1>Login</h1>
			<form onSubmit={login}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></input>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></input>
				<input type="submit" value="Login" />
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

export default Login;
