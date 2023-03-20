import { useNavigate, useLocation } from 'react-router-dom';

import { LOGOUT } from 'constants/constants';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleButtonClick = () => {
		if (localStorage.getItem('token')) {
			localStorage.clear();
			navigate('/login');
		}
	};

	return (
		<Navbar color='secondary' dark>
			<NavbarBrand href='/courses'>
				<Logo />
			</NavbarBrand>
			<span>
				{!['login', 'registration'].includes(
					location.pathname.replace('/', '')
				) && (
					<>
						<span className={styles.userName}>
							{localStorage.getItem('user')}
						</span>
						<Button onClick={handleButtonClick}>{LOGOUT}</Button>
					</>
				)}
			</span>
		</Navbar>
	);
};

export default Header;
