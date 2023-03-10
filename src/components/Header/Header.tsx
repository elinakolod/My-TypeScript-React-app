import React, { useState } from 'react';

import { DEFAULT_NAME, LOGIN, LOGOUT } from '../../constants.js';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { Navbar, NavbarBrand } from 'reactstrap';

type HeaderProps = {
	name: string;
	auth: boolean;
} & typeof defaultProps;

const defaultProps = {
	name: DEFAULT_NAME,
	auth: false,
};

const Header = ({ name, auth }: HeaderProps) => {
	const [userName, setUserName] = useState(name);
	const [isAuthorized, setIsAuthorized] = useState(auth);

	const handleButtonClick = () => {
		if (isAuthorized) {
			setIsAuthorized(false);
			setUserName(DEFAULT_NAME);
		}
	};

	return (
		<Navbar className='my-2' color='secondary' dark>
			<NavbarBrand href='/'>
				<Logo />
			</NavbarBrand>
			<span>
				<span className={styles.userName}>{userName}</span>
				<Button
					handleButtonClick={handleButtonClick}
					text={isAuthorized ? LOGOUT : LOGIN}
				/>
			</span>
		</Navbar>
	);
};

Header.defaultProps = defaultProps;

export default Header;
