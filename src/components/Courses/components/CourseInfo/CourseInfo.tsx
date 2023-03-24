import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { BACK, AUTHORS, DURATION, CREATED, ID } from 'constants/constants';

import formatDuration from 'helpers/formatDuration';

import { Row, Col, Container } from 'reactstrap';
import Button from 'common/Button/Button';

import styles from '../../Courses.module.css';

import { Course } from 'components/Courses/Course.types';

type CourseProps = {
	courses: Course[];
};
const CourseInfo = ({ courses }: CourseProps) => {
	const navigate = useNavigate();
	const params = useParams();
	const [course] = useState(
		courses.find((course) => course.id === params.courseId)
	);

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
						<dd>{formatDuration(course.duration)}</dd>
						<dt>{CREATED}</dt>
						<dd>{course.creationDate.replace(/\//g, '.')}</dd>
						<dt>{AUTHORS}</dt>
						<dd>{course.authors.join(', ')}</dd>
					</dl>
				</Col>
			</Row>
		</Container>
	);
};

export default CourseInfo;
