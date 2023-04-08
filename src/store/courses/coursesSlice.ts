import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
			.addCase(
				fetchCourses.fulfilled,
				(state, action: PayloadAction<Course[]>) => {
					state.entities = action.payload;
					state.loading = false;
				}
			)
			.addCase(fetchCourses.rejected, (state, action) => {
				state.loading = false;
				state.error = `${action.error.name}: ${action.error.message}`;
			})
			.addCase(
				createCourse.fulfilled,
				(state, action: PayloadAction<Course>) => {
					state.entities.push(action.payload);
				}
			)
			.addCase(destroyCourse.fulfilled, (state, action) => {
				return {
					...state,
					entities: state.entities.filter(
						(course) => course.id !== action.meta.arg
					),
				};
			})
			.addCase(
				updateCourse.fulfilled,
				(state, action: PayloadAction<Course>) => {
					return {
						...state,
						entities: state.entities.map((course) => {
							return course.id === action.payload.id
								? action.payload
								: course;
						}),
					};
				}
			);
	},
});

export default coursesSlice.reducer;
