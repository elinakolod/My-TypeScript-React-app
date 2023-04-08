import axios, { AxiosResponse } from 'axios';

import { User } from 'components/Auth/User.types';
import {
	Course,
	newCourse,
	Author,
	newAuthor,
} from 'components/Courses/Course.types';

const axiosObj = axios.create({
	baseURL: 'http://localhost:4000/',
	timeout: 1000,
});

axiosObj.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token');
		if (token) config.headers['Authorization'] = token;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
	get: <T>(url: string) => axiosObj.get<T>(url).then(responseBody),
	post: <T>(url: string, body: object) =>
		axiosObj.post<T>(url, body).then(responseBody),
	put: <T>(url: string, body: object) =>
		axiosObj.put<T>(url, body).then(responseBody),
	delete: <T>(url: string) => axiosObj.delete<T>(url).then(responseBody),
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
	logout: () => request.delete('logout'),
	currentUser: () =>
		request.get<{
			successful: boolean;
			result: User;
		}>('users/me'),
};

const courses = {
	all: () =>
		request.get<{
			successful: boolean;
			result: Course[];
		}>('courses/all'),
	create: (course: newCourse) =>
		request.post<{
			successful: boolean;
			result: Course;
		}>('courses/add', course),
	update: (course: Course) =>
		request.put<{
			successful: boolean;
			result: Course;
		}>(`courses/${course.id}`, course),
	delete: (id: string) =>
		request.delete<{
			successful: boolean;
			result: string;
		}>(`courses/${id}`),
};

const authors = {
	all: () =>
		request.get<{
			successful: boolean;
			result: Author[];
		}>('authors/all'),
	create: (author: newAuthor) =>
		request.post<{
			successful: boolean;
			result: Author;
		}>('authors/add', author),
};

const api = {
	auth,
	courses,
	authors,
};

export default api;
