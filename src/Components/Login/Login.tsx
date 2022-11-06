import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import styles from './Login.module.css';

function Login() {
	return (
		<div className={styles.loginPage}>
			<h1>Login</h1>
			<div className={styles.loginForm}>
				<div className={styles.googleContainer}>
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
