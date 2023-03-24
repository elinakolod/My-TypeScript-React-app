import { Navigate, useLocation } from 'react-router-dom';

import Path from 'constants/Path';

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem('token');
	const location = useLocation();

	if (!token) {
		return (
			<Navigate
				to={`/${Path.login}`}
				state={{ from: location }}
				replace
			/>
		);
	}
	return children;
};

export default ProtectedRoute;
