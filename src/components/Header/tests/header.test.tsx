import { screen } from '@testing-library/react';
import { render } from 'utils/test-utils';

import Header from '../Header';

const initialState = {
	users: {
		user: {
			name: 'mock name',
		},
	},
};

describe('Header', () => {
	beforeEach(() => {
		render(<Header />, { initialStore: initialState });
	});

	it('should display user name', () => {
		expect(screen.findByText('mock name')).toBeTruthy();
	});

	it('should display logo', () => {
		expect(screen.findByAltText('Logo')).toBeTruthy();
	});
});
