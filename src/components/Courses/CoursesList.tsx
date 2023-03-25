import { Routes, Route, Outlet } from 'react-router-dom';
import { useState, useMemo } from 'react';

import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './Courses';
import ProtectedRoute from 'common/ProtectedRoute/ProtectedRoute';
import CreateCourse from 'components/CreateCourse/CreateCourse';

import { mockedCoursesList, mockedAuthorsList } from 'constants/constants';
import Path from 'constants/Path';

function CoursesList() {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

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

	const coursesCards = useMemo(() => formatCourses(), [courses]);

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
						<CreateCourse
							addCourse={setCourses}
							addAuthor={setAuthors}
							allAuthors={authors}
						/>
					</ProtectedRoute>
				}
			/>
		</Routes>
	);
}

export default CoursesList;
