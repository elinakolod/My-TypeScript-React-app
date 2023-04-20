import coursesReducer from '../courses/coursesSlice';
import usersReducer from '../users/usersSlice';
import authorsReducer from '../authors/authorsSlice';
import { createCourse } from 'store/courses/thunk';

import { newCourse } from 'components/Courses/Course.types';

const initialState = { entities: [], loading: false, error: '' };
const usersInitialState = {
	user: {
		name: '',
		email: '',
	},
	error: '',
};
const course: newCourse = {
	title: 'title',
	description: 'description',
	duration: 30,
	authors: ['author1_id', 'author2_id'],
};

describe('create course', () => {
	test('coursesReducer should return the initial state', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual(
			initialState
		);
	});

	test('add created course', () => {
		const action = {
			type: createCourse.fulfilled.type,
			payload: course,
		};
		const result = coursesReducer(initialState, action);
		expect(result).toEqual({
			entities: [course],
			loading: false,
			error: '',
		});
	});
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
