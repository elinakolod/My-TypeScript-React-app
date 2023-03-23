import { useRoutes, Navigate } from 'react-router-dom';

import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import Registration from './components/Auth/Registration/Registration';
import Login from './components/Auth/Login/Login';
import CoursesList from './components/Courses/CoursesList';
import App from './App';

function Router() {
	const router = useRoutes([
		{
			element: <App />,
			children: [
				{ path: 'registration', element: <Registration /> },
				{ path: 'login', element: <Login /> },
				{
					path: 'courses/*',
					element: (
						<ProtectedRoute>
							<CoursesList />
						</ProtectedRoute>
					),
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

export default Router;
