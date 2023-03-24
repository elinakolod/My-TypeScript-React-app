import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ADD_COURSE } from 'constants/constants';
import Path from 'constants/Path';

import { List } from 'reactstrap';
import Button from 'common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';
import SearchBar from './components/SearchBar/SearchBar';

import styles from './Courses.module.css';

import { Course } from 'components/Courses/Course.types';

type CoursesProps = {
	courses: Course[];
};

const Courses = ({ courses }: CoursesProps) => {
	const [substring, setSubstring] = useState('');

	return (
		<>
			<SearchBar substring={substring} setSubstring={setSubstring} />
			<Button className={styles.addCourseButton}>
				<Link to={Path.course.new}>{ADD_COURSE}</Link>
			</Button>
			<List type='unstyled'>
				{courses
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
