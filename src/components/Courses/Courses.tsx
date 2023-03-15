import React, { useState, useMemo } from 'react';

import {
	mockedCoursesList,
	mockedAuthorsList,
	ADD_COURSE,
} from 'constants/constants';

import { List } from 'reactstrap';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import styles from './Courses.module.css';

const Courses = () => {
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

	const [isFormVisible, setIsFormVisible] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [substring, setSubstring] = useState('');

	const coursesCards = useMemo(() => formatCourses(), [courses]);

	if (isFormVisible) {
		return (
			<CreateCourse
				addCourse={setCourses}
				addAuthor={setAuthors}
				setIsFormVisible={setIsFormVisible}
				allAuthors={authors}
			/>
		);
	}

	return (
		<>
			<SearchBar substring={substring} setSubstring={setSubstring} />
			<Button
				className={styles.addCourseButton}
				onClick={() => {
					setIsFormVisible(true);
				}}
			>
				{ADD_COURSE}
			</Button>
			<List type='unstyled'>
				{coursesCards
					.filter(
						(course) =>
							course.title.toLowerCase().includes(substring) ||
							course.id.toLowerCase().includes(substring)
					)
					.map((card) => (
						<li key={card.id}>
							<CourseCard course={card} />
						</li>
					))}
			</List>
		</>
	);
};

export default Courses;
