import React from 'react';

import { SHOW_COURSE, AUTORS, DURATION, CREATED } from 'constants.js';

import Button from 'common/Button/Button';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

import formatDuration from 'helpers/formatDuration';

type CourseProps = {
	course: {
		title: string;
		description: string;
		creationDate: string;
		duration: number;
		authors: string[];
	};
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
				<Button text={SHOW_COURSE} />
			</CardBody>
		</Card>
	);
};

export default CourseCard;
