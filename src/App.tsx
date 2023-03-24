import { Outlet } from 'react-router-dom';

import Header from './components/Header/Header';
import { Container } from 'reactstrap';

function App() {
	return (
		<Container fluid>
			<Header />
			<Container className='bg-light border'>
				<Outlet />
			</Container>
		</Container>
	);
}

export default App;
