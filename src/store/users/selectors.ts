export const userName = (state) => state.users.user.name;

export const isUserAdmin = (state) => state.users.user.role === 'admin';

export const authError = (state) => state.users.error;
