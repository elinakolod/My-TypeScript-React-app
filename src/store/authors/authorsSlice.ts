import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Author } from 'components/Courses/Course.types';

const initialState: Author[] = [];

export const authorsSlice = createSlice({
	name: 'authors',
	initialState: initialState,
	reducers: {
		all: (state, action: PayloadAction<Author[]>) =>
			(state = action.payload),
		add: (state, action: PayloadAction<Author>) => {
			state.push(action.payload);
		},
	},
});

export const { all, add } = authorsSlice.actions;

export default authorsSlice.reducer;
