import { useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import {
	BACK,
	AUTHORS,
	DURATION,
	CREATED,
	ID,
	mockedCoursesList,
	mockedAuthorsList,
} from 'constants/constants';

import formatDuration from 'helpers/formatDuration';

import { Row, Col, Container } from 'reactstrap';
import Button from 'common/Button/Button';

import styles from '../../Courses.module.css';

const CourseInfo = () => {
	const params = useParams();
	const navigate = useNavigate();
	const { state } = useLocation();
	const course = state || useMemo(() => formatCourse(), [params.courseId]);

	const formatCourse = () => {
		const courseItem = mockedCoursesList.find(
			(course) => course.id === params.courseId
		);
		return {
			...courseItem,
			duration: formatDuration(course.duration),
			creationDate: course.creationDate.replace(/\//g, '.'),
			authors: courseItem.authors
				.map((authorId) =>
					mockedAuthorsList.find((author) => author.id === authorId)
				)
				.join(', '),
		};
	};

	return (
		<Container>
			<Button color='link' onClick={() => navigate(-1)}>
				{BACK}
			</Button>
			<h2 className={styles.courseInfoTitle}>{course.title}</h2>
			<Row>
				<Col md={6}>{course.description}</Col>
				<Col md={6}>
					<dl>
						<dt>{ID}</dt>
						<dd>{course.id}</dd>
						<dt>{DURATION}</dt>
						<dd>{course.duration}</dd>
						<dt>{CREATED}</dt>
						<dd>{course.creationDate}</dd>
						<dt>{AUTHORS}</dt>
						<dd>{course.authors}</dd>
					</dl>
				</Col>
			</Row>
		</Container>
	);
};

export default CourseInfo;
