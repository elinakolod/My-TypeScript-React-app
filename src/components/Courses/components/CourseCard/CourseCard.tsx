import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { SHOW_COURSE, AUTORS, DURATION, CREATED } from 'constants/constants';

import Button from 'common/Button/Button';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import formatDuration from 'helpers/formatDuration';

import { Course } from 'components/Courses/Course.types';

type CourseProps = {
	course: Course;
};

const CourseCard = ({ course }: CourseProps) => {
	const courseCard = useMemo(() => {
		return {
			...course,
			duration: formatDuration(course.duration),
			creationDate: course.creationDate.replace(/\//g, '.'),
			authors: course.authors.join(', '),
		};
	}, [course]);

	return (
		<Card className='my-2'>
			<CardBody>
				<CardTitle tag='h2'>{courseCard.title}</CardTitle>
				<CardText>{courseCard.description}</CardText>
			</CardBody>
			<CardBody>
				<dl>
					<dt>{AUTORS}</dt>
					<dd>{courseCard.authors}</dd>
					<dt>{DURATION}</dt>
					<dd>{courseCard.duration}</dd>
					<dt>{CREATED}</dt>
					<dd>{courseCard.creationDate}</dd>
				</dl>
				<Button>
					<Link to={course.id} state={courseCard}>
						{SHOW_COURSE}
					</Link>
				</Button>
			</CardBody>
		</Card>
	);
};

export default CourseCard;
