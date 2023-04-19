import { Navigate, useLocation } from 'react-router-dom';

import Path from 'constants/Path';

const GuestRoute = ({ children }) => {
	const token = localStorage.getItem('token');
	const location = useLocation();

	if (token) {
		return (
			<Navigate
				to={`/${Path.course.index}`}
				state={{ from: location }}
				replace
			/>
		);
	}
	return children;
};

export default GuestRoute;
