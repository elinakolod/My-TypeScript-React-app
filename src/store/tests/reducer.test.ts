import coursesReducer from '../courses/coursesSlice';
import usersReducer from '../users/usersSlice';
import authorsReducer from '../authors/authorsSlice';

const initialState = { entities: [], loading: false, error: '' };
const usersInitialState = {
	user: {
		name: '',
		email: '',
	},
	error: '',
};

test('coursesReducer should return the initial state', () => {
	expect(coursesReducer(undefined, { type: undefined })).toEqual(
		initialState
	);
});

test('authorsReducer should return the initial state', () => {
	expect(authorsReducer(undefined, { type: undefined })).toEqual(
		initialState
	);
});

test('usersReducer should return the initial state', () => {
	expect(usersReducer(undefined, { type: undefined })).toEqual(
		usersInitialState
	);
});
