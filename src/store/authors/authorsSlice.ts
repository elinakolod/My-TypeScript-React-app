import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
			.addCase(
				fetchAuthors.fulfilled,
				(state, action: PayloadAction<Author[]>) => {
					state.entities = action.payload;
					state.loading = false;
				}
			)
			.addCase(fetchAuthors.rejected, (state, action) => {
				state.loading = false;
				state.error = `${action.error.name}: ${action.error.message}`;
			})
			.addCase(
				createAuthor.fulfilled,
				(state, action: PayloadAction<Author>) => {
					state.entities.push(action.payload);
				}
			);
	},
});

export default authorsSlice.reducer;
