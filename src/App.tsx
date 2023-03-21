import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Container } from 'reactstrap';

function App() {
	return (
		<Container fluid>
			<Header />
			<Container className='bg-light border'>
				<Courses />
			</Container>
		</Container>
	);
}

export default App;
