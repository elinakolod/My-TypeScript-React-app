import { Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';

import { userError } from 'store/users/selectors';

import Header from './components/Header/Header';
import { Container, Alert } from 'reactstrap';

function App() {
	const error = useSelector(userError);

	return (
		<Container fluid>
			<Header />
			<Container className='bg-light border'>
				{error && <Alert color='danger'>{error}</Alert>}
				<Outlet />
			</Container>
		</Container>
	);
}

export default App;
