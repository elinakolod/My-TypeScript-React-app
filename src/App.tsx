import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { authError } from 'store/users/selectors';

import Header from './components/Header/Header';
import { Container, Alert } from 'reactstrap';

function App() {
	const errorAuth = useSelector(authError);

	return (
		<Container fluid>
			<Header />
			<Container className='bg-light border'>
				{errorAuth && <Alert color='danger'>{errorAuth}</Alert>}
				<Outlet />
			</Container>
		</Container>
	);
}

export default App;
