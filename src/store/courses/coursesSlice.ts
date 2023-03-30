import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Course } from 'components/Courses/Course.types';

const initialState: Course[] = [];

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: initialState,
	reducers: {
		all: (state, action: PayloadAction<Course[]>) => (state = action.payload),
		remove: (state, action: PayloadAction<Course>) => {
			return state.filter((course) => course.id !== action.payload.id);
		},
		edit: (state, action: PayloadAction<Course>) => {
			state.map((course) => {
				course.id === action.payload.id ? action.payload : course;
			});
		},
		add: (state, action: PayloadAction<Course>) => {
			state.push(action.payload);
		},
	},
});

export const { all, remove, edit, add } = coursesSlice.actions;

export default coursesSlice.reducer;
