import usersReducer from './users/usersSlice';
import coursesReducer from './courses/coursesSlice';
import authorsReducer from './authors/authorsSlice';

export default {
	users: usersReducer,
	courses: coursesReducer,
	authors: authorsReducer,
};
