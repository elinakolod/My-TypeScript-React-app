import { createAsyncThunk } from '@reduxjs/toolkit';

import { User } from 'components/Auth/User.types';

import api from 'utils/api';

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
	const response = await api.auth.currentUser();

	return response.result;
});

export const login = createAsyncThunk('users/login', async (user: User) => {
	try {
		const response = await api.auth.login(user);

		return response;
	} catch (err) {
		const customError = {
			name: 'Custom axios error',
			message: err.response.data.errors.join(' '),
		};
		throw customError;
	}
});

export const register = createAsyncThunk(
	'users/register',
	async (user: User) => {
		try {
			const response = await api.auth.register(user);

			return response;
		} catch (err) {
			const customError = {
				name: 'Custom axios error',
				message: err.response.data.errors.join(' '),
			};
			throw customError;
		}
	}
);

export const logout = createAsyncThunk('users/logout', async () => {
	await api.auth.logout();
});
