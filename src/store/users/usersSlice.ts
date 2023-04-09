import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUser, login, logout, register } from './thunk';

import { User } from 'components/Auth/User.types';

type userInitialState = {
	user: User;
	error: string;
};

type loginType = {
	result: string;
	user: User;
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
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(login.fulfilled, (state, action: PayloadAction<loginType>) => {
				localStorage.setItem('token', action.payload.result);
				state.user = action.payload.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(register.fulfilled, () => {
				return;
			})
			.addCase(register.rejected, (state, action) => {
				state.error = action.error.message;
			})
			.addCase(logout.fulfilled, () => {
				localStorage.clear();
				return initialState;
			});
	},
});

export default usersSlice.reducer;
