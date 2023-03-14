import React, { useState } from 'react';

import { DEFAULT_NAME, LOGIN, LOGOUT } from 'constants/constants';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';
import { Navbar, NavbarBrand } from 'reactstrap';

type HeaderProps = {
	name?: string;
	auth?: boolean;
};

const Header = ({ name, auth }: HeaderProps) => {
	const [userName, setUserName] = useState(name || DEFAULT_NAME);
	const [isAuthorized, setIsAuthorized] = useState(auth || false);

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
				<Button onClick={handleButtonClick}>
					{isAuthorized ? LOGOUT : LOGIN}
				</Button>
			</span>
		</Navbar>
	);
};

export default Header;
