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

import { Row, Col, List, Container } from 'reactstrap';
import Button from 'common/Button/Button';

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
			authors: courseItem.authors.map((authorId) =>
				mockedAuthorsList.find((author) => author.id === authorId)
			),
		};
	};

	return (
		<Container>
			<Button color='link' onClick={() => navigate(-1)}>
				{BACK}
			</Button>
			<h2>{course.title}</h2>
			<Row>
				<Col md={6}>{course.description}</Col>
				<Col md={6}>
					<dl>
						<dt>{ID}</dt>
						<dd>{course.id}</dd>
						<dt>{DURATION}</dt>
						<dd>{formatDuration(course.duration)}</dd>
						<dt>{CREATED}</dt>
						<dd>{course.creationDate?.replace(/\//g, '.')}</dd>
						<dt>{AUTHORS}</dt>
						<dd>
							<List type='unstyled'>
								{course.authors.map((author) => (
									<li key={author.id}>{author.name}</li>
								))}
							</List>
						</dd>
					</dl>
				</Col>
			</Row>
		</Container>
	);
};

export default CourseInfo;
