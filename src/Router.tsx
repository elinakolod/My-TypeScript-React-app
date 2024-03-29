import { useRoutes, Navigate } from 'react-router-dom';

import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import GuestRoute from 'common/GuestRoute/GuestRoute';
import Registration from './components/Auth/Registration/Registration';
import Login from './components/Auth/Login/Login';
import CoursesList from './components/Courses/CoursesList';
import App from './App';

import Path from 'constants/Path';

function Router() {
	const router = useRoutes([
		{
			element: <App />,
			children: [
				{
					path: Path.registration,
					element: (
						<GuestRoute>
							<Registration />
						</GuestRoute>
					),
				},
				{
					path: Path.login,
					element: (
						<GuestRoute>
							<Login />
						</GuestRoute>
					),
				},
				{
					path: `${Path.course.index}/*`,
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
			element: <Navigate to={`/${Path.course.index}`} />,
		},
	]);

	return router;
}

export default Router;
