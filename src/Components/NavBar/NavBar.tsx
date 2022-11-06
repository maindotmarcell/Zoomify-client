import React from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
	return (
		<div className={styles.navBarWrapper}>
			<ul className={styles.navBar}>
				<li><Link to='/'>Home</Link></li>
				<li><Link to='/login'>Login</Link></li>
			</ul>
		</div>
	);
}
