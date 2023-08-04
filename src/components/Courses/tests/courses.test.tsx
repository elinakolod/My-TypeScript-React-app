import { screen, fireEvent } from '@testing-library/react';
import { render } from 'utils/test-utils';

import Courses from '../Courses';

const courses = [
	{
		id: 'test_id',
		creationDate: '9/3/2021',
		title: 'title',
		description: 'description',
		duration: 30,
		authors: ['author1', 'author2'],
	},
	{
		id: 'test_id2',
		creationDate: '9/3/2021',
		title: 'title2',
		description: 'description2',
		duration: 30,
		authors: ['author1', 'author2'],
	},
];

const initialState = {
	users: {
		user: {
			role: 'admin',
		},
	},
};

describe('Courses', () => {
	beforeEach(() => {
		render(<Courses courses={courses} />, { initialStore: initialState });
	});

	it('should display Course Form', () => {
		fireEvent.click(screen.getByText('Add new course'));

		expect(location.pathname).toBe('/add');
	});

	it('should display all courses', () => {
		expect(screen.queryAllByText('Show course', { exact: true }).length).toBe(
			2
		);
	});
});
