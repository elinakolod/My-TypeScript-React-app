import React, { useState, useMemo } from 'react';

import {
	mockedCoursesList,
	mockedAuthorsList,
	ADD_COURSE,
} from '../../constants.js';

import { List } from 'reactstrap';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';
import CreateCourse from '../CreateCourse/CreateCourse';

import styles from './Courses.module.css';

const Courses = () => {
	const formatCourses = () => {
		return courses.map((course) => getAuthors(course));
	};

	const getAuthors = (course) => {
		const courseAuthors = authors
			.filter(
				(author) =>
					course.authors.includes(author.id) ||
					course.authors.includes(author.name)
			)
			.map((author) => author.name);
		return {
			...course,
			authors: courseAuthors,
		};
	};

	const [isFormVisible, setIsFormVisible] = useState(false);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const coursesCards = useMemo(() => formatCourses(), [courses]);

	return (
		<div className=''>
			{isFormVisible ? (
				<CreateCourse
					addCourse={setCourses}
					addAuthor={setAuthors}
					setIsFormVisible={setIsFormVisible}
					allAuthors={authors}
				/>
			) : (
				<>
					<SearchBar courses={coursesCards} setCourses={setCourses} />
					<span>
						<Button
							className={styles.addCourseButton}
							onClick={() => {
								setIsFormVisible(true);
							}}
						>
							{ADD_COURSE}
						</Button>
					</span>
					<List type='unstyled'>
						{coursesCards.map((card) => (
							<li key={card.id}>
								<CourseCard course={card} />
							</li>
						))}
					</List>
				</>
			)}
		</div>
	);
};

export default Courses;
