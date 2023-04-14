import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchCourses } from 'store/courses/thunk';
import { allCourses, coursesLoading } from 'store/courses/selectors';
import { fetchAuthors } from 'store/authors/thunk';
import { allAuthors, authorsLoading } from 'store/authors/selectors';

import { AppDispatch } from 'store';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './Courses';
import AdminRoute from 'common/AdminRoute/AdminRoute';
import CourseForm from 'components/CourseForm/CourseForm';
import Loader from 'common/Loader/Loader';

import Path from 'constants/Path';

function CoursesList() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch<AppDispatch>();
	const courses = useSelector(allCourses);
	const authors = useSelector(allAuthors);
	const isCoursesLoading = useSelector(coursesLoading);
	const isAuthorsLoading = useSelector(authorsLoading);

	useEffect(() => {
		fetchAuthorsInfo();
		fetchCoursesInfo();
	}, []);

	const fetchAuthorsInfo = async () => {
		try {
			await dispatch(fetchAuthors());
		} finally {
			setLoading(false);
		}
	};

	const fetchCoursesInfo = async () => {
		try {
			await dispatch(fetchCourses());
		} finally {
			setLoading(false);
		}
	};

	const formatCourses = () => {
		return courses.map((course) => {
			return {
				...course,
				authors: course.authors.map(
					(authorId) =>
						authors.find((author) => author.id === authorId).name
				),
			};
		});
	};

	if (loading || isAuthorsLoading || isCoursesLoading) return <Loader />;

	const coursesCards = formatCourses();

	return (
		<Routes>
			<Route path='/' element={<Courses courses={coursesCards} />} />
			<Route
				path=':courseId'
				element={<CourseInfo courses={coursesCards} />}
			/>
			<Route
				path={Path.course.new}
				element={
					<AdminRoute>
						<CourseForm />
					</AdminRoute>
				}
			/>
			<Route
				path={`${Path.course.update}/:courseId`}
				element={
					<AdminRoute>
						<CourseForm />
					</AdminRoute>
				}
			/>
		</Routes>
	);
}

export default CoursesList;
