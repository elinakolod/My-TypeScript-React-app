import { createAsyncThunk } from '@reduxjs/toolkit';

import api from 'utils/api';

import { Course, newCourse } from 'components/Courses/Course.types';

export const fetchCourses = createAsyncThunk(
	'courses/fetchCourses',
	async () => {
		const response = await api.courses.all();

		return response.result;
	}
);

export const createCourse = createAsyncThunk(
	'courses/createCourse',
	async (course: newCourse) => {
		const response = await api.courses.create(course);

		return response.result;
	}
);

export const updateCourse = createAsyncThunk(
	'courses/updateCourse',
	async (course: Course) => {
		const response = await api.courses.update(course);

		return response.result;
	}
);

export const destroyCourse = createAsyncThunk(
	'courses/destroyCourse',
	async (id: string) => {
		const response = await api.courses.delete(id);

		return response.result;
	}
);
