import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import { Container, Row, Col } from 'reactstrap';

function App() {
	return (
		<Container>
			<Row>
				<Header />
				<Col className='bg-light border'>
					<Courses />
				</Col>
			</Row>
		</Container>
	);
}

export default App;
