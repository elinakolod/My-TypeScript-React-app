import React, { useState, useMemo } from 'react';

import {
	mockedCoursesList,
	mockedAuthorsList,
	ADD_COURSE,
} from '../../constants.js';

import { List } from 'reactstrap';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import CreateCourse from '../CreateCourse/CreateCourse';

const Courses = () => {
	const formatCourses = () => {
		return courses.map((course) => getAuthors(course));
	};

	const getAuthors = (course) => {
		const courseAuthors = authors
			.filter((author) => course.authors.includes(author.id))
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
				/>
			) : (
				<>
					<span>
						<Button
							text={ADD_COURSE}
							handleButtonClick={() => {
								setIsFormVisible(true);
							}}
						/>
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
