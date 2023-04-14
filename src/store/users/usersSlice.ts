import { createSlice } from '@reduxjs/toolkit';

import { fetchUser, login, logout } from './thunk';

import { User } from 'components/Auth/User.types';

type userInitialState = {
	user: User;
	error: string;
};

const initialState: userInitialState = {
	user: {
		name: '',
		email: '',
	},
	error: '',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, { payload }) => {
				state.user = payload;
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user;
			})
			.addCase(logout.fulfilled, () => initialState)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, { error }) => {
					state.error = error.message;
				}
			);
	},
});

export default usersSlice.reducer;
