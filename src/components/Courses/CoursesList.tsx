import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { all as getCourses } from 'store/courses/coursesSlice';
import { allCourses } from 'store/courses/selectors';
import { all as getAuthors } from 'store/authors/authorsSlice';
import { allAuthors } from 'store/authors/selectors';

import api from 'utils/api';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './Courses';
import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import CreateCourse from 'components/CreateCourse/CreateCourse';

import Path from 'constants/Path';

function CoursesList() {
	const dispatch = useDispatch();
	const courses = useSelector(allCourses);
	const authors = useSelector(allAuthors);

	useEffect(() => {
		fetchCoursesInfo();
	}, []);

	const fetchCoursesInfo = async () => {
		try {
			const coursesResponse = await api.courses.all();
			const authorsResponse = await api.authors.all();

			dispatch(getCourses(coursesResponse.result));
			dispatch(getAuthors(authorsResponse.result));
		} catch (error) {
			console.log(error.response.data.errors);
		}
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
						<CreateCourse />
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default CoursesList;
