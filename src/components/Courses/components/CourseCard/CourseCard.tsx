import { SHOW_COURSE, AUTORS, DURATION, CREATED } from 'constants/constants';

import Button from 'common/Button/Button';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import formatDuration from 'helpers/formatDuration';

import { Course } from 'components/Courses/Course.types';

type CourseProps = {
	course: Course;
};

const CourseCard = ({ course }: CourseProps) => {
	return (
		<Card className='my-2'>
			<CardBody>
				<CardTitle tag='h2'>{course.title}</CardTitle>
				<CardText>{course.description}</CardText>
			</CardBody>
			<CardBody>
				<dl>
					<dt>{AUTORS}</dt>
					<dd>{course.authors.join(', ')}</dd>
					<dt>{DURATION}</dt>
					<dd>{formatDuration(course.duration)}</dd>
					<dt>{CREATED}</dt>
					<dd>{course.creationDate.replace(/\//g, '.')}</dd>
				</dl>
				<Button>{SHOW_COURSE}</Button>
			</CardBody>
		</Card>
	);
};

export default CourseCard;
