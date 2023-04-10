import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User } from 'components/Auth/User.types';

type userInitialState = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
};

type loginType = {
	result: string;
	user: User;
};

const initialState: userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {
		login: (state, action: PayloadAction<loginType>) => {
			return (state = {
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
			});
		},
		logout: () => initialState,
	},
});

export const { login, logout } = usersSlice.actions;

export default usersSlice.reducer;
