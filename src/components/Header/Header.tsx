import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { userName } from 'store/users/selectors';
import { logout } from 'store/users/thunk';

import { AppDispatch } from 'store';

import { LOGOUT } from 'constants/constants';
import Path from 'constants/Path';

import styles from './Header.module.css';

import Logo from './components/Logo/Logo';
import Button from 'common/Button/Button';
import { Navbar, NavbarBrand } from 'reactstrap';

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<AppDispatch>();
	const name = useSelector(userName);

	const handleButtonClick = async () => {
		await dispatch(logout());
		navigate(`/${Path.login}`);
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
						<span className={styles.userName}>{name}</span>
						<Button onClick={handleButtonClick}>{LOGOUT}</Button>
					</>
				)}
			</span>
		</Navbar>
	);
};

export default Header;
