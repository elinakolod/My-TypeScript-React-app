import { useNavigate, useLocation } from 'react-router-dom';

import { LOGOUT } from 'constants/constants';
import Path from 'constants/Path';

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
			navigate(`/${Path.login}`);
		}
	};

	return (
		<Navbar color='secondary' dark>
			<NavbarBrand href={`/${Path.course.index}`}>
				<Logo />
			</NavbarBrand>
			<span>
				{![Path.login, Path.registration].includes(
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
