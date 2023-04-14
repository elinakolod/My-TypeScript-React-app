import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from 'store';

import { fetchUser } from 'store/users/thunk';
import { authError } from 'store/users/selectors';

import Header from './components/Header/Header';
import Loader from './common/Loader/Loader';
import { Container, Alert } from 'reactstrap';

function App() {
	const [loading, setLoading] = useState(false);
	const errorAuth = useSelector(authError);
	const token = localStorage.getItem('token');
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		if (token) fetchUserInfo();
	}, []);

	const fetchUserInfo = async () => {
		try {
			await dispatch(fetchUser());
		} finally {
			setLoading(false);
		}
	};

	return (
		<Container fluid>
			<Header />
			<Container className='bg-light border'>
				{errorAuth && <Alert color='danger'>{errorAuth}</Alert>}
				{loading ? <Loader /> : <Outlet />}
			</Container>
		</Container>
	);
}

export default App;
