import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUser, login, logout } from './thunk';

import { User } from 'components/Auth/User.types';

type userInitialState = {
	isAuth: boolean;
	user: User;
};

type loginType = {
	result: string;
	user: User;
};

const initialState: userInitialState = {
	isAuth: false,
	user: {
		name: '',
		email: '',
	},
};

export const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.isAuth = true;
				state.user = action.payload;
			})
			.addCase(
				login.fulfilled,
				(state, action: PayloadAction<loginType>) => {
					localStorage.setItem('token', action.payload.result);
					state.isAuth = true;
					state.user = action.payload.user;
				}
			)
			.addCase(logout.fulfilled, () => {
				localStorage.clear();
				return initialState;
			});
	},
});

export default usersSlice.reducer;
