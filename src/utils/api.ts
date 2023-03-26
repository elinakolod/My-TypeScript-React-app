import axios, { AxiosResponse } from 'axios';

import { User } from 'components/Auth/User.types';

const axiosObj = axios.create({
	baseURL: 'http://localhost:4000/',
	timeout: 1000,
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => axiosObj.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axiosObj.post<T>(url, body).then(responseBody),
};

const auth = {
	register: (user: User) =>
		request.post<{
			successful: boolean;
			result: string;
		}>('register', user),
	login: (user: User) =>
		request.post<{
			successful: boolean;
			result: string;
			user: User;
		}>('login', user),
};

const api = {
	auth,
};

export default api;
