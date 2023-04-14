import { createSlice } from '@reduxjs/toolkit';

import { fetchAuthors, createAuthor } from './thunk';

import { Author } from 'components/Courses/Course.types';

type authorsState = {
	entities: Author[];
	loading: boolean;
	error: string;
};

const initialState: authorsState = {
	entities: [],
	loading: false,
	error: '',
};

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAuthors.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchAuthors.fulfilled, (state, { payload }) => {
				state.entities = payload;
				state.loading = false;
			})
			.addCase(createAuthor.fulfilled, (state, { payload }) => {
				state.entities.push(payload);
			})
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, { error }) => {
					state.error = error.message;
					state.loading = false;
				}
			);
	},
});

export default authorsSlice.reducer;
