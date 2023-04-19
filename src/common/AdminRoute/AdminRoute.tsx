import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isUserAdmin } from 'store/users/selectors';

import Path from 'constants/Path';

const AdminRoute = ({ children }) => {
	const isAdmin = useSelector(isUserAdmin);
	const location = useLocation();

	if (!isAdmin) {
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

export default AdminRoute;
