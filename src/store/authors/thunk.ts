import { createAsyncThunk } from '@reduxjs/toolkit';

import api from 'utils/api';

import { newAuthor } from 'components/Courses/Course.types';

export const fetchAuthors = createAsyncThunk(
	'authors/fetchAuthors',
	async () => {
		const response = await api.authors.all();
		return response.result;
	}
);

export const createAuthor = createAsyncThunk(
	'authors/createAuthor',
	async (author: newAuthor) => {
		const response = await api.authors.create(author);
		return response.result;
	}
);
