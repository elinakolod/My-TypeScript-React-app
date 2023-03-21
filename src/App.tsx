import { useRoutes, Outlet, Navigate } from 'react-router-dom';

import Header from './components/Header/Header';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/Courses/components/CourseInfo/CourseInfo';
import Registration from './components/Auth/Registration/Registration';
import Login from './components/Auth/Login/Login';
import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import { Container } from 'reactstrap';

function App() {
	const router = useRoutes([
		{
			path: '/*',
			element: (
				<Container fluid>
					<Header />
					<Container className='bg-light border'>
						<Outlet />
					</Container>
				</Container>
			),
			children: [
				{ path: 'registration', element: <Registration /> },
				{ path: 'login', element: <Login /> },
				{
					path: 'courses',
					element: (
						<ProtectedRoute>
							<Courses />
						</ProtectedRoute>
					),
					children: [
						{
							path: ':courseId',
							element: (
								<ProtectedRoute>
									<CourseInfo />
								</ProtectedRoute>
							),
						},
					],
				},
			],
		},
		{
			path: '/',
			element: <Navigate to='/courses' />,
		},
	]);

	return router;
}

export default App;
