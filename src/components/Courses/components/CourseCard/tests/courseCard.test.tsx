import { screen } from '@testing-library/react';
import { render } from 'utils/test-utils';

import CourseCard from '../CourseCard';

import formatDuration from 'helpers/formatDuration';

const course = {
	id: 'test_id',
	creationDate: '9/3/2021',
	title: 'title',
	description: 'description',
	duration: 30,
	authors: ['author1', 'author2'],
};

describe('CourseCard', () => {
	beforeEach(() => {
		render(<CourseCard course={course} />, {});
	});

	it('should display title', () => {
		expect(screen.findByText(course.title)).toBeTruthy();
	});

	it('should display description', () => {
		expect(screen.findByText(course.description)).toBeTruthy();
	});

	it('should display formatted duration', () => {
		expect(screen.findByText(formatDuration(course.duration))).toBeTruthy();
	});

	it('should display formatted duration', () => {
		expect(
			screen.findByText(course.creationDate.replace(/\//g, '.'))
		).toBeTruthy();
	});

	it('should display authors of the course', () => {
		expect(screen.findByText(course.authors.join(', '))).toBeTruthy();
	});
});
