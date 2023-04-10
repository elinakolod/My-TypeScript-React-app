import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCourses } from 'store/courses/thunk';
import { allCourses, coursesLoading } from 'store/courses/selectors';
import { fetchAuthors } from 'store/authors/thunk';
import { allAuthors } from 'store/authors/selectors';
import { fetchUser } from 'store/users/thunk';

import { AppDispatch } from 'store';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './Courses';
import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import AdminRoute from 'common/AdminRoute/AdminRoute';
import CourseForm from 'components/CourseForm/CourseForm';

import Path from 'constants/Path';

import { Dna } from 'react-loader-spinner';

function CoursesList() {
	const dispatch = useDispatch<AppDispatch>();
	const courses = useSelector(allCourses);
	const authors = useSelector(allAuthors);
	const loading = useSelector(coursesLoading);

	useEffect(() => {
		fetchUserInfo();
		fetchAuthorsInfo();
		fetchCoursesInfo();
	}, []);

	const fetchCoursesInfo = async () => {
		await dispatch(fetchCourses());
	};

	const fetchUserInfo = async () => {
		await dispatch(fetchUser());
	};

	const fetchAuthorsInfo = async () => {
		await dispatch(fetchAuthors());
	};

	const formatCourses = () => {
		return courses.map((course) => {
			return {
				...course,
				authors: course.authors.map(
					(authorId) => authors.find((author) => author.id === authorId).name
				),
			};
		});
	};

	const coursesCards = formatCourses();

	if (loading)
		return (
			<Dna
				visible={true}
				height='80'
				width='80'
				ariaLabel='dna-loading'
				wrapperStyle={{}}
				wrapperClass='dna-wrapper'
			/>
		);

	return (
		<Routes>
			<Route path='/' element={<Courses courses={coursesCards} />} />
			<Route
				path=':courseId'
				element={
					<ProtectedRoute>
						<CourseInfo courses={coursesCards} />
					</ProtectedRoute>
				}
			/>
			<Route
				path={Path.course.new}
				element={
					<ProtectedRoute>
						<AdminRoute>
							<CourseForm />
						</AdminRoute>
					</ProtectedRoute>
				}
			/>
			<Route
				path={`${Path.course.update}/:courseId`}
				element={
					<ProtectedRoute>
						<AdminRoute>
							<CourseForm />
						</AdminRoute>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default CoursesList;
