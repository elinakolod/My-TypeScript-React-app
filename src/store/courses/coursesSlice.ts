import { createSlice } from '@reduxjs/toolkit';

import {
	fetchCourses,
	createCourse,
	destroyCourse,
	updateCourse,
} from './thunk';

import { Course } from 'components/Courses/Course.types';

type coursesState = {
	entities: Course[];
	loading: boolean;
	error: string;
};

const initialState: coursesState = {
	entities: [],
	loading: false,
	error: '',
};

export const coursesSlice = createSlice({
	name: 'courses',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCourses.pending, (state) => {
				state.loading = true;
			})
			.addCase(fetchCourses.fulfilled, (state, { payload }) => {
				state.entities = payload;
				state.loading = false;
			})
			.addCase(createCourse.fulfilled, (state, { payload }) => {
				state.entities.push(payload);
			})
			.addCase(destroyCourse.fulfilled, (state, { meta }) => {
				return {
					...state,
					entities: state.entities.filter((course) => course.id !== meta.arg),
				};
			})
			.addCase(updateCourse.fulfilled, (state, { payload }) => {
				return {
					...state,
					entities: state.entities.map((course) => {
						return course.id === payload.id ? payload : course;
					}),
				};
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

export default coursesSlice.reducer;
