import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { userRole } from 'store/users/selectors';

import Path from 'constants/Path';

const AdminRoute = ({ children }) => {
	const role = useSelector(userRole);
	const location = useLocation();

	if (role !== 'admin') {
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
